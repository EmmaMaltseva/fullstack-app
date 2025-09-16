import { isAuthenticated } from "lib/auth";
import Link from "next/link";

export default async function AdminHeader() {
  const auth = await isAuthenticated();
  
  return(
    <div className="flex justify-between p-4">
      <div className="text-xl font-bold">
        <Link href="/admin/products">🛒 Shop</Link>
      </div>
      <nav className="flex gap-4">
        <Link href="/admin/orders">Заказы</Link>
        <Link href="/admin/products">Товары</Link>
        <Link href="/profile">Профиль</Link>
      </nav>
    </div>
  )
}