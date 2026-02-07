import { Client } from "../prisma/client";
import { ShopRepositoryContract, Product} from "./shop.types";

const ShopRepository: ShopRepositoryContract = {
  async getAll(take?) {
    return await Client.product.findMany({
      take: take? +take : 16,
      include: {
        image: true,
        infoBlocks: {
          include: {
            media: true,
            techInfoList: true
          }
        }
      }
    });
  },

  async getById(id) {
    return await Client.product.findUnique({
      where: { id },
      include: {
        image: true,
        infoBlocks: {
          include: {
            media: true,
            techInfoList: true
          }
        }
      }
    });
  },

  async getAllWithFilters({ page, perPage, category }: { page: number, perPage: number, category?: string }) {
    const skip = (page - 1) * perPage;

    const where = category ? { category: { name: category } } : undefined;

    return Client.product.findMany({
      take: perPage,
      skip,
      where,
      include: {
        image: true,
        infoBlocks: {
          include: {
            media: true,
            techInfoList: true
          }
        }
      }
    });
  },

  async getSimilarProducts(productId: number, limit: number) {
    const baseProduct = await this.getById(productId);
    if (!baseProduct) return [];

    let results: Product[] = [];
    const allProducts = await Client.product.findMany({
      where: { NOT: { id: productId } },
      include: { image: true }
    });

    const nameWords = baseProduct.title.toLowerCase().split(" ").filter(Boolean);
    const byName = allProducts.filter(p =>
      nameWords.some(word => p.title.toLowerCase().includes(word))
    );
    results.push(...byName.slice(0, limit));

    if (results.length >= limit) return results.slice(0, limit);

    const byCategory = allProducts.filter(p =>
      p.categoryId === baseProduct.categoryId && !results.includes(p)
    );
    results.push(...byCategory.slice(0, limit - results.length));

    if (results.length >= limit) return results.slice(0, limit);

    const priceRange = 0.1 * baseProduct.price;
    const byPrice = allProducts.filter(p =>
      Math.abs(p.price - baseProduct.price) <= priceRange && !results.includes(p)
    );
    results.push(...byPrice.slice(0, limit - results.length));

    return results.slice(0, limit);
  }
}

export default ShopRepository;
