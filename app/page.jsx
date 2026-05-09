"use client";

import { useMemo, useState } from "react";

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
    subtitle: "Introduction to Computer Networking",
    aiSummary: "AI Summaries",
    insights: "Learning Insights",
    progressText: "Learning momentum",
    focusMode: "Focus mode",
    explore: "Explore",
    startTrial: "Start free trial",
    subscribe: "Subscribe",
    billing: "Subscription",
    benefitTitle: "Commercial-ready learning experience",
    benefitBody: "Structured modules, premium summaries, and analytics to monetize your content responsibly.",
    noteTitle: "Arabic support",
    noteBody: "Instant RTL layout and bilingual labels for global reach."
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
    subtitle: "مدخل إلى شبكات الحاسوب",
    aiSummary: "ملخصات الذكاء الاصطناعي",
    insights: "رؤى التعلم",
    progressText: "زخم التعلم",
    focusMode: "وضع التركيز",
    explore: "استكشف",
    startTrial: "ابدأ التجربة المجانية",
    subscribe: "اشترك",
    billing: "الاشتراك",
    benefitTitle: "تجربة تعلم جاهزة للاستخدام التجاري",
    benefitBody: "وحدات منظمة، ملخصات مميزة، وتحليلات لتحقيق دخل مستدام.",
    noteTitle: "دعم اللغة العربية",
    noteBody: "تخطيط من اليمين لليسار وترجمات ثنائية لانتشار عالمي."
  }
};

const MIND_MAP = {
  id: "root",
  label: {
    en: "Introduction to\nComputer Networking",
    ar: "مدخل إلى\nشبكات الحاسوب"
  },
  branch: "root",
  children: [
    {
      id: "doi",
      label: { en: "Definition of Internet", ar: "تعريف الإنترنت" },
      branch: "doi",
      children: [
        {
          id: "nuts",
          label: { en: "Nuts and Bolts View", ar: "الرؤية التقنية" },
          branch: "doi",
          children: [
            { id: "n1", label: { en: "End systems / hosts", ar: "الأنظمة الطرفية" }, branch: "doi" },
            { id: "n2", label: { en: "Packet switches", ar: "مبدلات الحزم" }, branch: "doi" },
            { id: "n3", label: { en: "Comm. links", ar: "روابط الاتصال" }, branch: "doi" },
            { id: "n4", label: { en: "Transmission rate", ar: "معدل الإرسال" }, branch: "doi" }
          ]
        },
        {
          id: "svc",
          label: { en: "Services View", ar: "رؤية الخدمات" },
          branch: "doi",
          children: [
            { id: "s1", label: { en: "Infrastructure", ar: "البنية التحتية" }, branch: "doi" },
            { id: "s2", label: { en: "Web, streaming, email", ar: "الويب والبث والبريد" }, branch: "doi" },
            { id: "s3", label: { en: "Programming interface", ar: "واجهة البرمجة" }, branch: "doi" }
          ]
        },
        { id: "non", label: { en: "Network of Networks", ar: "شبكة من الشبكات" }, branch: "doi" }
      ]
    },
    {
      id: "proto",
      label: { en: "Protocols", ar: "البروتوكولات" },
      branch: "proto",
      children: [
        { id: "p1", label: { en: "Human vs. Network", ar: "بشري مقابل شبكي" }, branch: "proto" },
        { id: "p2", label: { en: "Message formats", ar: "تنسيقات الرسائل" }, branch: "proto" },
        { id: "p3", label: { en: "Actions on receipt", ar: "إجراءات الاستلام" }, branch: "proto" },
        {
          id: "p4",
          label: { en: "Standards", ar: "المعايير" },
          branch: "proto",
          children: [
            { id: "p4a", label: { en: "RFC", ar: "RFC" }, branch: "proto" },
            { id: "p4b", label: { en: "IETF", ar: "IETF" }, branch: "proto" }
          ]
        },
        { id: "p5", label: { en: "HTTP, TCP, IP", ar: "HTTP و TCP و IP" }, branch: "proto" }
      ]
    },
    {
      id: "is",
      label: { en: "Internet Structure", ar: "بنية الإنترنت" },
      branch: "is",
      children: [
        {
          id: "ne",
          label: { en: "Network Edge", ar: "حافة الشبكة" },
          branch: "is",
          children: [
            { id: "ne1", label: { en: "Hosts", ar: "المضيفون" }, branch: "is" },
            { id: "ne2", label: { en: "Data centers", ar: "مراكز البيانات" }, branch: "is" }
          ]
        },
        {
          id: "an",
          label: { en: "Access Networks", ar: "شبكات الوصول" },
          branch: "is",
          children: [
            { id: "an1", label: { en: "Residential", ar: "سكنية" }, branch: "is" },
            { id: "an2", label: { en: "Institutional", ar: "مؤسسية" }, branch: "is" },
            { id: "an3", label: { en: "Mobile", ar: "محمولة" }, branch: "is" }
          ]
        },
        {
          id: "nc",
          label: { en: "Network Core", ar: "نواة الشبكة" },
          branch: "is",
          children: [
            { id: "nc1", label: { en: "Interconnected routers", ar: "موجهات مترابطة" }, branch: "is" },
            { id: "nc2", label: { en: "Network of networks", ar: "شبكة الشبكات" }, branch: "is" }
          ]
        }
      ]
    },
    {
      id: "kc",
      label: { en: "Key Concepts", ar: "المفاهيم الأساسية" },
      branch: "kc",
      children: [
        {
          id: "perf",
          label: { en: "Performance", ar: "الأداء" },
          branch: "kc",
          children: [
            { id: "kc1a", label: { en: "Loss", ar: "الفقد" }, branch: "kc" },
            { id: "kc1b", label: { en: "Delay", ar: "التأخير" }, branch: "kc" },
            { id: "kc1c", label: { en: "Throughput", ar: "المرور" }, branch: "kc" }
          ]
        },
        { id: "kc2", label: { en: "Protocol layers", ar: "طبقات البروتوكول" }, branch: "kc" },
        { id: "kc3", label: { en: "Network security", ar: "أمن الشبكات" }, branch: "kc" },
        { id: "kc4", label: { en: "History of the Internet", ar: "تاريخ الإنترنت" }, branch: "kc" }
      ]
    },
    {
      id: "iot",
      label: { en: "Connected Devices", ar: "الأجهزة المتصلة" },
      branch: "iot",
      children: [
        { id: "iot1", label: { en: "Mobile phones", ar: "الهواتف المحمولة" }, branch: "iot" },
        { id: "iot2", label: { en: "Web-enabled appliances", ar: "الأجهزة المتصلة بالويب" }, branch: "iot" },
        { id: "iot3", label: { en: "Wearables", ar: "الأجهزة القابلة للارتداء" }, branch: "iot" },
        { id: "iot4", label: { en: "Medical devices", ar: "الأجهزة الطبية" }, branch: "iot" },
        { id: "iot5", label: { en: "Vehicles", ar: "المركبات" }, branch: "iot" }
      ]
    }
  ]
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

const buildLayout = (node, x, y, expanded, lang) => {
  const w = nodeW(node, lang);
  const h = nodeH(node, lang);
  const result = { ...node, x, y, w, h, _ch: [] };
  if (!node.children?.length || !expanded[node.id]) return result;
  const total = countLeaves(node, expanded);
  let cy = y - ((total - 1) * V_GAP) / 2;
  for (const child of node.children) {
    const leaves = countLeaves(child, expanded);
    const childY = cy + ((leaves - 1) * V_GAP) / 2;
    result._ch.push(buildLayout(child, x + H_GAP, childY, expanded, lang));
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

const findBranch = (nodeId) => {
  if (nodeId === "root") return null;
  for (const child of MIND_MAP.children) if (nodeContains(child, nodeId)) return child.id;
  return null;
};

export default function HomePage() {
  const [expanded, setExpanded] = useState({ root: true });
  const [focusBranch, setFocusBranch] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [search, setSearch] = useState("");
  const [lang, setLang] = useState("en");

  const ui = UI[lang];
  const isRtl = lang === "ar";

  const root = useMemo(() => buildLayout(MIND_MAP, 120, 520, expanded, lang), [expanded, lang]);
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
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-2xl border border-indigo-500/40 bg-indigo-500/10 flex items-center justify-center shadow-glow">
              <span className="text-indigo-300 font-semibold text-sm">FL</span>
            </div>
            <div>
              <div className="font-display text-xs tracking-[0.3em] text-white">{ui.title}</div>
              <div className="text-[11px] text-ink-400">{ui.tagline}</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs text-ink-400">
            {[ui.dashboard, ui.mindMap, ui.resources, ui.progress].map((item) => (
              <button key={item} className="hover:text-indigo-300 transition">
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
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
              <div>
                <p className="text-xs text-ink-400 uppercase tracking-[0.3em]">{ui.overview}</p>
                <h1 className="text-2xl text-white font-display mt-2">{ui.subtitle}</h1>
                <p className="text-sm text-ink-400 mt-2 max-w-xl">
                  {ui.benefitBody}
                </p>
              </div>
              <div className="flex items-center gap-3">
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
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={ui.search}
                className="bg-ink-850 border border-ink-700 rounded-xl px-4 py-2 text-sm text-ink-300 w-full md:w-72"
              />
              <div className="flex gap-2">
                {MIND_MAP.children.map((branch, index) => (
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
              <div className="mt-4 flex gap-2">
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
