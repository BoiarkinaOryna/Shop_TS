import ShopService from "./shop.service"
import { ProductCreate, ShopControllerContract } from "./shop.types"

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
}

export default ProductController
