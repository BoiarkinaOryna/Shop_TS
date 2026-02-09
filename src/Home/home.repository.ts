import { HomeRepositoryContract } from './home.types';
import { Client } from "../prisma/client";

const HomeRepository: HomeRepositoryContract = {
  async getPopularProducts(limit, offset) {

    return Client.product.findMany({
      take: limit,
      skip: offset,
      orderBy: { productOnOrders: { _count: 'desc' } }, 
      select: {
        id: true,
        title: true,
        price: true,
        shortDescription: true,
        imageId: true,
        discount: true,
        categoryId: true,
      },
    });
  },

  async getNewestProducts(limit, offset) {
    return Client.product.findMany({
      take: limit,
      skip: offset,
      orderBy: { id: 'desc' }, 
      select: {
        id: true,
        title: true,
        price: true,
        shortDescription: true,
        imageId: true,
        discount: true,
        categoryId: true,
      },
    });
  },
};

export default HomeRepository;
