import { Response, Request } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../middleware/authMiddleware"

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "Пользователь не авторизован" });
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: {
    createdAt: 'desc', // сортировка по убыванию
  },
  });

  res.json(orders);
}

export const createOrder = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const { items } = req.body; // items: [{ productId, quantity }]

  if (!userId) {
    return res.status(401).json({ error: "Пользователь не авторизован" });
  }
  
  const products = await prisma.product.findMany({
    where: { id: { in: items.map((item: any) => item.productId) } },
  })

  const orderItems = items.map((item: any) => {
    const product = products.find(p => p.id === item.productId);
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product?.price || 0,
    };
  });

  const total = orderItems.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0)

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: orderItems,
      },
    },
    include: { items: true },
  });

  res.status(201).json(order);
}
