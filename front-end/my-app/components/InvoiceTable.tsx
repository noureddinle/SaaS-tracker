import { Card, CardContent } from "@/components/ui/card";

export default function InvoiceTable() {
  const invoices = [
    { id: 1, client: "Acme Corp", amount: 1200, status: "Paid", date: "2025-10-01" },
    { id: 2, client: "Brandom SARL", amount: 950, status: "Pending", date: "2025-10-12" },
    { id: 3, client: "Taqa Energy", amount: 640, status: "Overdue", date: "2025-09-29" },
  ];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-4">Recent Invoices</h4>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-zinc-500 border-b">
              <th>Client</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b last:border-none">
                <td className="py-2">{inv.client}</td>
                <td>${inv.amount}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inv.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : inv.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td>{inv.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
