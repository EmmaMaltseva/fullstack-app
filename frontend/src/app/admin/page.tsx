"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  status: string;
  total: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  items: {
    id: number;
    quantity: number;
    price: number;
    product: { name: string };
  }[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/admin/orders", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Ошибка загрузки заказов");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError("Ошибка загрузки заказов");
      }
    }
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/admin/orders/${orderId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (!res.ok) throw new Error();

      const updated = await res.json();
      setOrders((prev) => 
        prev.map((o) => (o.id === orderId ? {...o, status: updated.status} : o))
      );
    } catch {
      alert("Ошибка обновления статуса")
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Админ: заказы</h1>

      {error && <p className="text-red-500">{error}</p>}

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded">
          <div className="flex justify-between items-center">
            <p>
              <strong>Заказ №{order.id}</strong> от {new Date(order.createdAt).toLocaleString()}  
            </p>
            <p>Покупатель: {order.user.name} ({order.user.email})</p>
            <p>Сумма: {order.total} ₽</p>
          </div>

          <select 
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value)}
            className="border p-1 rounded"
          >
            <option value="pending">В ожидании</option>
            <option value="completed">Завершён</option>
            <option value="canceled">Отменен</option>
          </select>

          <ul className="mt-2 pl-4 list-disc">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.product.name} x {item.quantity} - {item.price} ₽ 
              </li>
            ))
            }
          </ul>
        </div>
      ))}
    </div>
  )
}