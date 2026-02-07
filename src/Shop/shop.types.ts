import { Request, Response } from 'express'
import type { Prisma } from '../generated/prisma/client'

export type Product = Prisma.ProductGetPayload<{}>

export type ProductCreate = Prisma.ProductCreateInput 

export type ProductUpdate = Prisma.ProductUpdateInput

export type ProductPreview = Omit<Product, "quantity" | "shortDescription">

export type InfoBlock = Prisma.InfoBlockGetPayload<{}>
export type Media = Prisma.MediaGetPayload<{}>

export interface PaginationParams {
    page: number
    perPage: number
    category?: string
}

export interface SimilarProductsParams {
    productId: number
    limit?: number
}

export interface ShopServiceContract {
    getAll: (take?: string) => Promise<ProductPreview[]>
    getById: (id: number) => Promise<Product | null>

    getAllWithFilters: (params: PaginationParams) => Promise<ProductPreview[]>
    getSimilarProducts: (productId: number, limit: number) => Promise<Product[]>
}

export interface ShopControllerContract {
    getAll: (
        req: Request<object, ProductPreview[] | string, object, { take?: string }>,
        res: Response<ProductPreview[] | string>
    ) => Promise<void>

    getById: (
        req: Request<{ id: string }, Product | string, object>,
        res: Response<Product | string>
    ) => Promise<void>

    getAllWithFilters: (
        req: Request<object, ProductPreview[] | string, object, PaginationParams>,
        res: Response<ProductPreview[] | string>
    ) => Promise<void>

    getByIdWithSimilar: (
        req: Request<{ id: string }, { product: Product, similar: Product[] } | string, object, { limit?: string }>,
        res: Response<{ product: Product, similar: Product[] } | string>
    ) => Promise<void>
}

export interface ShopRepositoryContract {
    getAll: (take?: string) => Promise<ProductPreview[]>
    getById: (id: number) => Promise<Product | null>

    getAllWithFilters: (params: PaginationParams) => Promise<ProductPreview[]>
    getSimilarProducts: (productId: number, limit: number) => Promise<Product[]>
}
