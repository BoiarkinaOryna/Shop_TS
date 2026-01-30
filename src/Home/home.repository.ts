import { Client } from "../prisma/client";
import { HomeRepositoryContract } from "./home.types";

const HomeRepository: HomeRepositoryContract = {
  async getPopularProducts {
    return Client.product.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: 'desc'
      }
    })
  },
  async getNewestProducts {
    return Client.product.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: 'desc'
      }
    })
  }
}

export default HomeRepository