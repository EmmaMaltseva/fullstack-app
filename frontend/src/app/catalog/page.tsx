'use client'

import { useEffect, useState } from "react";
import ProductCard from "@components/ProductCard";

type Product = { //TODO: Вынеси типы в отельный файл
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Каталог товаров</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
        }
      </div>
    </div>
  )
}