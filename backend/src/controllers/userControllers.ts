import { Response, Request } from "express";
import prisma from "../prismaClient"

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users)
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(400).json({ message: 'Пользователь не найден' });
  res.json(user);
}