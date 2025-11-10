"use client";

import grapesjs, { Editor } from "grapesjs";
import { useEffect, useRef, useState } from "react";

type UseGrapesOptions = {
  container: string;
  initialHtml?: string;
  initialCss?: string;
  onReady?: (editor: Editor) => void;
};

export function useGrapes({ container, initialHtml, initialCss, onReady }: UseGrapesOptions) {
  const editorRef = useRef<Editor | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ed = grapesjs.init({
      container,
      height: "100vh",
      fromElement: false,
      storageManager: false,
      layerManager: { appendTo: null },
      selectorManager: { appendTo: null },
      styleManager: { appendTo: null },
      blockManager: { appendTo: null },
      traitManager: { appendTo: null },
      showOffsets: false,
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.4/dist/tailwind.min.css",
        ],
      },
    });

    if (initialHtml) {
      ed.setComponents(initialHtml);
    }
    if (initialCss) {
      ed.setStyle(initialCss);
    }

    ed.on("load", () => {
      const doc = ed.Canvas.getDocument();
      if (!doc?.createElement) {
        return;
      }
      const style = doc.createElement("style");
      style.innerHTML = `
        .gjs-selected, .gjs-hovered { outline: none !important; }
        body { -webkit-font-smoothing: antialiased; }
      `;
      doc.head?.appendChild(style);
    });

    editorRef.current = ed;
    setReady(true);
    onReady?.(ed);

    return () => {
      ed.destroy();
      editorRef.current = null;
      setReady(false);
    };
  }, [container, initialCss, initialHtml, onReady]);

  return { editor: editorRef.current, ready };
}

