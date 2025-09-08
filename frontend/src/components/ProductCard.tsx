type Props = { 
  product: { //TODO: Вынеси типы в отельный файл
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  };
  onAdd: () => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="border rounded-lg shadow p-4 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="h-40 object-contain rounded mb-4"/>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="font-bold mt-2">{product.price} ₽</p>
      <button
        onClick={onAdd}
        className="bg-blue-500 hover:bg-blue-600  text-white py-2 px-4 rounded mt-4"
      >
        В корзину
      </button>
    </div>
  )
}
