import { PrismaClient } from "../generated/prisma"
import {
  ShopServiceContract,
  ProductCreate,
  ProductUpdate,
} from "./shop.types"

const prisma = new PrismaClient()

const ShopService: ShopServiceContract = {
  async getAll(take: string) {
    return prisma.product.findMany({
      take: take,
    })
  },

  async getById(id: number) {
    return prisma.product.findUnique({
      where: { id },
    })
  },

  async create(data: ProductCreate) {
    return prisma.product.create({
      data,
    })
  },

  async update(id: number, data: ProductUpdate) {
    return prisma.product.update({
      where: { id },
      data,
    }).catch(() => null) 
  },

  async delete(id: number) {
    await prisma.product.delete({
      where: { id },
    }).catch(() => null)

    return null
  },
}

export default ShopService
