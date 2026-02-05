import {Request, Response} from 'express'
import type { Prisma } from '../generated/prisma'


export type Product = Prisma.ProductGetPayload<{}>

export type ProductCreate = Prisma.ProductCreateInput 

export type ProductUpdate = Prisma.ProductUpdateInput

export type ProductPreview = Omit<Product, "quantity" | "shortDescription">

export type infoBlock = Prisma.InfoBlockGetPayload<{}>
// export type Category = Prisma.CategoryGetPayload<{}>
export type Media = Prisma.MediaGetPayload<{}>

// Наступні типи тут тимчасово, поки нема папки замовлення


export interface ShopServiceContract {
    getAll: (take?: string) => Promise<ProductPreview[]>
    getById: (id: number) => Promise<Product| null> 
}

export interface ShopControllerContract {
   getAll: (req: Request<object, ProductPreview[] | string, object, { take?: string }>, res: Response<ProductPreview[] | string>) => Promise<void>,
   getById: (req: Request<{ id: string }, Product | string, object>, res: Response<Product | string>) => Promise<void>,
}

export interface ShopRepositoryContract {
    getAll: (take?: string) => Promise<ProductPreview[]>
    getById: (id: number) => Promise<Product| null> 
}