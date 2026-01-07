import Sidebar from "../components/sidebar";
import TokenMonitor from "../components/token-monitor";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[16rem_1fr] min-h-screen gap- bg-slate-50">
      <Sidebar />
      <TokenMonitor />
      <main>{children}</main>
    </div>
  );
}
