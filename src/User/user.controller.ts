import {Request, Response } from "express"
import { UserControllerContract } from "./user.types"
import { UserService } from "./user.service"

export const UserController: UserControllerContract = {
    authorization: async(req, res) => {
         try {
            let body = req.body
            
            if (!body){
                res.status(400).json({message: 'body is required'})
                return
            }
            const token = await UserService.login(body)
            res.status(200).json({token})
        } catch (error) {
            console.log(error)
            if(error instanceof Error){
                switch (error.message) {
                    case "NOT_FOUND":
                        res.status(401).json({message: 'wrong credentials'})
                        return
                    case "WRONG_CREDENTIALS":
                        res.status(401).json({message: 'wrong credentials'})
                }
            }   
            res.status(500).json({message: 'server error'})
        }
    },
    registration: async (req, res) => {
        try {
            let body = req.body

            if (!body){
                res.status(400).json({ message: 'body is required' })
                return
            }
            const token = await UserService.registration(body)
            res.status(200).json({token})
        } catch (error) {
            console.log(error)
            if(error instanceof Error){
                switch (error.message) {
                    case "USER_EXISTS":
                        res.status(401).json({message: 'wrong credentials'})
                        return
                    }
                }
            res.status(500).json({message: 'server error'})
        }
    },
    emailModal: async (req, res) => {
        try {
            const { email } = req.body

            if (!email) {
                res.status(400).json("email is required")
                return
            }

            await UserService.emailModal({ email })

            res.status(200).json("email sent")
        } catch (error) {
            console.log(error)
            res.status(500).json("server error")
        }
    },

    changePassword: async (req, res) => {
        try {
            const { password } = req.body
            const user_code = req.query
            if (!password || !user_code) {
                res.status(400).json("password and user_code are required")
                return
            }
            const result = await UserService.changePassword({ password })
            if(!result){
                res.status(403).json("User not found")
                return
            }
            res.status(200).json("Password changed")
        } catch (error) {
            console.log(error)
            res.status(500).json("server error")
        }
    },

    getContacts: async (req, res) => {
        try {
            const userId = res.locals.userId
            if (!userId) {
                res.status(401).json({ message: "Authorization required" })
                return
            }
            const result = await UserService.getContactsData(userId);

            if (typeof result === "string") {
            res.status(404).json({ message: result })
            return
            }

            res.status(204).json(result)
        } catch (error) {
            res.status(500).json({ message: "server error" })
        }
    },

    updateContactsData: async (req, res) => {
        try{
            const body = req.body
            if (!body || !body.id) {
                res.status(400).json("User is required")
                return
            }
            const result = await UserService.updateContactsData(body)
            if(!result){
                res.status(404).json("User not found")
                return
            }
            res.status(200).json("Contacts updated")
        } catch (error) {

            res.status(500).json("server error")
        }
    },

    getOrders: async (req, res) => {
        try {
            const userId = res.locals.userId
            const orders = await UserService.getOrders(userId)
            
            if (typeof orders === 'string') {
                res.status(404).json([])
                return
            }
            
            res.status(204).json(orders)
        } catch (error) {
            console.log(error)
            res.status(500).json([])
        }
    },

    getAddress: async (req, res) => {
    try {
      const userId = res.locals.userId
      const addresses = await UserService.getAddress(userId)

      if (typeof addresses === "string") {
        res.status(404).json([])
        return
      }

      res.status(204).json(addresses)
    } catch (error) {
      console.log(error)
      res.status(500).json([])
    }
  },

    updateAddress: async (req, res) => {
        try {
            const body = req.body
            if (!body || !body.id) {
                res.status(400).json("Address data is required")
                return
            }
            const result = await UserService.updateAddress(body)
            if(!result){
                res.status(404).json("Address not found")
                return
            }
            res.status(200).json("Address updated")
        } catch (error) {
            console.log(error)
            res.status(500).json("server error")
        }
    },

    addAddress: async (req, res) => {
        try {
            const body = req.body
            if (!body.country || !body.city || !body.street || !body.house) {
                res.status(400).json("Incomplete address data")
                return
            }
            const result = await UserService.addAddress(body)
            if(!result){
                res.status(500).json("Failed to add address")
                return
            }
            res.status(201).json("Address added")
        } catch (error) {
            console.log(error)
            res.status(500).json("server error")

        }
    },

    sendFedback: async (req, res) => {
        try {
            const body = req.body
            if (!body.userEmail || !body.content) {
                res.status(400).json("Incomplete feedback data")
                return
            }   
            const result = await UserService.sendFeddback(body)
            if(!result){
                res.status(500).json("Failed to send feedback")
                return
            }
            res.status(200).json("Feedback sent")
        } catch (error) {
            console.log(error)
            res.status(500).json("server error")
        }    
    
}
}