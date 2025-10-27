"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WorkspaceHome() {
  return (
    <div className="space-y-10">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold">Welcome to Freelancer Tracker</h1>
        <p className="text-gray-500 mt-3">
          Simplify your freelance journey with automated invoicing, agent management, and smart client insights.
        </p>
      </section>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-start justify-between h-full">
            <div>
              <h3 className="font-semibold mb-2">Manage Invoices</h3>
              <p className="text-gray-500 text-sm">Track, send, and monitor your invoices.</p>
            </div>
            <Button className="mt-4 w-full">Go to Invoices</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-start justify-between h-full">
            <div>
              <h3 className="font-semibold mb-2">Set Agents</h3>
              <p className="text-gray-500 text-sm">Assign tasks or automate outreach to your agents.</p>
            </div>
            <Button className="mt-4 w-full">Manage Agents</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-start justify-between h-full">
            <div>
              <h3 className="font-semibold mb-2">Find New Jobs</h3>
              <p className="text-gray-500 text-sm">Search for opportunities and send smart proposals.</p>
            </div>
            <Button className="mt-4 w-full">Search Jobs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
