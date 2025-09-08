"use client";

import { useEffect, useState } from "react";

type Product = { //TODO: Вынеси типы в отельный файл
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        credentials: "include",
      });
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("Ошибка загрузки товаров")
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        credentials: "include",
         headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            imageUrl: form.imageUrl || undefined,
          }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Ошибка создания");
        return;
      }

      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
      setForm({ name: "", price: "", description: "", imageUrl: "", });
      setSuccess("Товар добавлен")
    } catch {
      setError("Ошибка запроса");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Админ: Товары</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="Название"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <textarea  
            placeholder="Описание"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <input 
            type="number" 
            placeholder="Цена"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Image URL (необязательно)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >Добавить товар</button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>

      <hr className="mb-4" />

      <h2 className="text-xl font-semibold mb-4">Список товаров</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <p><strong>{product.name}</strong> - {product.price} ₽</p>
            <p>{product.description}</p>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="h-24 mt-2 object-contain" />
            )}
          </li>
        ))}
      </ul>

    </div>
  )



}