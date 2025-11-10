import type { Editor } from "grapesjs";

const headerHTML = `
<div class="row" style="align-items:center; gap:16px;">
  <div style="width:120px;height:90px;border:1px dashed #bbb;border-radius:8px;display:flex;align-items:center;justify-content:center;">
    <span class="muted" style="font-size:12px;">Logo</span>
  </div>
  <div class="col">
    <h1 class="brand" style="font-size:28px;">Invoice <span class="muted" style="font-weight:400">#INV-0001</span></h1>
    <div class="muted" style="font-size:13px;">Your Company · Address · City</div>
  </div>
  <div class="col" style="text-align:right;font-size:13px;">
    <div>Date: <b>2025-11-09</b></div>
    <div>Due: <b>2025-11-23</b></div>
  </div>
</div>`;

const billToHTML = `
<div class="box" style="margin-top:14px">
  <div style="font-weight:700">Bill To</div>
  <div>Client Name</div>
  <div class="muted">client@email.com</div>
</div>`;

const tableHTML = `
<table class="table" style="margin-top:16px">
  <thead>
    <tr>
      <th style="text-align:left;width:50%">Description</th>
      <th style="text-align:right;width:10%">Qty</th>
      <th style="text-align:right;width:20%">Rate</th>
      <th style="text-align:right;width:20%">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Design Work</td>
      <td style="text-align:right">10</td>
      <td style="text-align:right">250 MAD</td>
      <td style="text-align:right"><b>2,500 MAD</b></td>
    </tr>
  </tbody>
</table>`;

const totalsHTML = `
<div style="display:grid;grid-template-columns:1fr 280px;gap:16px; margin-top:18px">
  <div></div>
  <div class="box" style="padding:8px 12px">
    <div style="display:flex;justify-content:space-between"><span class="muted">Subtotal</span><span>2,500 MAD</span></div>
    <div style="display:flex;justify-content:space-between"><span class="muted">Tax</span><span>0 MAD</span></div>
    <div style="height:1px;background:#ddd;margin:6px 0"></div>
    <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800">
      <span>Total</span><span>2,500 MAD</span>
    </div>
  </div>
</div>`;

const footerHTML = `
<div class="muted" style="font-size:12px;margin-top:32px">
  Thanks for your business! Please make payment within 15 days.
</div>`;

const stampHTML = `
<div style="display:inline-flex;align-items:center;gap:8px;border:2px solid var(--brand);color:var(--brand);
padding:8px 12px;border-radius:999px;font-weight:700;letter-spacing:.5px;">PAID</div>`;

const noteHTML = `
<div class="box" style="margin-top:12px;font-size:13px">
  <div style="font-weight:600;margin-bottom:6px">Notes</div>
  <div>— Late fee applies after due date.<br/>— Contact support@yourco.com for questions.</div>
</div>`;

export const SEED_HTML = `
<main style="max-width:900px;margin:0 auto;background:#fff;border-radius:24px;padding:48px;box-shadow:0 30px 60px -40px rgba(15,23,42,0.45);border:1px solid #e7eaf3;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto;">
  <section style="display:flex;justify-content:space-between;align-items:flex-start;gap:24px;">
    <div style="display:flex;align-items:center;gap:18px;">
      <div data-gjs-type="image" style="width:88px;height:88px;border:1px dashed #cdd3e0;border-radius:20px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:12px;">Logo</div>
      <div>
        <h1 style="font-size:32px;margin:0;color:#1f2937;">Invoice <span style="color:#6b7280;font-weight:500;">#INV-0001</span></h1>
        <p style="margin:6px 0 0;color:#6b7280;">Your Company · Address · City</p>
      </div>
    </div>
    <div style="text-align:right;color:#64748b;font-size:14px;">
      <div><strong>Date:</strong> 09 Nov 2025</div>
      <div><strong>Due:</strong> 23 Nov 2025</div>
    </div>
  </section>

  <section style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:32px;">
    <div class="box" style="border:1px solid #e7eaf3;border-radius:18px;padding:20px;">
      <h2 style="margin:0 0 8px;color:#1f2937;font-size:18px;">Bill To</h2>
      <p style="margin:0;color:#111827;font-weight:500;">Client Name</p>
      <p style="margin:4px 0 0;color:#6b7280;">client@email.com</p>
    </div>
    <div class="box" style="border:1px solid #e7eaf3;border-radius:18px;padding:20px;">
      <h2 style="margin:0 0 8px;color:#1f2937;font-size:18px;">Project</h2>
      <p style="margin:0;color:#111827;font-weight:500;">Website redesign</p>
      <p style="margin:4px 0 0;color:#6b7280;">Milestone #2 (UI polish & hand-off)</p>
    </div>
  </section>

  <table style="width:100%;border-collapse:collapse;margin-top:36px;font-size:14px;">
    <thead>
      <tr style="color:#475569;text-transform:uppercase;letter-spacing:0.08em;font-size:12px;">
        <th style="text-align:left;padding:12px 0;border-bottom:1px solid #e7eaf3;">Description</th>
        <th style="text-align:center;padding:12px 0;border-bottom:1px solid #e7eaf3;width:12%;">Qty</th>
        <th style="text-align:right;padding:12px 0;border-bottom:1px solid #e7eaf3;width:18%;">Rate</th>
        <th style="text-align:right;padding:12px 0;border-bottom:1px solid #e7eaf3;width:18%;">Amount</th>
      </tr>
    </thead>
    <tbody style="color:#1f2937;">
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f1f3f9;">Design sprint & responsive layouts</td>
        <td style="padding:14px 0;text-align:center;border-bottom:1px solid #f1f3f9;">10</td>
        <td style="padding:14px 0;text-align:right;border-bottom:1px solid #f1f3f9;">250 MAD</td>
        <td style="padding:14px 0;text-align:right;border-bottom:1px solid #f1f3f9;font-weight:600;">2,500 MAD</td>
      </tr>
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f1f3f9;">Design system documentation</td>
        <td style="padding:14px 0;text-align:center;border-bottom:1px solid #f1f3f9;">1</td>
        <td style="padding:14px 0;text-align:right;border-bottom:1px solid #f1f3f9;">800 MAD</td>
        <td style="padding:14px 0;text-align:right;border-bottom:1px solid #f1f3f9;font-weight:600;">800 MAD</td>
      </tr>
    </tbody>
  </table>

  <section style="display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:18px;margin-top:32px;align-items:start;">
    <div class="box" style="border:1px dashed rgba(99,102,241,0.4);border-radius:18px;padding:18px;color:#6366f1;background:rgba(99,102,241,0.08);">
      <strong style="display:block;margin-bottom:4px;">Payment instructions</strong>
      <span style="color:#4c51bf;">Transfer to Bank 1234 · IBAN MA64 4040 0000 2101 0001 2345</span>
    </div>
    <div class="box" style="border:1px solid #e7eaf3;border-radius:18px;padding:20px;background:#f8fafc;">
      <div style="display:flex;justify-content:space-between;color:#475569;margin-bottom:6px;">
        <span>Subtotal</span><span>3,300 MAD</span>
      </div>
      <div style="display:flex;justify-content:space-between;color:#475569;margin-bottom:6px;">
        <span>Tax (10%)</span><span>330 MAD</span>
      </div>
      <div style="height:1px;background:#e2e8f0;margin:10px 0"></div>
      <div style="display:flex;justify-content:space-between;font-size:20px;font-weight:700;color:#111827;">
        <span>Total due</span><span>3,630 MAD</span>
      </div>
    </div>
  </section>

  <section style="margin-top:36px;color:#64748b;font-size:13px;display:flex;justify-content:space-between;align-items:center;">
    <div>
      <strong style="display:block;color:#1f2937;margin-bottom:4px;">Notes</strong>
      <span>Thank you for partnering with us. Payment is due within 15 days.</span>
    </div>
    <div style="text-align:right;">
      <div style="display:inline-flex;align-items:center;gap:10px;border:2px solid #6366f1;color:#6366f1;padding:10px 18px;border-radius:999px;font-weight:700;letter-spacing:0.08em;">PAID</div>
    </div>
  </section>
</main>
`;

export default function registerBlocks(editor: Editor) {
  const bm = editor.BlockManager;

  bm.add("inv-header", {
    label: "Header",
    category: "Invoice",
    content: `<section>${headerHTML}</section>`,
  });

  bm.add("inv-billto", {
    label: "Bill To",
    category: "Invoice",
    content: `<section>${billToHTML}</section>`,
  });

  bm.add("inv-table", {
    label: "Line Items",
    category: "Invoice",
    content: `<section>${tableHTML}</section>`,
  });

  bm.add("inv-totals", {
    label: "Totals",
    category: "Invoice",
    content: `<section>${totalsHTML}</section>`,
  });

  bm.add("inv-footer", {
    label: "Footer",
    category: "Invoice",
    content: `<section>${footerHTML}</section>`,
  });

  bm.add("inv-stamp", {
    label: "Stamp",
    category: "Invoice",
    content: `<div style="display:flex;justify-content:flex-end">${stampHTML}</div>`,
  });

  bm.add("inv-qr", {
    label: "QR Code",
    category: "Extras",
    content: `
      <img alt="QR Code" width="120" height="120"
        src="data:image/svg+xml;utf8,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
            <rect width='120' height='120' fill='white'/>
            <rect x='10' y='10' width='20' height='20' fill='black'/>
            <rect x='90' y='10' width='20' height='20' fill='black'/>
            <rect x='10' y='90' width='20' height='20' fill='black'/>
            <rect x='90' y='90' width='20' height='20' fill='black'/>
          </svg>`
        )}" />`,
  });

  bm.add("inv-note", {
    label: "Note",
    category: "Extras",
    content: `<section>${noteHTML}</section>`,
  });

  editor.on("component:selected", (cmp) => {
    const traits = cmp.get("traits");
    if (!traits) return;
    const hasTrait =
      typeof traits.where === "function" &&
      traits.where((t: any) => t.get("name") === "brandColor")?.length;
    if (hasTrait) return;

    cmp.addTrait({
      name: "brandColor",
      label: "Brand color",
      type: "color",
      changeProp: 1,
    });

    cmp.on("change:brandColor", (_: unknown, val: string) => {
      const doc = editor.Canvas.getDocument();
      doc?.documentElement?.style.setProperty("--brand", val || "#4F46E5");
    });
  });

  if ((editor as any).ContextMenu) {
    editor.on("component:contextmenu", () => {
      const [cmp] = editor.getSelectedAll();
      if (!cmp) return;
      editor.ContextMenu.add?.([
        { id: "dup", label: "Duplicate", run: () => editor.runCommand("core:component-duplicate") },
        { id: "del", label: "Delete", run: () => editor.runCommand("core:component-delete") },
      ]);
    });
  }
}

