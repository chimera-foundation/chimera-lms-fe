import Sidebar from "../components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[16rem_1fr] min-h-screen gap-12">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
