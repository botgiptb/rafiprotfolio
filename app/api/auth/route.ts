import { NextResponse } from "next/server";

const PASSWORD = process.env.ADMIN_PASSWORD ?? "rafi2026";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password !== PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
    sameSite: "strict",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  return res;
}
