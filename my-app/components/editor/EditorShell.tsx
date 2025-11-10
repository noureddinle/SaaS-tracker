"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useGrapes } from "./useGrapes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SEED_HTML } from "./blocks/registerBlocks";

const DEVICES = ["Desktop", "Tablet", "Mobile"] as const;

export default function EditorShell() {
  const { editor, ready } = useGrapes({
    container: "#gjs-canvas",
    initialHtml: SEED_HTML,
  });

  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const [currentDevice, setCurrentDevice] = useState<(typeof DEVICES)[number]>("Desktop");
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!editor) return;
    const doc = editor.Canvas.getDocument();
    doc?.documentElement?.style.setProperty("--brand", primaryColor);
  }, [primaryColor, editor]);

  useEffect(() => {
    if (!ready) return;
    const container = document.getElementById("gjs-blocks");
    if (!container) return;

    const applyStyles = () => {
      container.querySelectorAll<HTMLElement>(".gjs-block").forEach((block) => {
        block.style.background = "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)";
        block.style.color = "#d9dcff";
        block.style.borderRadius = "16px";
        block.style.border = "1px solid rgba(255,255,255,0.07)";
        block.style.boxShadow = "0 8px 18px -12px rgba(0,0,0,0.6)";
        block.classList.add(
          "px-3",
          "py-4",
          "text-left",
          "transition",
          "duration-150",
          "hover:-translate-y-[2px]",
          "hover:bg-white/10",
          "hover:border-white/20"
        );
      });
      container
        .querySelectorAll<HTMLElement>(".gjs-block-category .gjs-title")
        .forEach((title) => {
          title.classList.add(
            "text-[11px]",
            "uppercase",
            "tracking-[0.22em]",
            "text-neutral-500",
            "pl-1",
            "pb-1"
          );
        });
    };

    applyStyles();

    const observer = new MutationObserver(() => applyStyles());
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [ready]);

  const handleUploadLogo = (event: ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const imageComponent = editor.getWrapper().find('[data-gjs-type="image"]')[0];
      if (imageComponent) {
        imageComponent.addAttributes({ src: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = useCallback(async () => {
    if (!editor) return;
    setSaving(true);
    try {
      const html = editor.getHtml();
      const css = editor.getCss();
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/templates/save/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ html, css, name: "My Invoice" }),
      });
      setLastSavedAt(new Date());
    } finally {
      setSaving(false);
    }
  }, [editor]);

  const handleExportPdf = useCallback(async () => {
    if (!editor) return;
    setExporting(true);
    try {
      const html = editor.getHtml();
      const css = editor.getCss();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/export-pdf/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ html, css, filename: "invoice.pdf" }),
      });

      if (!response.ok) return;

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }, [editor]);

  const handleDevice = (device: (typeof DEVICES)[number]) => {
    if (!editor) return;
    editor.setDevice(device);
    setCurrentDevice(device);
  };

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      <aside className="w-[270px] border-r border-white/5 bg-neutral-950/60 backdrop-blur-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">Blocks</h2>
          <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[10px] font-medium text-indigo-300">Drag & Drop</span>
        </div>
        <Separator className="my-4 bg-white/5" />
        <div className="h-[calc(100vh-140px)] overflow-auto pr-1" id="gjs-blocks" />
        {!ready && <p className="mt-4 text-[11px] text-neutral-500">Loading block library…</p>}
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="relative flex items-center border-b border-white/5 bg-neutral-950/70 px-6 py-5 backdrop-blur-xl shadow-lg shadow-black/20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent" />
          <div className="relative flex w-full flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/5 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.24em] text-indigo-200">
                  Template
                </span>
                {lastSavedAt && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-[2px] text-[10px] font-medium text-neutral-300">
                    Saved {lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
                {!lastSavedAt && (
                  <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-[2px] text-[10px] font-medium text-amber-200">
                    Draft not saved
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold">Invoice Template Editor</h1>
              </div>
              <p className="max-w-xl text-sm text-neutral-400">
                Craft polished invoices by dragging blocks onto the canvas, then export a ready-to-share PDF in seconds.
              </p>
            </div>

            <div className="flex flex-col gap-3 xl:items-end">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase text-neutral-400">Device</span>
                <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                  {DEVICES.map((device) => (
                    <Button
                      key={device}
                      size="sm"
                      variant={currentDevice === device ? "primary" : "ghost"}
                      className="rounded-full px-3"
                      onClick={() => handleDevice(device)}
                      disabled={!editor}
                    >
                      {device}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => editor?.runCommand("core:undo")} disabled={!editor}>
                  Undo
                </Button>
                <Button variant="ghost" size="sm" onClick={() => editor?.runCommand("core:redo")} disabled={!editor}>
                  Redo
                </Button>
                <Button variant="ghost" size="sm" onClick={() => editor?.runCommand("preview")} disabled={!editor}>
                  Preview
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  loading={saving}
                  onClick={handleSave}
                  disabled={!editor || saving}
                >
                  {lastSavedAt ? "Save" : "Save draft"}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  loading={exporting}
                  onClick={handleExportPdf}
                  disabled={!editor || exporting}
                >
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="relative flex-1 overflow-hidden bg-neutral-950">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_55%)]" />
          <div id="gjs-canvas" className="relative h-full" />
        </main>
      </div>

      <aside className="w-80 border-l border-white/5 bg-neutral-950/60 p-5 backdrop-blur-xl">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 shadow-lg shadow-black/10">
          <h3 className="text-sm font-semibold text-white">Theme</h3>
          <p className="text-[11px] text-neutral-400">Adjust brand accents globally</p>
          <Separator className="my-3 bg-white/5" />
          <Label className="text-xs text-neutral-400">Primary color</Label>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="h-12 w-12 cursor-pointer rounded-xl border border-white/10 bg-neutral-900 shadow-inner shadow-black/40"
            />
            <Input
              value={primaryColor}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="border-white/10 bg-neutral-900 text-sm"
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-4 shadow-lg shadow-black/10">
          <h3 className="text-sm font-semibold text-white">Brand assets</h3>
          <p className="text-[11px] text-neutral-400">Upload a custom logo to reuse in blocks</p>
          <Separator className="my-3 bg-white/5" />
          <Input type="file" accept="image/*" onChange={handleUploadLogo} className="border-white/10 bg-neutral-900" />
        </div>

        {!ready && (
          <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-xs text-neutral-400">
            Initialising editor… this can take a few seconds the first time.
          </div>
        )}
      </aside>
    </div>
  );
}

