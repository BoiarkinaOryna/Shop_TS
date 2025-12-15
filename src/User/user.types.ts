import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma'


export type User = Prisma.UserGetPayload<{}>


export interface UserControllerContract {}


export interface  UserServiceContract {}


export interface  UserRpositoryContract {}