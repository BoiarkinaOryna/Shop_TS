import { HomeServiceContract, Product } from './home.types';
import HomeRepository from './home.repository';

const HomeService: HomeServiceContract = {
  async getSuggestions(params): Promise<Product[]> {
    const { type, limit, offset } = params;

    if (type === 'popular') return HomeRepository.getPopularProducts(limit, offset);
    if (type === 'new') return HomeRepository.getNewestProducts(limit, offset);

    return [];
  },
};

export default HomeService;
