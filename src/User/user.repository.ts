import { Client } from "../prisma/client";
import { UserRpositoryContract } from "./user.types"

export const UserRepository: UserRpositoryContract = {
  async registration(data) {
    const existing = await Client.user.findUnique({
      where: { email: data.email },
    })

    if (existing) {
      throw new Error("USER_EXISTS")
    }

    const user = await Client.user.create({
      data,
    })

    return String(user.id) 
  },

  async authorization(data) {
    const user = await Client.user.findUnique({
      where: { email: data.email },
    })

    if (!user) throw new Error("NOT_FOUND")
    if (user.password !== data.password) {
      throw new Error("WRONG_CREDENTIALS")
    }

    return String(user.id)
  },

  async emailModal({ email }) {
    const user = await Client.user.findUnique({
      where: { email },
    })

    if (!user) return null

    
    return "EMAIL_SENT"
  },

  async changePassword({ password }) {
    const user = await Client.user.findFirst()
    if (!user) return null

    await Client.user.update({
      where: { id: user.id },
      data: { password },
    })

    return "PASSWORD_CHANGED"
  },

  async getContactsData(userId) {
    const user = await Client.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        surname: true,
        patromymic: true,
        email: true,
        number: true,
        avatar: true,
      },
    })

    if (!user) return "USER_NOT_FOUND"
    return user
  },

  async updateContactsData(data) {
    if (!data.email) return null

    await Client.user.update({
      where: { email: data.email },
      data,
    })

    return "UPDATED"
  },

  async getOrders(userId) {
    const orders = await Client.order.findMany({
      where: { userId },
    })

    if (!orders.length) return "NO_ORDERS"
    return orders
  },

  async getAddress(userId) {
    const addresses = await Client.address.findMany({
      where: { id: userId },
    })

    if (!addresses.length) return "NO_ADDRESS"
    return addresses
  },

  async updateAddress(data) {
    if (!data.id) return null

    await Client.address.update({
      where: { id: data.id },
      data,
    })

    return "ADDRESS_UPDATED"
  },

  async addAddress(data) {
    await Client.address.create({
      data,
    })

    return "ADDRESS_CREATED"
  },

  async sendFeddback(data) {

    console.log("Feedback:", data)
    return "SENT"
  },
}
