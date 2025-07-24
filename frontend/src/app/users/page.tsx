'use client'; // добавь только если используешь App Router

import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка получения пользователей:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Список пользователей</h1>
      {loading ? (
        <p>Загрузка пользователей...</p>
      ) : users.length === 0 ? (
        <p>Пользователи не найдены</p>
      ) : (
        <ul className='space-y-2'>
          {users.map((user) => (
            <li
              key={user.id}
              className='border border-gray-300 p-4 rounded shadow'
            >
              <p><strong>Имя: </strong>{user.name}</p>
              <p><strong>Email: </strong>{user.email}</p>
            </li>
          ))}
        </ul>
      )


      }
    </main>
  )

}