import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Title mapping could be handled more dynamically based on route, 
  // but for a clean minimal setup, we'll let pages render their own headers if needed,
  // or use a generic one here.
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-pk-bg)]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* We can leave the header out of the layout and let pages use it to set their own title,
            or include it here with a generic title. Let's include it and default to "Dashboard". */}
        <DashboardHeader title="Dashboard" />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
