import {Request, Response} from 'express'
import { Prisma } from '../generated/prisma/client';


export type Product = Omit<Prisma.ProductGetPayload<{}>, "quantity">

export interface SuggestionParams {
    type: string;
    limit: number;
    offset: number;
}

export interface HomeControllerContract {
    // getAll: (req: Request<object, ProductPreview[] | string, object, { take?: string }>, res: Response<ProductPreview[] | string>) => Promise<void>,
    // getById: (req: Request<{ id: string }, Product | string, object>, res: Response<Product | string>) => Promise<void>,
    getSuggestions: (req: Request<object, Product[] | string, object, SuggestionParams>, res: Response<Product[] | string>) => Promise<void>
}

export interface HomeServiceContract {
    // getAll: (take?: string) => Promise<Product[]>
    // getById: (id: number) => Promise<Product| null> 
    getSuggestions: (params: SuggestionParams) => Promise<Product[]>
}

export interface HomeRepositoryContract {
    getPopularProducts: (limit: number, offset: number) => Promise<Product[]>
    getNewestProducts: (limit: number, offset: number) => Promise<Product[]>
}