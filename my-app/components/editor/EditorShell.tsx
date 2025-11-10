"use client";

import React, { useEffect, useState } from "react";
import { useGrapes } from "./useGrapes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SEED_HTML = `
<div class="max-w-4xl mx-auto p-10">
  <div class="flex items-center gap-6 mb-8">
    <div data-gjs-type="image" class="w-28 h-28 bg-gray-200 flex items-center justify-center">Logo</div>
    <div>
      <h1 class="text-3xl font-bold">Invoice #INV-0001</h1>
      <div class="text-gray-500">Your Company · Address · City</div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-8 mb-6">
    <div>
      <div class="font-semibold">Bill To</div>
      <div class="text-gray-600">Client Name</div>
      <div class="text-gray-600">client@email.com</div>
    </div>
    <div class="text-right text-gray-600">
      <div>Date: 2025-11-09</div>
      <div>Due: 2025-11-23</div>
    </div>
  </div>

  <table class="w-full border-t border-b">
    <thead>
      <tr class="text-left">
        <th class="py-3">Description</th>
        <th class="py-3">Qty</th>
        <th class="py-3">Rate</th>
        <th class="py-3 text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-t">
        <td class="py-3">Design Work</td>
        <td class="py-3">10</td>
        <td class="py-3">250 MAD</td>
        <td class="py-3 text-right">2,500 MAD</td>
      </tr>
    </tbody>
  </table>

  <div class="mt-6 grid grid-cols-2">
    <div></div>
    <div class="text-right">
      <div class="text-gray-600">Subtotal 2,500 MAD</div>
      <div class="text-gray-600">Tax 0 MAD</div>
      <div class="text-2xl font-bold">Total 2,500 MAD</div>
    </div>
  </div>
</div>
`;

export default function EditorShell() {
  const canvasId = "#gjs-canvas";
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const { editor, ready } = useGrapes({
    container: canvasId,
    initialHtml: SEED_HTML,
  });

  useEffect(() => {
    if (!ready || !editor) return;
    const doc = editor.Canvas.getDocument();
    const root = doc.documentElement;
    root.style.setProperty("--brand", primaryColor);

    const existingStyle = doc.getElementById("theme-style") as HTMLStyleElement | null;
    const styleTag = existingStyle ?? (() => {
      const s = doc.createElement("style");
      s.id = "theme-style";
      doc.head.appendChild(s);
      return s;
    })();

    styleTag.textContent = `
      h1, h2, .text-brand { color: var(--brand); }
      .brand-bg { background: var(--brand); }
      .brand-border { border-color: var(--brand); }
    `;
  }, [primaryColor, ready, editor]);

  const handleUploadLogo = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSave = async () => {
    if (!editor) return;
    const html = editor.getHtml();
    const css = editor.getCss();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/templates/save/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ html, css, name: "My Invoice" }),
    });
  };

  const handleExportPdf = async () => {
    if (!editor) return;
    const html = editor.getHtml();
    const css = editor.getCss();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/export-pdf/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ html, css, filename: "invoice.pdf" }),
    });

    if (!response.ok) {
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-[100dvh] w-full bg-[#0b0c0f] text-white">
      <aside className="w-60 border-r border-neutral-800 p-3">
        <div className="mb-2 text-xs uppercase text-neutral-400">Documents</div>
        <div className="text-sm text-neutral-500">No templates yet.</div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="flex h-12 items-center gap-2 border-b border-neutral-800 px-3">
          <div className="mr-2 text-sm text-neutral-400">Device</div>
          <button
            className="rounded border border-neutral-800 bg-neutral-900 px-2 py-1 text-sm"
            onClick={() => editor?.setDevice("Desktop")}
          >
            Desktop
          </button>
          <button
            className="rounded border border-neutral-800 bg-neutral-900 px-2 py-1 text-sm"
            onClick={() => editor?.setDevice("Tablet")}
          >
            Tablet
          </button>
          <button
            className="rounded border border-neutral-800 bg-neutral-900 px-2 py-1 text-sm"
            onClick={() => editor?.setDevice("Mobile")}
          >
            Mobile
          </button>
          <div className="flex-1" />
          <Button variant="outline" size="sm" onClick={() => editor?.runCommand("core:undo")}>
            Undo
          </Button>
          <Button variant="outline" size="sm" onClick={() => editor?.runCommand("core:redo")}>
            Redo
          </Button>
          <Button variant="outline" size="sm" onClick={() => editor?.runCommand("preview")}>
            Preview
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" onClick={handleExportPdf}>
            Export PDF
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          <div id="gjs-canvas" className="h-full" />
        </div>
      </div>

      <aside className="w-80 space-y-4 border-l border-neutral-800 p-4">
        <div>
          <div className="text-sm font-semibold">Theme</div>
          <Separator className="my-2 bg-neutral-800" />
          <Label className="text-xs text-neutral-400">Primary color</Label>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="color"
              value={primaryColor}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="h-10 w-10 rounded border border-neutral-700 bg-neutral-900"
            />
            <Input
              value={primaryColor}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="border-neutral-800 bg-neutral-900"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs text-neutral-400">Logo</Label>
          <div className="mt-2">
            <Input type="file" accept="image/*" onChange={handleUploadLogo} />
          </div>
        </div>
      </aside>
    </div>
  );
}

