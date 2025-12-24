import ShopRepository from "./shop.repository"
import { ShopServiceContract } from "./shop.types"

const ShopService: ShopServiceContract = {
  async getAll(take) {
    return ShopRepository.getAll(take)
  },

  async getById(id) {
    return ShopRepository.getById(id)
  },

  async create(data) {
    return ShopRepository.create(data)
  },

  async update(id, data) {
    return ShopRepository.update(id, data)
  },

  async delete(id) {
    return ShopRepository.delete(id)
  },
}

export default ShopService
