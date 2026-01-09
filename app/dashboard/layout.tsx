import Sidebar from "../components/sidebar";
import TokenMonitor from "../components/token-monitor";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-screen bg-slate-50">
      <Sidebar />
      <TokenMonitor />
      <main className="overflow-auto">{children}</main>
    </div>
  );
}
