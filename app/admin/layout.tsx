import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/server";
import { isAdminEmail } from "@/lib/config";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import AdminNav from "@/components/layout/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const hasAdminClaim = decoded.admin === true;
    const isAllowedEmail = isAdminEmail(decoded.email);

    if (!hasAdminClaim && !isAllowedEmail) {
      redirect("/dashboard");
    }
  } catch (error) {
    console.error("Admin layout authentication error:", error);
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-pk-bg)]">
      <AdminNav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader title="Admin Dashboard" />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
