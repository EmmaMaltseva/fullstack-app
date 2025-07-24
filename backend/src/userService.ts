import prisma from './prismaClient';

export async function getUsers() {
  return await prisma.user.findMany();
}