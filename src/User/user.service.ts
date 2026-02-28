import {  UserServiceContract } from "./user.types"
import { UserRepository } from "./user.repository"
import nodemailer from "nodemailer"
import { changePasswordCode } from "./user.types"
import { ENV } from "../config/env"
import { sign } from "jsonwebtoken"
// import { hash } from "bcryptjs"
import { StringValue } from "ms"


const changePasswordCodes: changePasswordCode[] = []

export const UserService: UserServiceContract ={
    async registration (data) {
        // const hashedPassword = await hash(data.password, 10)

        // const hashedCredentials = {
        //     ...data,
        //     password: hashedPassword
        // }

        const userId = await UserRepository.registration(data)

        return userId
    },
    async authorization (data) {
        const userId = await UserRepository.authorization(data)
        if (!ENV.JWT_ACCESS_SECRET_KEY || !ENV.JWT_EXPIRES_IN) {
            throw new Error("JWT_ACCESS_SECRET_KEY or JWT_EXPIRES_IN is not defined");
        }
        const token = sign({id: userId}, ENV.JWT_ACCESS_SECRET_KEY, {expiresIn: ENV.JWT_EXPIRES_IN as StringValue})
        return token
    },
    async emailModal (data, id) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: ENV.AUTH_EMAIL,
                pass: ENV.EMAIL_PASSWORD,
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
            from: `"Drones for Everyone" <${ENV.EMAIL}>`,
            to: data.email,
            subject: "Here is your password reset link",
            text: `Go to the link below to reset your password: http://localhost:8001/user/change-password?user_code=${code}`, // Plain-text version of the message
            html: `<p>Go to the link below to reset your password<br>http://localhost:8001/user/change-password?user_code=${code}</p>`, // HTML version of the message
        })
        changePasswordCodes.push({
            "code": code,
            "userId": id
        })
        console.log(changePasswordCodes)
        return "EMAIL_SENT"
    },
    async changePassword (data, code) {
        for (let passcode of changePasswordCodes){
            if (passcode.userId === data.userId){
                if (passcode.code === code)
                return await UserRepository.changePassword(data)
            }
        }
        throw new Error("INVALID_CODE")
    },
    async getContactsData (getData) {
        return await UserRepository.getContactsData (getData)
    },
    async updateContactsData (data, id) {
        return await UserRepository.updateContactsData (data, id)
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
                host: "smtp.gmail.com",
                port: 587,
                secure: false, 
                auth: {
                    user: ENV.AUTH_EMAIL,
                    pass: ENV.EMAIL_PASSWORD,
                },
                })
            const info = await transporter.sendMail({
                from: `"User" <${data.userEmail}>`,
                to: ENV.EMAIL,
                replyTo: data.userEmail,
                subject: "Фідбек з магазину",
                text: data.content,
                html: `<p>${data.content}</p>`,
            })
            return "EMAIL_SENT"
        } catch (error) {
            console.log(error)
            throw new Error("SENDING ERROR")
        }
    }
}