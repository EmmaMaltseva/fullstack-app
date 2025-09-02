"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`http://localhost:4000/api/${type}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        type === "register" ? { name, email, password } : { email, password },
      ),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Ошибка");
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === "register" && (
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Имя</label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">E-mail</label>
          <div className="mt-2">
            <input
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
        <label className="block text-sm/6 font-medium text-gray-900">Пароль</label>
        <div className="mt-2">
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        </div>
        {error && <p>{error}</p>}
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {type === "login" ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
