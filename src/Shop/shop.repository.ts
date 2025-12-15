import { PrismaClient } from "../generated/prisma";
import {
    ShopRepositoryContract,
    ProductCreate,
    ProductUpdate
} from "./shop.types";


const prisma = new PrismaClient();


const ShopRepository: ShopRepositoryContract = {
    async getAll(take?: string) {
        return prisma.product.findMany({
            take: take? +take : 16,
            include: {
                image: true,
                infoBlocks: {
                    include: {
                        media: true,
                        techInfoList: true
                    }
                }
            }
        });
    },



    async getById(id: number) {
        return prisma.product.findUnique({
            where: { id },
            include: {
                image: true,
                infoBlocks: {
                    include: {
                        media: true,
                        techInfoList: true
                    }
                }
            }
        });
    },


    async create(data: ProductCreate) {
        return prisma.product.create({
            data,
            include: {
                image: true,
                infoBlocks: {
                    include: {
                        media: true,
                        techInfoList: true
                    }
                }
            }
        });
    },



    async update(id: number, data: ProductUpdate) {
        return prisma.product
            .update({
                where: { id },
                data,
                include: {
                    image: true,
                    infoBlocks: {
                        include: {
                            media: true,
                            techInfoList: true
                        }
                    }
                }
            })
            .catch(() => null);
    },

    async delete(id: number) {
        await prisma.product.delete({
            where: { id }
        });
        return null;
    }
};



export default ShopRepository;
