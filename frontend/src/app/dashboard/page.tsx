import { isAuthenticated } from "lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const auth = await isAuthenticated();

  if (!auth) {
    return (
      <div className="p-8">
        <h1 className="text-xl">Доступ запрещён</h1>
        <Link href="/login" className="text-blue-600 underline">
          Войти
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl">Приватный Dashboard</h1>
      <Link href="/orders" className="text-blue-600 underline">
        Мои заказы
      </Link>
      <Link href="/catalog" className="text-green-600 underline">
        Каталог
      </Link>
      <Link href="/cart" className="text-pink-600 underline">
        Корзина
      </Link>
      <form action="/api/logout" method="POST">
        <button className="mt-4 rounded bg-red-500 px-4 py-2 text-white">
          Выйти
        </button>
      </form>
    </div>
  );
}
