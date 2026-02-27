
import { type NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin-sdk";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return NextResponse.json({ error: "No session cookie" }, { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(session, true);
    const user = await adminAuth.getUser(decodedToken.uid);
    const userRole = user.customClaims?.role || 'readonly'; // Default to 'readonly' if no role is set

    return NextResponse.json({ role: userRole });
  } catch (error) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
