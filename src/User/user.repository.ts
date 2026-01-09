import { Client } from "../prisma/client";
import {
  UserRpositoryContract,
  Register,
  Authorization,
  UserEmailForm,
  UserPasswordForm,
  UpdateUserContacts,
  ChangeAdress,
  AddAddress,
  SendEmail,
} from "./user.types"

const prisma = new Client()

export const UserRepository: UserRpositoryContract = {
  async registration(data: Register) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existing) {
      throw new Error("USER_EXISTS")
    }

    const user = await prisma.user.create({
      data,
    })

    return String(user.id) 
  },

  async authorization(data: Authorization) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) throw new Error("NOT_FOUND")
    if (user.password !== data.password) {
      throw new Error("WRONG_CREDENTIALS")
    }

    return String(user.id)
  },

  async emailModal({ email }: UserEmailForm) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) return null

    
    return "EMAIL_SENT"
  },

  async changePassword({ password }: UserPasswordForm) {
    const user = await prisma.user.findFirst()
    if (!user) return null

    await prisma.user.update({
      where: { id: user.id },
      data: { password },
    })

    return "PASSWORD_CHANGED"
  },

  async getContactsData(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        surname: true,
        email: true,
        number: true,
        avatar: true,
      },
    })

    if (!user) return "USER_NOT_FOUND"
    return user
  },

  async updateContactsData(data: UpdateUserContacts) {
    if (!data.email) return null

    await prisma.user.update({
      where: { email: data.email },
      data,
    })

    return "UPDATED"
  },

  async getOrders(userId: number) {
    const orders = await prisma.order.findMany({
      where: { userId },
    })

    if (!orders.length) return "NO_ORDERS"
    return orders
  },

  async getAddress(userId: number) {
    const addresses = await prisma.address.findMany({
      where: { userId },
    })

    if (!addresses.length) return "NO_ADDRESS"
    return addresses
  },

  async updateAddress(data: ChangeAdress) {
    if (!data.id) return null

    await prisma.address.update({
      where: { id: data.id },
      data,
    })

    return "ADDRESS_UPDATED"
  },

  async addAddress(data: AddAddress) {
    await prisma.address.create({
      data,
    })

    return "ADDRESS_CREATED"
  },

  async sendFeddback(data: SendEmail) {

    console.log("Feedback:", data)
    return "SENT"
  },
}
