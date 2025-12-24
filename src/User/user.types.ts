import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma'


export type User = Prisma.UserGetPayload<{}>

export type EditUser = Omit<User, "password" | "addressID">


export interface UserControllerContract {}


export interface  UserServiceContract {}


export interface  UserRpositoryContract {}