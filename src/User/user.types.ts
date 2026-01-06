import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma'


export type User = Prisma.UserGetPayload<{}>
export type Order = Prisma.OrderGetPayload<{}>
export type Address = Prisma.AddressGetPayload<{}>

export type UserAuthResponse = {token: string}
export type ErrorResponse = {message: string}

export type Register = Omit<User, "number" | "id" | "surname" | "patromymic" | "avatar" | "addressID">
export type Authorization = Omit<Register, "name">
export type UserEmailForm = {
    "email": string
}
export type UserPasswordForm = {
    "password": string
}
export type UserContacts = Omit<User, "id" | "password" | "addressID" >
export type UpdateUserContacts = Partial<UserContacts>
export type AddAddress = Omit<Address, "id">
export type ChangeAdress = Partial<AddAddress>
export type SendEmail = {
    "userEmail": string,
    "content": string
}

export interface UserControllerContract {
    registration: (req: Request<object, ErrorResponse | UserAuthResponse, Register>, res: Response<ErrorResponse | UserAuthResponse>) => Promise<void>,
    authorization: (req: Request <object,ErrorResponse | UserAuthResponse, Authorization>, res: Response<ErrorResponse | UserAuthResponse>) => Promise<void>,
    emailModal: (req: Request<object, string, UserEmailForm >, res: Response<string>) => Promise<void>,
    changePassword: (req: Request<object, string, UserPasswordForm>, res: Response<string>) => Promise<void>,
    getContacts: (req: Request<object, UserContacts, object>, res: Response<UserContacts | ErrorResponse>) => Promise<void>,
    updateContactsData: (req: Request<object, string, UpdateUserContacts >, res: Response<string>) => Promise<void>,
    getOrders: (req: Request<object, Order[], object>, res: Response<Order[]>) => Promise<void>,
    getAddress: (req: Request<object, Address[], object>, res: Response<Address[]>) => Promise<void>,
    updateAddress: (req: Request<object, string, ChangeAdress>, res: Response<string>) => Promise<void>,
    addAddress: (req: Request<object, string, AddAddress>, res: Response<string>) => Promise<void>,
    sendFedback: (req: Request<object, string, SendEmail>, res: Response<string>) => Promise<void>,
}

export interface UserServiceContract {
    registration: (data: Register)=> Promise<string>,
    authorization: (data:Authorization)=> Promise<string>,
    emailModal: (data: UserEmailForm)=> Promise<string | null>,
    changePassword: (data: UserPasswordForm)=> Promise<string | null>,
    getContactsData: (getData: number)=> Promise<UserContacts | string>,
    updateContactsData: (data: UpdateUserContacts)=> Promise<string | null>,
    getOrders: (getData: number)=> Promise<Order[] | string>,
    getAddress: (getData: number)=> Promise<Address[] | string>,
    updateAddress: (data: ChangeAdress)=>Promise<string | null>
    addAddress: (data: AddAddress )=> Promise<string | null>,
    sendFeddback: (data: SendEmail) => Promise<string | null>
}

export interface UserRpositoryContract {
    registration: (data: Register) => Promise<string>,
    authorization: (data: Authorization) => Promise<string>,
    emailModal: (data: UserEmailForm) => Promise<string | null>,
    changePassword: (data: UserPasswordForm) => Promise<string | null>,
    getContactsData: (userId: number) => Promise<UserContacts | string>,
    updateContactsData: (data: UpdateUserContacts) => Promise<string | null>,
    getOrders: (userId: number) => Promise<Order[] | string>,
    getAddress: (userId: number) => Promise<Address[] | string>,
    updateAddress: (data: ChangeAdress) => Promise<string | null>,
    addAddress: (data: AddAddress) => Promise<string | null>,
    sendFeddback: (data: SendEmail)=> Promise<string | null>
}