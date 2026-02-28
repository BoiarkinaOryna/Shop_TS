import { Client } from "../prisma/client";
import { ProductCreate, ShopRepositoryContract } from "./shop.types";


const ShopRepository: ShopRepositoryContract = {
    async getAll(take?) {
        return await Client.product.findMany({
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
        return await Client.product.findUnique({
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
        })
    },
}



export default ShopRepository;
