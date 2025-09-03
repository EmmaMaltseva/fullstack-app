"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoaderOverlay from "@components/LoaderOverlay";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
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
        setLoading(false);
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Ошибка");
        setLoading(false);
      }
    } catch (error) {
      setError("Ошибка подключения");
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {loading && <LoaderOverlay />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            E-mail
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Пароль
          </label>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        {type === "register" && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Имя
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        )}
        {error && (
          <p className="block rounded-md bg-red-100 px-3 py-1.5 text-sm/6 text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
        >
          {type === "login" ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
