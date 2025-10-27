import { Home, FileText, Users, BarChart2, Settings } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const links = [
    { name: "Overview", icon: Home, href: "/dashboard" },
    { name: "Invoices", icon: FileText, href: "/dashboard/invoices" },
    { name: "Agents", icon: Users, href: "/dashboard/agents" },
    { name: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r h-screen p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-8 text-zinc-800 dark:text-zinc-100">
        SaaS Tracker
      </h1>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <link.icon className="h-5 w-5 text-zinc-500" />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t pt-4">
        <p className="text-xs text-zinc-500">Logged in as</p>
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          interlud12xe@gmail.com
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
