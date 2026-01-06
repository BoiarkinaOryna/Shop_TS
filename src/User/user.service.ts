import {  UserServiceContract } from "./user.types";
import { UserRepository } from "./user.repository";

export const UserService: UserServiceContract ={
    async registration (data) {
        return await UserRepository.registration(data)
    },
    async authorization (data) {
        return await UserRepository.authorization(data)
    },
    async emailModal (data) {
        return await UserRepository.emailModal(data)
    },
    async changePassword (data) {
        return await UserRepository.changePassword(data)
    },
    async getContactsData (getData) {
        return await UserRepository.getContactsData (getData)
    },
    async updateContactsData (data) {
        return await UserRepository.updateContactsData (data)
    },
    async getOrders (getData) {
        return await UserRepository.getOrders (getData)
    },
    async getAddress (getData) {
        return await UserRepository.getAddress (getData)
    },
    async updateAddress (data) {
        return await UserRepository.updateAddress (data)
    },
    async addAddress (data) {
        return await UserRepository.addAddress (data)
    },
    async sendFeddback (data) {
        return await UserRepository.sendFeddback (data)
    }
}