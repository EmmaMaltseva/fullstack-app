import { Response, Request } from "express";
import prisma from "../prismaClient";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, imageUrl } = req.body;
  const product = await prisma.product.create({
    data: {name, description, price, imageUrl },
  });
  res.status(201).json(product);
};

