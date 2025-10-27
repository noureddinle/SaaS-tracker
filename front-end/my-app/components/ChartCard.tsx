"use client";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 4100 },
  { month: "Mar", revenue: 3700 },
  { month: "Apr", revenue: 4800 },
  { month: "May", revenue: 5200 },
];

export default function ChartCard() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h4 className="text-lg font-semibold mb-4">Revenue Trend (Last 6 Months)</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
