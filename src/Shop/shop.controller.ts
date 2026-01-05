import ShopService from "./shop.service"
import { ShopControllerContract } from "./shop.types"

const ProductController: ShopControllerContract = {
  async getAll(req, res) {
    const take: string | undefined = req.query.take
  
    
    if (!take) {
      res.status(400).json("Take is required")
      return
    }
    if (isNaN(+take)) {
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

  async create(req, res) {
    const body = req.body

    if (!body) {
      res.status(422).json("Body is required.")
      return
    }

    if (!body.title) {
      res.status(422).json("title is required.")
      return
    }

    if (body.price === undefined) {
      res.status(422).json("price is required.")
      return
    }

    if (body.quantity === undefined) {
      res.status(422).json("quantity is required.")
      return
    }

    try {
      const product = await ShopService.create(body)
      if (!product) {
        res.status(500).json("Product creation error")
        return
      }

      res.status(201).json(product)
    } catch (error) {
      res.status(500).json("Error creating product")
    }
  },

  async update(req, res) {
    const id = +req.params.id

    if (!id) {
      res.status(400).json("id is required")
      return
    }

    if (isNaN(id)) {
      res.status(400).json("id must be a number")
      return
    }

    const body = req.body

    if (body.title && typeof body.title !== "string") {
      res.status(400).json("title must be a string")
      return
    }

    if (body.price && typeof body.price !== "number") {
      res.status(400).json("price must be a number")
      return
    }

    if (body.quantity && typeof body.quantity !== "number") {
      res.status(400).json("quantity must be a number")
      return
    }

    try {
      const product = await ShopService.update(id, body)
      if (!product) {
        res.status(404).json("Product not found")
        return
      }

      res.status(200).json(product)
    } catch (error) {
      res.status(500).json("The product has not been updated")
    }
  },

  async delete(req, res) {
    const id = +req.params.id
    if (isNaN(id)) {
      res.status(400).json("id must be a number")
      return
    }

    try {
      const deleted = await ShopService.delete(id)
      if (!deleted) {
        res.status(404).json("Product not found")
        return
      }

      res.status(200).json(deleted)
    } catch (error) {
      res.status(500).json("The product was not deleted")
    }
  },
}

export default ProductController
