"use client";

import { useEffect, useState } from "react";

export default function ApiTestPage() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="mb-4 text-2xl font-bold">API Test</h1>
      <p className="text-lg text-green-600">{data}</p>
    </div>
  );
}
