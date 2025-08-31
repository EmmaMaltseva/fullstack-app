import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email и пароль обязательны'});

  try {
    const existingUser = await prisma.user.findUnique({ where: { email }});
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера'})
  }

};
