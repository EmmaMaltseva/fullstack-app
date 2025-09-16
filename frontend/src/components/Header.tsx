import { isAuthenticated } from "lib/auth";
import Link from "next/link";

export default async function Header() {
  const auth = await isAuthenticated();
  
  return(
    <div className="flex justify-between p-4">
      <div className="text-xl font-bold">
        <Link href="/products">🛒 Shop</Link>
      </div>
      <nav className="flex gap-4">
        <Link href="/products">Каталог</Link>
        <Link href="/cart">Корзина</Link>
        {auth ? <Link href="/profile">Профиль</Link> : <a href="/login">👩 Войти</a>}
        {auth && <Link href="/orders">Мои заказы</Link>}
      </nav>
    </div>
  )
}