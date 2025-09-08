'use client'

import { isAuthenticated } from "lib/auth";
import { useEffect, useState } from "react";

interface OrderItem { //TODO Type
  id: number
  productId: number
  quantity: number 
  price: number 
}

interface Order {
  id: number
  total: number
  status: string
  createdAt: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/orders', {
          credentials: 'include', //для отправки cookie
        })

        if (!res.ok) throw new Error('Ошибка получения заказов')

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Ошибка: ', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) return <p>Загрузка заказов...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Мои заказы</h1>

      {orders.length === 0 ? (
        <p>У вас пока нет заказов.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border p-4 rounded shadow">
              <div className="mb-2">
                <strong>Номер заказа:</strong> {order.id}
              </div>
              <div className="mb-2">
                <strong>Сумма:</strong> {order.total} ₽
              </div>
              <div className="mb-2">
                <strong>Статус:</strong> {order.status}
              </div>
              <div className="mb-2">
                <strong>Дата:</strong>{' '} 
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div>
                <strong>Товары:</strong>
                <ul className="list-disc list-inside ml-2">
                  {order.items.map(item => (
                    <li key={item.id}>
                      Товар #{item.productId} - {item.quantity} шт. x {item.price} ₽
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}