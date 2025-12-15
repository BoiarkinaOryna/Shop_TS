import {Request , Response} from 'express'
import { Prisma } from '../generated/prisma'


export type Product = Prisma.ProductGetPayload<{}>

export type ProductCreate = Prisma.ProductCreateInput 

export type ProductUpdate = Prisma.ProductUpdateInput

export type ProductPreview = Omit<Product, "quantity" | "shortDescription">

// Наступні типи тут тимчасово, поки нема папки замовлення
export type Order = Prisma.OrderGetPayload<{}>
export type Address = Prisma.AddressGetPayload<{}>


export interface ShopServiceContract {
    getAll: (take: string) => Promise<ProductPreview[]>
    getById: (id: number) => Promise<Product| null> 
    create: (data: ProductCreate) => Promise<Product>
    update: (id: number, data: ProductUpdate) => Promise<Product | null>
    delete: (id: number) => Promise<null>
}

export interface ShopControllerContract {
   getAll: (req: Request<object, ProductPreview[] | string, object, { take?: string }>, res: Response<ProductPreview[] | string>) => Promise<void>,
   getById: (req: Request<{ id: string }, Product | string, object>, res: Response<Product | string>) => Promise<void>,
   create: (req: Request<object, Product | string, Product >,res: Response< Product | string >)=> Promise<void>,
   update: (req: Request<{ id: number }, Product | string, ProductUpdate, object>, res: Response<Product | string>) => Promise<void>,
   delete: (req: Request<{ id: number}, string, Product | string, object>, res: Response<Product | string>) => Promise<void>
}

export interface ShopRepositoryContract {
    getAll: (take: string) => Promise<ProductPreview[]>
    getById: (id: number) => Promise<Product| null> 
    create: (data: ProductCreate) => Promise<Product>
    update: (id: number, data: ProductUpdate) => Promise<Product | null>
    delete: (id: number) => Promise<null>
}



