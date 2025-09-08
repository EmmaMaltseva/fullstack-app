import { Request, Response } from "express";
import prisma from "../prismaClient";

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { id: true, email: true, name: true } },
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!["pending", "completed", "canceled"].includes(status)) {
    return res.status(400).json({ error: "Недопустимый статус"});
  }

  const updateOrder = await prisma.order.update({
    where: { id: Number(orderId) },
    data: { status }
  });

  res.json(updateOrder);
}