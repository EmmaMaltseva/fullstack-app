import { isAuthenticated } from "lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const auth = isAuthenticated();

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
        <form action='/logout' method="post">
          <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
            Выйти
          </button>
        </form>
      </div>
  )
}