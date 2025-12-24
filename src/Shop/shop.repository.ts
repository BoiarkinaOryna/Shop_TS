import { PrismaClient } from "../generated/prisma";
import {
    ShopRepositoryContract,
    ProductCreate,
    ProductUpdate
} from "./shop.types";


const prisma = new PrismaClient();


const ShopRepository: ShopRepositoryContract = {
    async getAll(take?) {
        return await prisma.product.findMany({
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



    async getById(id) {
        return await prisma.product.findUnique({
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


    async create(data) {
        return await prisma.product.create({data});
    },



    async update(id, data) {
        return await  prisma.product
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

    async delete(id) {
        await prisma.product.delete({
            where: { id }
        });
        return null;
    }
};



export default ShopRepository;
