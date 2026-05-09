"use client";

import Link from "next/link";

export default function TopNav({ ui, lang, setLang, active, isRtl }) {
  const linkClass = (key) =>
    `transition ${active === key ? "text-indigo-300" : "text-ink-400 hover:text-indigo-300"}`;

  return (
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

      <nav className={`hidden lg:flex items-center gap-6 text-xs ${isRtl ? "rtl-row" : ""}`}>
        <Link href="/dashboard" className={linkClass("dashboard")}>
          {ui.dashboard}
        </Link>
        <Link href="/" className={linkClass("mindmap")}>
          {ui.mindMap}
        </Link>
        <button className="text-ink-400 hover:text-indigo-300 transition" type="button">
          {ui.resources}
        </button>
        <button className="text-ink-400 hover:text-indigo-300 transition" type="button">
          {ui.progress}
        </button>
      </nav>

      <div className={`flex items-center gap-3 ${isRtl ? "rtl-row" : ""}`}>
        <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-[11px]">
          <span className="text-ink-400">{ui.language}</span>
          <button
            onClick={() => setLang("en")}
            className={`px-2 py-0.5 rounded-full ${lang === "en" ? "bg-indigo-500 text-white" : "text-ink-400"}`}
            type="button"
          >
            EN
          </button>
          <button
            onClick={() => setLang("ar")}
            className={`px-2 py-0.5 rounded-full ${lang === "ar" ? "bg-indigo-500 text-white" : "text-ink-400"}`}
            type="button"
          >
            AR
          </button>
        </div>
        <button className="text-xs border border-indigo-500/50 text-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-500/10 transition" type="button">
          {ui.startTrial}
        </button>
      </div>
    </header>
  );
}
