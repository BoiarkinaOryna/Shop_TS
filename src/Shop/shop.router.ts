import { Router } from "express";
import ProductController from "./shop.controller";


const ShopRouter = Router()

ShopRouter.get("/", ProductController.getAll)
ShopRouter.get("/:id", ProductController.getById)

export {ShopRouter}