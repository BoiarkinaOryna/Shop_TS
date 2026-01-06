import { Router } from 'express'
import { UserController } from './user.controller'

export const UserRouter = Router()

UserRouter.post("/registration", UserController.registration)
UserRouter.post("/authorization", UserController.authorization)
UserRouter.post("/change-password/email", UserController.emailModal)
UserRouter.patch("/change-password", UserController.changePassword)
UserRouter.get("/", UserController.getContacts)
UserRouter.patch("/", UserController.updateContactsData)
UserRouter.get("/my-orders", UserController.getOrders)
UserRouter.get("/my-address", UserController.getAddress)
UserRouter.patch("/my-address", UserController.updateAddress)
UserRouter.patch("/my-address", UserController.addAddress)
UserRouter.post("/contscts", UserController.sendFedback)