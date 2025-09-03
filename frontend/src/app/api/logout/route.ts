import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_SITE_URL),
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // удалить куку
  });

  return response;
}
