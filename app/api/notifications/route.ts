import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/server";
import { notificationService } from "@/services/notificationService";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const notifications = await notificationService.getUserNotifications(decoded.uid);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Notifications GET API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const body = await request.json().catch(() => ({}));

    if (body.all) {
      await notificationService.markAllAsRead(decoded.uid);
    } else if (body.id) {
      await notificationService.markAsRead(body.id);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Notifications PATCH API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      await notificationService.deleteNotification(id);
    } else {
      const notifications = await notificationService.getUserNotifications(decoded.uid);
      for (const n of notifications) {
        await notificationService.deleteNotification(n.id);
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Notifications DELETE API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
