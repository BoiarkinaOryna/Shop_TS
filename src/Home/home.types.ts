import {Request, Response} from 'express'
import { Prisma } from '../generated/prisma/client';


export type Product = Omit<Prisma.ProductGetPayload<{}>, "quantity">

export interface SuggestionParams {
    type: string;
    limit: number;
    offset: number;
}

export interface HomeControllerContract {
    getSuggestions: (req: Request<object, Product[] | string, object, SuggestionParams>, res: Response<Product[] | string>) => Promise<void>
}

export interface HomeServiceContract {
    getSuggestions: (params: SuggestionParams) => Promise<Product[]>
}

export interface HomeRepositoryContract {
    getPopularProducts: (limit: number, offset: number) => Promise<Product[]>
    getNewestProducts: (limit: number, offset: number) => Promise<Product[]>
}