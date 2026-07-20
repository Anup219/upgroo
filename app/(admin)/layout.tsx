import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { AdminSidebar as SidebarComponent } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-pk-bg)]">
      <SidebarComponent />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader title="Admin Dashboard" />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
