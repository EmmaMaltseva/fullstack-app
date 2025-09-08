import { create } from 'zustand';

type CartItem = { //TODO Общие типы
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity: 1 }]
        };
      }

    }),
   removeFromCart: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
   })),
   clearCart: () => set({ items: [] }),
}));