import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import InvoiceTable from "@/components/InvoiceTable";
import AgentTable from "@/components/AgentTable";

export default function DashboardPage() {
  return (
    <Layout>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Revenue" value="$8,200" trend="+12% this month" />
        <MetricCard title="Invoices Sent" value="34" trend="+5 new" />
        <MetricCard title="Active Agents" value="7" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard />
        <InvoiceTable />
      </section>

      <AgentTable />
    </Layout>
  );
}
