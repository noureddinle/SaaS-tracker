"use client";

type Props = {
  templates: { id: number; name: string; thumbnail_url?: string | null }[];
  loading: boolean;
  activeId: number | null;
  onSelect: (id: number) => void;
};

export default function TemplateSidebar({ templates, loading, activeId, onSelect }: Props) {
  return (
    <aside className="w-72 border-r border-neutral-800 bg-neutral-900 overflow-y-auto">
      <div className="p-4 border-b border-neutral-800">
        <h2 className="text-sm font-semibold text-neutral-300">Templates</h2>
      </div>

      {loading ? (
        <div className="p-4 text-neutral-500 text-sm">Loading templates…</div>
      ) : templates.length === 0 ? (
        <div className="p-4 text-neutral-500 text-sm">No templates yet.</div>
      ) : (
        <ul className="p-3 space-y-2">
          {templates.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => onSelect(t.id)}
                className={`w-full flex items-center gap-3 rounded-lg p-2 text-left hover:bg-neutral-800 transition ${
                  activeId === t.id ? "bg-neutral-800" : ""
                }`}
              >
                <div className="h-10 w-10 bg-neutral-800 rounded overflow-hidden flex items-center justify-center">
                  {t.thumbnail_url ? (
                    <img src={t.thumbnail_url} alt={t.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs text-neutral-500">No img</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-neutral-500">Click to load</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
