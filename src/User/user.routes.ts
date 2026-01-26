import { Router } from 'express'
import { UserController } from './user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const UserRouter = Router()

UserRouter.post("/registration", UserController.registration)
UserRouter.post("/authorization", UserController.authorization)
UserRouter.post("/change-password/email", authMiddleware, UserController.emailModal)
UserRouter.patch("/change-password", authMiddleware, UserController.changePassword)
UserRouter.get("/", authMiddleware, UserController.getContacts)
UserRouter.patch("/", authMiddleware, UserController.updateContactsData)
UserRouter.get("/my-orders", authMiddleware, UserController.getOrders)
UserRouter.get("/my-address", authMiddleware, UserController.getAddress)
UserRouter.patch("/my-address", UserController.updateAddress)
UserRouter.post("/my-address", UserController.addAddress)
UserRouter.post("/contacts", UserController.sendFedback)