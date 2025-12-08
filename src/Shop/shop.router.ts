import { Router } from "express";
import ProductController from "./shop.controller";


const ShopRouter = Router()

ShopRouter.get("/", ProductController.getAll)
ShopRouter.get("/:id", ProductController.getById)
ShopRouter.post("/:id", ProductController.create)
ShopRouter.put("/:id", ProductController.update)
ShopRouter.delete("/:id", ProductController.delete)

export {ShopRouter}