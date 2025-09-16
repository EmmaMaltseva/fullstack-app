import { getUserFromToken } from "lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

  const userId = await getUserFromToken();

  if (!userId) {
    redirect('/login')
  }

  const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
    credentials: 'include',
    cache: 'no-store',
  })

  if (!res.ok) {
    redirect('/login')
  }

  const user = await res.json();

  return(
    <div>
      <h1>Профиль</h1>
      <div>
        <div>
          <label>Имя:</label>
          <p>{user.name}</p>
        </div>
        <div>
          <label>Email:</label>
          <p>{user.email}</p>
        </div>
      </div>
      <form action="/api/logout" method="POST">
        <button className="mt-4 rounded bg-red-500 px-4 py-2 text-white">
          Выйти
        </button>
      </form>
    </div>
  )
  
}