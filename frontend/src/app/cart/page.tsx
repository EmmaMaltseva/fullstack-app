'use client';

import { useCart } from "lib/cartStore";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
          </div>
        </>
      )}
    </div>
  );
}