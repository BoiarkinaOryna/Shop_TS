import { HomeRepository } from './home.repository';
import { HomeServiceContract } from './home.types';

const HomeService: HomeServiceContract = {
  async getSuggestions {
    const { type, limit, offset } = params

    if (type ==='popular') {
      return HomeRepository.getPopularProducts(limit, offset)
    }

    if (type === 'new') {
      return HomeRepository.getNewestProducts(limit, offset)
    }
    return []
  }
}

export default HomeService