"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AgentsPage() {
  const agents = [
    { name: "Amine", tasks: 12, emailsSent: 34 },
    { name: "Sara", tasks: 8, emailsSent: 17 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Agents</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {agents.map((a, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <h3 className="font-semibold">{a.name}</h3>
              <p className="text-sm text-gray-500">Tasks: {a.tasks} | Emails sent: {a.emailsSent}</p>
              <Button className="mt-4 w-full">Send Email</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
