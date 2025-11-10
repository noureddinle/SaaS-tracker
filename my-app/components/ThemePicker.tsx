"use client";

import { useRef, useState, useEffect } from "react";

type Theme = {
  primary_color: string;
  logo_url?: string;
};

type ThemeProps = {
  theme: Theme | null;
  onChange: (next: { primary_color?: string; logo_file?: File | null }) => Promise<void>;
};

export default function ThemePicker({ theme, onChange }: ThemeProps) {
  const [color, setColor] = useState("#4F46E5");
  const [logoPreview, setLogoPreview] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (theme?.primary_color) setColor(theme.primary_color);
    setLogoPreview(theme?.logo_url);
  }, [theme?.primary_color, theme?.logo_url]);

  const handleColor = async (value: string) => {
    setColor(value);
    await onChange({ primary_color: value });
  };

  const handleLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f) {
      const url = URL.createObjectURL(f);
      setLogoPreview(url);
      await onChange({ logo_file: f });
    }
  };

  return (
    <aside className="w-80 border-l border-neutral-800 bg-neutral-900 p-4">
      <h2 className="text-sm font-semibold text-neutral-300 mb-4">Theme</h2>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-neutral-400">Primary color</label>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColor(e.target.value)}
              className="h-9 w-14 rounded border border-neutral-700 bg-neutral-800 p-1"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              onBlur={(e) => handleColor(e.target.value)}
              className="flex-1 h-9 rounded border border-neutral-700 bg-neutral-800 px-2 text-sm"
              placeholder="#4F46E5"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-neutral-400">Logo</label>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-12 w-12 rounded bg-neutral-800 flex items-center justify-center overflow-hidden">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[10px] text-neutral-500">No logo</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
              <button className="px-3 py-1 text-sm rounded bg-neutral-800 hover:bg-neutral-700" onClick={() => fileRef.current?.click()}>
                Upload
              </button>
              {logoPreview && (
                <button
                  className="px-3 py-1 text-sm rounded hover:bg-neutral-800"
                  onClick={async () => {
                    setLogoPreview(undefined);
                    await onChange({ logo_file: null });
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}