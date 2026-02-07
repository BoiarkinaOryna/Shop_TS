import ShopService from "./shop.service"
import { ShopControllerContract } from "./shop.types"
import { Request, Response } from "express"

const ProductController: ShopControllerContract = {
  async getAll(req, res) {
    const take: string | undefined = req.query.take

    if (take && isNaN(+take)) {
      res.status(400).json("Take must be a number")
      return
    }

    try {
      const products = await ShopService.getAll(take)
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json("Server internal error")
    }
  },

  async getById(req, res) {
    if (!req.params.id) {
      res.status(400).json("id is required")
      return
    }

    const id = +req.params.id
    if (isNaN(id)) {
      res.status(400).json("id must be an integer")
      return
    }

    try {
      const product = await ShopService.getById(id)
      if (!product) {
        res.status(404).json("Product not found")
        return
      }

      res.status(200).json(product)
    } catch (error) {
      res.status(500).json("Error fetching product")
    }
  },

  async getAllWithFilters(req, res) {
    const { page = '1', perPage = '16', category } = req.query;

    const pageNumber = +page;
    const perPageNumber = +perPage;

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(perPageNumber) || perPageNumber < 1) {
      res.status(400).json("Invalid pagination parameters");
      return;
    }

    try {
      const products = await ShopService.getAllWithFilters({
        page: pageNumber,
        perPage: perPageNumber,
        category: category as string | undefined
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("Server internal error");
    }
  },

  async getByIdWithSimilar(req, res) {
    const id = +req.params.id;
    const { limit = '10' } = req.query;

    if (isNaN(id)) {
      res.status(400).json("id must be an integer");
      return;
    }

    try {
      const product = await ShopService.getById(id);
      if (!product) {
        res.status(404).json("Product not found");
        return;
      }

      const similar = await ShopService.getSimilarProducts(id, +limit);
      res.status(200).json({ product, similar });
    } catch (error) {
      res.status(500).json("Error fetching product or similar products");
    }
  }
}

export default ProductController
