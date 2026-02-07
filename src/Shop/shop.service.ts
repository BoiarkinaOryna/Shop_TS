import ShopRepository from "./shop.repository"
import { ShopServiceContract } from "./shop.types"

const ShopService: ShopServiceContract = {
  async getAll(take) {
    return ShopRepository.getAll(take)
  },

  async getById(id) {
    return ShopRepository.getById(id)
  },

  async getAllWithFilters({ page, perPage, category }: { page: number, perPage: number, category?: string }) {
    return ShopRepository.getAllWithFilters({ page, perPage, category });
  },

  async getSimilarProducts(productId: number, limit: number) {
    return ShopRepository.getSimilarProducts(productId, limit);
  }
}

export default ShopService
