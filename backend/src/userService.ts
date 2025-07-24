import prisma from './prismaClient';

export async function getUsers() {
  return await prisma.user.findMany();
}

// Ниже код для добавления пользователей в базу. Вызван 1 раз для предотвращения дублирования
// async function createUsers() {
//   await prisma.user.createMany({
//     data: [
//       { name: 'Alice', email: 'alice@example.com' },
//       { name: 'Bob', email: 'bob@example.com' },
//       { name: 'Charlie', email: 'charlie@example.com' },
//     ],
//   });
//   console.log('Пользователи добавлены в базу')
// }

// createUsers()
//   .catch(e => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   })