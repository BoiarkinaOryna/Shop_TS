import {  UserServiceContract } from "./user.types"
import { UserRepository } from "./user.repository"
import nodemailer from "nodemailer"
import { changePasswordCode } from "./user.types"
import { ENV } from "../config/env"
import { sign } from "jsonwebtoken"
import { compare, hash } from "bcryptjs"
import { StringValue } from "ms"


const changePasswordCodes: changePasswordCode[] = []

export const UserService: UserServiceContract ={
    async registration (data) {
        await UserRepository.registration(data)
        const hashedPassword = await hash(data.password, 10)

        const hashedCredentials = {
            ...data,
            password: hashedPassword
        }

        const userId = await UserRepository.registration(data)
        if (!ENV.JWT_ACCESS_SECRET_KEY || !ENV.JWT_EXPIRES_IN) {
            throw new Error("JWT_ACCESS_SECRET_KEY or JWT_EXPIRES_IN is not defined");
        }
        const token = sign({id: userId}, ENV.JWT_ACCESS_SECRET_KEY, {expiresIn: ENV.JWT_EXPIRES_IN as StringValue})
        return token
    },
    async authorization (data) {
        const userId = await UserRepository.authorization(data)
        if (!ENV.JWT_ACCESS_SECRET_KEY || !ENV.JWT_EXPIRES_IN) {
            throw new Error("JWT_ACCESS_SECRET_KEY or JWT_EXPIRES_IN is not defined");
        }
        const token = sign({id: userId}, ENV.JWT_ACCESS_SECRET_KEY, {expiresIn: ENV.JWT_EXPIRES_IN as StringValue})
        return token
    },
    async emailModal (data) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use true for port 465, false for port 587
            auth: {
                user: "boyarkina.ar@gmail.com",
                pass: "jn7jnAPss4f63QBp6D",
            },
        })
        let code: string
        while (true){
            code = Math.floor(Math.random() * 1_000_000).toString().padStart(6, "0")

            let exists = false
            for (let passcode of changePasswordCodes){
                if (passcode.code === code){
                    exists = true
                    break
                }
            }
            if (!exists) {
                break
            }
        }
        const info = await transporter.sendMail({
            from: '"Drones for Everyone" <boyarkina.ar@gmail.com>', // sender address
            to: data.email,
            subject: "Here is your password reset link",
            text: `Go to the link below to reset your password: http://localhost:8001/user/change-password?user_code=${code}`, // Plain-text version of the message
            html: `<p>Go to the link below to reset your password<br>${code}</p>`, // HTML version of the message
        })
        return "EMAIL_SENT"
    },
    async changePassword (data) {
        for (let passcode of changePasswordCodes){
            if (passcode.userId == data.userId){
                return await UserRepository.changePassword(data)
            }
        }
        throw new Error("INVALID_CODE")
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
        try{
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.email",
                port: 587,
                secure: false, // Use true for port 465, false for port 587
                auth: {
                    user: data.userEmail,
                    pass: "jn7jnAPss4f63QBp6D",
                },
                })
            const info = await transporter.sendMail({
                from: `"User" <${data.userEmail}>`, // sender address
                to: "boyarkina.ar@gmail.com",
                subject: "Hello ✔",
                text: "Hello world?", // Plain-text version of the message
                html: `<p>${data.content}</p>`, // HTML version of the message
            })
            return "EMAIL_SENT"
        } catch (error) {
            console.log(error)
            return String(error)
        }
    }
}