import { HomeRepository } from './home.repository';

export class HomeService {
  private homeRepository = new HomeRepository();

  async getSuggestions(params: { type: string, limit: number, offset: number }) {
    const { type, limit, offset } = params;

    if (type === 'popular') {
      return this.homeRepository.getPopularProducts(limit, offset);
    }

    if (type === 'new') {
      return this.homeRepository.getNewestProducts(limit, offset);
    }

    // По умолчанию можно вернуть пустой массив или общий список
    return [];
  }
}