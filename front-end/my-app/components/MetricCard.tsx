import { Card, CardContent } from "@/components/ui/card";

export default function MetricCard({
  title,
  value,
  trend,
}: {
  title: string;
  value: string | number;
  trend?: string;
}) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-5">
        <p className="text-sm text-zinc-500">{title}</p>
        <h3 className="text-3xl font-semibold mt-1">{value}</h3>
        {trend && <p className="text-xs text-green-500 mt-2">{trend}</p>}
      </CardContent>
    </Card>
  );
}
