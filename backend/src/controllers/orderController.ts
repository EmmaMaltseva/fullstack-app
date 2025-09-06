import { Response, Request } from "express";
import prisma from "../prismaClient";

export const getUserOrders = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
  });
  res.json(orders);
}

export const createOrder = async (req: Request, res: Response) => {
  const { userId, items } = req.body; // items: [{ productId, quantity }]
  
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
