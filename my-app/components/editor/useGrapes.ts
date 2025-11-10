"use client";

import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useEffect, useRef, useState } from "react";
import registerBlocks from "./blocks/registerBlocks";

type Opts = {
  container: string;
  initialHtml?: string;
  initialCss?: string;
};

export function useGrapes({ container, initialHtml = "", initialCss = "" }: Opts) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [ready, setReady] = useState(false);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const e = grapesjs.init({
      container,
      height: "100%",
      fromElement: false,
      storageManager: false,
      noticeOnUnload: false,
      selectorManager: { componentFirst: true },
      deviceManager: {
        devices: [
          { id: "Desktop", name: "Desktop", width: "" },
          { id: "Tablet", name: "Tablet", width: "768px" },
          { id: "Mobile", name: "Mobile", width: "375px" },
        ],
      },
      canvas: {
        styles: [
          `:root { --brand: #4F46E5; }
           body { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Inter, Arial;
             line-height: 1.45; color: #111; }
           h1, h2 { margin: 0 0 .5rem; }`,
          `.thin { font-weight: 300; } .muted { color: #666; }`,
          `.brand { color: var(--brand); } .brand-bg { background: var(--brand); } .brand-border { border-color: var(--brand); }`,
          `.row { display: flex; gap: 8px; } .col { flex: 1; }`,
          `.table { width: 100%; border-collapse: collapse; }
           .table th, .table td { border-bottom: 1px dashed #bbb; padding: 8px 6px; font-size: 13.5px; }`,
          `.box { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }`,
        ],
      },
      assetManager: {
        upload: false,
        assets: [],
      },
      styleManager: {
        sectors: [
          { name: "General", open: true, properties: ["width", "min-height", "padding", "margin", "opacity"] },
          { name: "Typography", open: false, properties: ["font-family", "font-size", "font-weight", "color", "text-align"] },
          { name: "Decorations", open: false, properties: ["background-color", "border", "border-radius", "box-shadow"] },
        ],
      },
      blockManager: {
        appendTo: "#gjs-blocks",
      },
    });

    if (initialCss) {
      e.setStyle(initialCss);
    }

    e.Commands.add("preview", {
      run(ed) {
        ed.runCommand("core:preview");
      },
      stop(ed) {
        ed.stopCommand("core:preview");
      },
    });

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        e.AssetManager.add({ src: dataUrl });
      };
      reader.readAsDataURL(file);
    };

    e.AssetManager.addType?.("image", {});
    e.on("asset:request", () => input.click());

    e.on("frame:loaded", () => {
      const doc = e.Canvas.getDocument();
      if (doc?.body) {
        doc.body.style.background = "#f5f6f8";
        doc.body.style.minHeight = "100vh";
        doc.body.style.padding = "40px";
        doc.body.style.display = "block";
      }

      if (initialHtml) {
        e.DomComponents.clear();
        e.addComponents(initialHtml);
        e.render();
      }

      const wrapperEl = e.getWrapper();
      if (wrapperEl) {
        wrapperEl.setStyle({ background: "transparent", padding: "0" });
      }

      e.Canvas.setZoom(1);
      const frame = e.Canvas.getFrameEl();
      if (frame) {
        frame.style.background = "transparent";
      }
    });

    e.setDevice("Desktop");
    registerBlocks(e);

    setEditor(e);
    setReady(true);

    return () => {
      e.destroy();
      setEditor(null);
      setReady(false);
    };
  }, [container, initialCss, initialHtml]);

  return { editor, ready };
}
