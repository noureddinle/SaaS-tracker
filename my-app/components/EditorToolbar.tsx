"use client";

type ToolbarProps = {
  editor: any;
  onSave: () => void;
  saving: boolean;
  onExportPdf: () => void;
  exporting: boolean;
};

export default function EditorToolbar({ editor, onSave, saving, onExportPdf, exporting }: ToolbarProps) {
  const run = (cmd: string) => editor && editor.runCommand(cmd);

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
      <button className="px-2 py-1 text-sm rounded hover:bg-neutral-800" onClick={() => run("undo")} disabled={!editor}>Undo</button>
      <button className="px-2 py-1 text-sm rounded hover:bg-neutral-800" onClick={() => run("redo")} disabled={!editor}>Redo</button>
      <span className="mx-2 h-5 w-px bg-neutral-800" />
      <button className="px-2 py-1 text-sm rounded hover:bg-neutral-800" onClick={() => run("preview")} disabled={!editor}>Preview</button>
      <button className="px-2 py-1 text-sm rounded hover:bg-neutral-800" onClick={() => run("fullscreen")} disabled={!editor}>Fullscreen</button>
      <span className="mx-2 h-5 w-px bg-neutral-800" />
      <button className="px-3 py-1 text-sm rounded bg-neutral-800 hover:bg-neutral-700" onClick={onSave} disabled={saving || !editor}>
        {saving ? "Saving…" : "Save"}
      </button>
      <button className="px-3 py-1 text-sm rounded bg-white text-black hover:opacity-90" onClick={onExportPdf} disabled={exporting || !editor}>
        {exporting ? "Exporting…" : "Export PDF"}
      </button>
    </div>
  );
}