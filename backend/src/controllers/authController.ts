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
    if (existingUser) return res.status(400).json({ message: 'Пользователь уже существует'});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: 'Регистрация успешна', user: { id: user.id, email: user.email }})

  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера'});
  }

};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email }});
    
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, //1 час
      })
      .json({ message: 'Авторизация успешна' })

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка сервера'});
    }
}
