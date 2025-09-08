'use client';

import { useCart } from "lib/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (res.ok) {
        clearCart();
        router.push("/orders");
      } else {
        const data = await res.json();
        setError(data.error || "Ошибка при оформлении заказа") 
      }
    } catch (err) {
      setError("Ошибка подключения к серверу");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>
      {items.length === 0 ? (
        <p>Корзина пуста.</p>
      ): (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>Количество: {item.quantity}</p>
                  <p>Цена: {item.price} ₽</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-lg font-bold">Итого {total} ₽</p>
            <button
              onClick={clearCart}
              className="mt-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Очистить корзину
            </button>
            <button
              onClick={handleOrder}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Оформление..." : "Оформить заказ"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </>
      )}
    </div>
  );
}