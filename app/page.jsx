"use client";

import { useMemo, useState } from "react";
import mindmapData from "../data/mindmaps.json";

const LABEL_COLORS = ["#38BDF8", "#4ADE80", "#FCD34D", "#F87171", "#C084FC"];

const C = {
  root: { main: "#A5B4FC", bg: "#1A1740", border: "#4338CA", glow: "#6366F140" },
  doi: { main: "#38BDF8", bg: "#091824", border: "#0369A1", glow: "#0EA5E940" },
  proto: { main: "#4ADE80", bg: "#071810", border: "#15803D", glow: "#22C55E40" },
  is: { main: "#FCD34D", bg: "#1A1300", border: "#B45309", glow: "#F59E0B40" },
  kc: { main: "#F87171", bg: "#1A0606", border: "#B91C1C", glow: "#EF444440" },
  iot: { main: "#C084FC", bg: "#120B1E", border: "#7C3AED", glow: "#A855F740" }
};

const UI = {
  en: {
    title: "FIGARO.LABS",
    tagline: "Networking Intelligence Studio",
    dashboard: "Dashboard",
    mindMap: "Mind Map",
    resources: "Resources",
    progress: "Progress",
    search: "Search concepts",
    focus: "Focus",
    overview: "Overview",
    upgrade: "Upgrade",
    usage: "Monthly usage",
    plan: "Your plan",
    pro: "Pro",
    enterprise: "Enterprise",
    schedule: "Schedule",
    knowledge: "Knowledge",
    quickActions: "Quick Actions",
    language: "Language",
    aiSummary: "AI Summaries",
    insights: "Learning Insights",
    progressText: "Learning momentum",
    focusMode: "Focus mode",
    explore: "Explore",
    startTrial: "Start free trial",
    subscribe: "Subscribe",
    billing: "Subscription",
    benefitTitle: "Commercial-ready learning experience",
    noteTitle: "Arabic support",
    noteBody: "Instant RTL layout and bilingual labels for global reach.",
    lecture: "Lecture",
    selectLecture: "Select lecture"
  },
  ar: {
    title: "فيغارو لابس",
    tagline: "استوديو ذكاء الشبكات",
    dashboard: "لوحة التحكم",
    mindMap: "الخريطة الذهنية",
    resources: "الموارد",
    progress: "التقدم",
    search: "ابحث عن المفاهيم",
    focus: "تركيز",
    overview: "نظرة عامة",
    upgrade: "ترقية",
    usage: "الاستخدام الشهري",
    plan: "خطتك",
    pro: "محترف",
    enterprise: "مؤسسي",
    schedule: "الجدول",
    knowledge: "المعرفة",
    quickActions: "إجراءات سريعة",
    language: "اللغة",
    aiSummary: "ملخصات الذكاء الاصطناعي",
    insights: "رؤى التعلم",
    progressText: "زخم التعلم",
    focusMode: "وضع التركيز",
    explore: "استكشف",
    startTrial: "ابدأ التجربة المجانية",
    subscribe: "اشترك",
    billing: "الاشتراك",
    benefitTitle: "تجربة تعلم جاهزة للاستخدام التجاري",
    noteTitle: "دعم اللغة العربية",
    noteBody: "تخطيط من اليمين لليسار وترجمات ثنائية لانتشار عالمي.",
    lecture: "المحاضرة",
    selectLecture: "اختر المحاضرة"
  }
};

const V_GAP = 62;
const H_GAP = 240;

const nodeW = (node, lang) => {
  if (node.id === "root") return 220;
  const len = (node.label?.[lang] || "").replace(/\n/g, "").length;
  return Math.min(Math.max(len * 7.1 + 32, 150), 210);
};

const nodeH = (node, lang) => {
  if (node.id === "root") return 54;
  return (node.label?.[lang] || "").includes("\n") ? 44 : 36;
};

const countLeaves = (node, expanded) => {
  if (!node.children?.length || !expanded[node.id]) return 1;
  return node.children.reduce((sum, child) => sum + countLeaves(child, expanded), 0);
};

const buildLayout = (node, x, y, expanded, lang, dir) => {
  const w = nodeW(node, lang);
  const h = nodeH(node, lang);
  const result = { ...node, x, y, w, h, _ch: [] };
  if (!node.children?.length || !expanded[node.id]) return result;
  const total = countLeaves(node, expanded);
  let cy = y - ((total - 1) * V_GAP) / 2;
  for (const child of node.children) {
    const leaves = countLeaves(child, expanded);
    const childY = cy + ((leaves - 1) * V_GAP) / 2;
    result._ch.push(buildLayout(child, x + H_GAP * dir, childY, expanded, lang, dir));
    cy += leaves * V_GAP;
  }
  return result;
};

const flatNodes = (node) => [node, ...(node._ch || []).flatMap(flatNodes)];
const flatEdges = (node) =>
  (node._ch || []).flatMap((child) => [
    {
      id: `${node.id}→${child.id}`,
      x1: node.x + node.w / 2,
      y1: node.y,
      x2: child.x - child.w / 2,
      y2: child.y,
      branch: child.branch
    },
    ...flatEdges(child)
  ]);

const curvePath = (x1, y1, x2, y2) => {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
};

const nodeContains = (node, targetId) => {
  if (node.id === targetId) return true;
  return node.children?.some((child) => nodeContains(child, targetId)) || false;
};

const findBranch = (nodeId, rootMap) => {
  if (nodeId === "root") return null;
  for (const child of rootMap.children) if (nodeContains(child, nodeId)) return child.id;
  return null;
};

export default function HomePage() {
  const maps = mindmapData.mindmaps;
  const [activeMapId, setActiveMapId] = useState(maps[0]?.id ?? "");
  const [expanded, setExpanded] = useState({ root: true });
  const [focusBranch, setFocusBranch] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [search, setSearch] = useState("");
  const [lang, setLang] = useState("en");

  const ui = UI[lang];
  const isRtl = lang === "ar";
  const dir = isRtl ? -1 : 1;

  const activeMap = maps.find((map) => map.id === activeMapId) ?? maps[0];
  const mindMap = activeMap?.map;

  const root = useMemo(
    () => buildLayout(mindMap, 120, 520, expanded, lang, dir),
    [expanded, lang, dir, mindMap]
  );
  const nodes = useMemo(() => flatNodes(root), [root]);
  const edges = useMemo(() => flatEdges(root), [root]);

  const bounds = useMemo(() => {
    const xs = nodes.flatMap((n) => [n.x - n.w / 2, n.x + n.w / 2]);
    const ys = nodes.flatMap((n) => [n.y - n.h / 2, n.y + n.h / 2]);
    return {
      x: Math.min(...xs),
      y: Math.min(...ys),
      w: Math.max(...xs) - Math.min(...xs),
      h: Math.max(...ys) - Math.min(...ys)
    };
  }, [nodes]);

  const PAD = 70;
  const svgW = bounds.w + PAD * 2;
  const svgH = bounds.h + PAD * 2;
  const ox = -bounds.x + PAD;
  const oy = -bounds.y + PAD;

  const searchText = search.toLowerCase();

  const matchNode = (node) => {
    if (!searchText) return true;
    const label = node.label?.[lang] || "";
    return label.toLowerCase().includes(searchText);
  };

  const getNodeOpacity = (node) => {
    if (!matchNode(node)) return 0.18;
    if (!focusBranch) return 1;
    if (node.id === "root") return 0.4;
    return node.branch === focusBranch ? 1 : 0.08;
  };

  const getEdgeOpacity = (edge) => {
    if (focusBranch) return edge.branch === focusBranch ? 0.85 : 0.05;
    return 0.75;
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-ink-900 text-ink-300">
      <div className="grid-background min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 border-b border-ink-700 bg-ink-900/90 backdrop-blur">
          <div className={`flex items-center gap-4 ${isRtl ? "rtl-row" : ""}`}>
            <div className="h-10 w-10 rounded-2xl border border-indigo-500/40 bg-indigo-500/10 flex items-center justify-center shadow-glow">
              <span className="text-indigo-300 font-semibold text-sm">FL</span>
            </div>
            <div className="rtl-text">
              <div className="font-display text-xs tracking-[0.3em] text-white">{ui.title}</div>
              <div className="text-[11px] text-ink-400">{ui.tagline}</div>
            </div>
          </div>

          <nav className={`hidden lg:flex items-center gap-6 text-xs text-ink-400 ${isRtl ? "rtl-row" : ""}`}>
            {[ui.dashboard, ui.mindMap, ui.resources, ui.progress].map((item) => (
              <button key={item} className="hover:text-indigo-300 transition">
                {item}
              </button>
            ))}
          </nav>

          <div className={`flex items-center gap-3 ${isRtl ? "rtl-row" : ""}`}>
            <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-[11px]">
              <span className="text-ink-400">{ui.language}</span>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-full ${lang === "en" ? "bg-indigo-500 text-white" : "text-ink-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-2 py-0.5 rounded-full ${lang === "ar" ? "bg-indigo-500 text-white" : "text-ink-400"}`}
              >
                AR
              </button>
            </div>
            <button className="text-xs border border-indigo-500/50 text-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-500/10 transition">
              {ui.startTrial}
            </button>
          </div>
        </header>

        <main className="px-6 py-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="glass-panel rounded-3xl p-6 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="rtl-text">
                <p className="text-xs text-ink-400 uppercase tracking-[0.3em]">{ui.overview}</p>
                <h1 className="text-2xl text-white font-display mt-2">
                  {activeMap?.title?.[lang] ?? ui.benefitTitle}
                </h1>
                <p className="text-sm text-ink-400 mt-2 max-w-xl">
                  {activeMap?.description?.[lang] ?? ""}
                </p>
              </div>
              <div className={`flex items-center gap-3 ${isRtl ? "rtl-row" : ""}`}>
                <div className="glass-panel px-4 py-2 rounded-2xl text-xs">
                  <p className="text-ink-400">{ui.progressText}</p>
                  <p className="text-indigo-300 text-lg font-semibold">68%</p>
                </div>
                <button
                  onClick={() => setFocusBranch(null)}
                  className="px-4 py-2 rounded-2xl bg-indigo-500/20 text-indigo-200 text-xs"
                >
                  {ui.focusMode}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-ink-400" htmlFor="lecture-select">
                  {ui.lecture}
                </label>
                <select
                  id="lecture-select"
                  value={activeMapId}
                  onChange={(event) => {
                    setActiveMapId(event.target.value);
                    setExpanded({ root: true });
                    setFocusBranch(null);
                    setSearch("");
                  }}
                  className="bg-ink-850 border border-ink-700 rounded-xl px-3 py-2 text-sm text-ink-300"
                >
                  {maps.map((map) => (
                    <option key={map.id} value={map.id}>
                      {map.title?.[lang] ?? map.id}
                    </option>
                  ))}
                </select>
              </div>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={ui.search}
                className="bg-ink-850 border border-ink-700 rounded-xl px-4 py-2 text-sm text-ink-300 w-full md:w-72"
              />
              <div className="flex flex-wrap gap-2">
                {mindMap.children.map((branch, index) => (
                  <button
                    key={branch.id}
                    onClick={() =>
                      setFocusBranch((current) => (current === branch.id ? null : branch.id))
                    }
                    className="px-3 py-1.5 rounded-full text-[11px] border border-ink-700 hover:border-indigo-400"
                    style={{ color: LABEL_COLORS[index % LABEL_COLORS.length] }}
                  >
                    {branch.label?.[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-ink-700 bg-ink-900/60 overflow-auto">
              <div className="min-w-[900px]" style={{ minHeight: svgH }}>
                <svg width={svgW} height={svgH} className="block">
                  <defs>
                    {Object.entries(C).map(([k, v]) => (
                      <filter key={k} id={`glow-${k}`}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    ))}
                  </defs>

                  {edges.map((edge) => {
                    const col = C[edge.branch]?.main || "#818CF8";
                    return (
                      <path
                        key={edge.id}
                        d={curvePath(edge.x1 + ox, edge.y1 + oy, edge.x2 + ox, edge.y2 + oy)}
                        fill="none"
                        stroke={col}
                        strokeWidth="1.2"
                        strokeOpacity={getEdgeOpacity(edge)}
                      />
                    );
                  })}

                  {nodes.map((node) => {
                    const nx = node.x + ox;
                    const ny = node.y + oy;
                    const isRoot = node.id === "root";
                    const col = C[node.branch] || C.root;
                    const isHovered = hovered === node.id;
                    const hasKids = !!node.children?.length;
                    const isExpanded = expanded[node.id];
                    const lines = (node.label?.[lang] || "").split("\n");

                    return (
                      <g
                        key={node.id}
                        style={{ opacity: getNodeOpacity(node), cursor: hasKids ? "pointer" : "default" }}
                        onMouseEnter={() => setHovered(node.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                          if (hasKids) {
                            setExpanded((prev) => ({ ...prev, [node.id]: !prev[node.id] }));
                          }
                        }}
                      >
                        {isHovered && (
                          <rect
                            x={nx - node.w / 2 - 5}
                            y={ny - node.h / 2 - 5}
                            width={node.w + 10}
                            height={node.h + 10}
                            rx={isRoot ? 12 : 9}
                            fill={col.glow}
                          />
                        )}
                        <rect
                          x={nx - node.w / 2}
                          y={ny - node.h / 2}
                          width={node.w}
                          height={node.h}
                          rx={isRoot ? 10 : 7}
                          fill={col.bg}
                          stroke={isHovered ? col.main : col.border}
                          strokeWidth={isRoot ? 1.8 : 1.2}
                          strokeOpacity={isHovered ? 1 : 0.65}
                        />
                        {isRoot && (
                          <rect
                            x={nx - node.w / 2}
                            y={ny - node.h / 2}
                            width={3}
                            height={node.h}
                            rx={2}
                            fill={col.main}
                          />
                        )}
                        {lines.map((line, index) => (
                          <text
                            key={`${node.id}-${index}`}
                            x={nx}
                            y={ny + (lines.length > 1 ? (index === 0 ? -8 : 8) : 0)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isHovered || isRoot ? col.main : "#94A3B8"}
                            fontSize={isRoot ? 11 : 9.5}
                            fontWeight={isRoot ? 600 : 400}
                            fontFamily="IBM Plex Mono, monospace"
                          >
                            {line}
                          </text>
                        ))}
                        {hasKids && (
                          <circle
                            cx={nx + node.w / 2 - 10}
                            cy={ny}
                            r={4}
                            fill={isExpanded ? col.main : "transparent"}
                            stroke={col.main}
                            strokeWidth={1}
                            strokeOpacity={0.7}
                          />
                        )}
                        {isHovered && (
                          <text
                            x={nx}
                            y={ny + node.h / 2 + 16}
                            textAnchor="middle"
                            fontSize={9}
                            fill="#64748B"
                          >
                            {ui.explore}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-white">{ui.billing}</h2>
                <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-200">
                  {ui.upgrade}
                </span>
              </div>
              <div className="mt-4 grid gap-4">
                {[ui.pro, ui.enterprise].map((plan, index) => (
                  <div key={plan} className="border border-ink-700 rounded-2xl p-4 bg-ink-850/60">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{plan}</span>
                      <span className="text-xs text-indigo-300">{index === 0 ? "$18" : "$42"}/mo</span>
                    </div>
                    <p className="text-xs text-ink-400 mt-2">
                      {index === 0
                        ? "Unlimited mind map revisions, AI summaries, and exportable study kits."
                        : "Team collaboration, analytics dashboard, and branded portals."}
                    </p>
                    <button className="mt-3 w-full text-xs px-3 py-2 rounded-xl border border-indigo-500/50 text-indigo-200 hover:bg-indigo-500/10">
                      {ui.subscribe}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-5">
              <h3 className="text-sm text-white">{ui.insights}</h3>
              <div className="mt-4 space-y-3">
                {["Protocol mastery", "Latency analysis", "Security foundations"].map((item) => (
                  <div key={item} className="flex items-center justify-between text-xs text-ink-400">
                    <span>{item}</span>
                    <span className="text-indigo-300">{Math.floor(Math.random() * 35 + 60)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-5">
              <h3 className="text-sm text-white">{ui.aiSummary}</h3>
              <p className="text-xs text-ink-400 mt-3 leading-6">
                Generate high-quality summaries, examples, and quiz prompts from any node to deliver premium
                learning content.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Summarize", "Quiz", "Compare", "Flashcards"].map((item) => (
                  <span
                    key={item}
                    className="text-[11px] px-3 py-1 rounded-full border border-ink-700 text-ink-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-5">
              <h3 className="text-sm text-white">{ui.noteTitle}</h3>
              <p className="text-xs text-ink-400 mt-3 leading-6">{ui.noteBody}</p>
              <div className={`mt-4 flex gap-2 ${isRtl ? "rtl-row" : ""}`}>
                <button className="text-xs px-3 py-2 rounded-xl border border-ink-700 text-ink-300">
                  {ui.quickActions}
                </button>
                <button className="text-xs px-3 py-2 rounded-xl bg-indigo-500/20 text-indigo-200">
                  {ui.schedule}
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
