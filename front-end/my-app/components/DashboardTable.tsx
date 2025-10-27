import { Card, CardContent } from "@/components/ui/card";

const DashboardTable = () => {
  const data = [
    { name: "default", recentRun: "10/21/2025, 10:29:20 PM", feedback: 1, errorRate: "0%", latency: "7.31s" },
  ];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-4">Tracing Projects</h4>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-zinc-500 border-b">
              <th>Name</th>
              <th>Most Recent Run</th>
              <th>Feedback</th>
              <th>Error Rate</th>
              <th>Latency</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-2">{item.name}</td>
                <td>{item.recentRun}</td>
                <td>{item.feedback}</td>
                <td>{item.errorRate}</td>
                <td>{item.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default DashboardTable;
