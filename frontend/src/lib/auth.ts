import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  return !!token;
}

export async function getUserFromToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    return decoded.userId
  } catch (err) {
    return null
  }
}