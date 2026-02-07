import express from "express";
import ProductController from "./shop.controller";

const ShopRouter: express.Router = express.Router()

ShopRouter.get("/", ProductController.getAll)
ShopRouter.get("/:id", ProductController.getById)

ShopRouter.get("/catalog", ProductController.getAllWithFilters)
ShopRouter.get("/:id/details", ProductController.getByIdWithSimilar)

export { ShopRouter }
