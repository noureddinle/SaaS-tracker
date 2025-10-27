import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
        <Navbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
