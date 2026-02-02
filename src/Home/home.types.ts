import { Request, Response } from 'express';
import { PrismaClient, Product as PrismaProductType } from '@prisma/client';

export const Client = new PrismaClient();

export type Product = Omit<PrismaProductType, 'quantity'>;

export interface SuggestionParams {
  type: 'popular' | 'new';
  limit: number;
  offset: number;
}

export interface HomeControllerContract {
  getSuggestions: (req: Request, res: Response) => Promise<void>;
}

export interface HomeServiceContract {
  getSuggestions: (params: SuggestionParams) => Promise<Product[]>;
}

export interface HomeRepositoryContract {
  getPopularProducts: (limit: number, offset: number) => Promise<Product[]>;
  getNewestProducts: (limit: number, offset: number) => Promise<Product[]>;
}
