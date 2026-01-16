import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class HomeRepository {
  async getPopularProducts(limit: number, offset: number) {
    return prisma.product.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ordersCount: 'desc' // Предполагаемое поле для популярности
      }
    });
  }

  async getNewestProducts(limit: number, offset: number) {
    return prisma.product.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}