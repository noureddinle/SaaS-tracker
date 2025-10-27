import { Card, CardContent } from "@/components/ui/card";

export default function AgentTable() {
  const agents = [
    { name: "Sarah Malik", region: "Casablanca", clients: 24, revenue: 8200 },
    { name: "Youssef Amine", region: "Rabat", clients: 18, revenue: 5200 },
  ];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-4">Active Agents</h4>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-zinc-500 border-b">
              <th>Name</th>
              <th>Region</th>
              <th>Clients</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-2">{agent.name}</td>
                <td>{agent.region}</td>
                <td>{agent.clients}</td>
                <td>${agent.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
