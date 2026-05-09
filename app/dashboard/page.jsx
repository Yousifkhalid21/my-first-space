"use client";

import { useState } from "react";
import Link from "next/link";
import mindmapData from "../../data/mindmaps.json";
import { UI } from "../lib/ui";
import TopNav from "../components/TopNav";

export default function DashboardPage() {
  const maps = mindmapData.mindmaps;
  const [lang, setLang] = useState("en");
  const ui = UI[lang];
  const isRtl = lang === "ar";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-ink-900 text-ink-300">
      <div className="grid-background min-h-screen">
        <TopNav ui={ui} lang={lang} setLang={setLang} active="dashboard" isRtl={isRtl} />

        <main className="px-6 py-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="glass-panel rounded-3xl p-6 flex flex-col gap-4">
            <div className="rtl-text">
              <p className="text-xs text-ink-400 uppercase tracking-[0.3em]">{ui.studyArea}</p>
              <h1 className="text-2xl text-white font-display mt-2">{ui.dashboard}</h1>
              <p className="text-sm text-ink-400 mt-2 max-w-2xl">{ui.dashboardIntro}</p>
            </div>

            <div className="grid gap-3 mt-2">
              {maps.map((map) => (
                <Link
                  key={map.id}
                  href={`/?lecture=${map.id}`}
                  className="border border-ink-700 rounded-2xl p-4 bg-ink-850/60 hover:border-indigo-400 transition"
                >
                  <div className={`flex items-center justify-between ${isRtl ? "rtl-row" : ""}`}>
                    <span className="text-sm text-white">{map.title?.[lang] ?? map.id}</span>
                    <span className="text-[11px] text-indigo-300">{ui.openMindMap}</span>
                  </div>
                  <p className="text-xs text-ink-400 mt-2">{map.description?.[lang] ?? ""}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-5">
              <h2 className="text-sm text-white">{ui.insights}</h2>
              <div className="mt-4 space-y-3">
                {["Lecture completion", "Mind map exploration", "Active study"].map((item) => (
                  <div key={item} className="flex items-center justify-between text-xs text-ink-400">
                    <span>{item}</span>
                    <span className="text-indigo-300">{Math.floor(Math.random() * 20 + 70)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-5">
              <h3 className="text-sm text-white">{ui.aiSummary}</h3>
              <p className="text-xs text-ink-400 mt-3 leading-6">
                Activate quizzes and flashcards from each mind map to keep learners engaged.
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex text-xs px-3 py-2 rounded-xl bg-indigo-500/20 text-indigo-200"
              >
                {ui.mindMap}
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
