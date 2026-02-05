import ShopRepository from "./shop.repository"
import { ProductCreate, ShopServiceContract } from "./shop.types"

const ShopService: ShopServiceContract = {
  async getAll(take) {
    return ShopRepository.getAll(take)
  },

  async getById(id) {
    return ShopRepository.getById(id)
  },
}

export default ShopService
