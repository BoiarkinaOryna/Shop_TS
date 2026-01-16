import { Request, Response } from 'express';
import { HomeService } from './home.service';

export class HomeController {
  private homeService = new HomeService();

  getSuggestions = async (req: Request, res: Response) => {
    try {
      // Извлекаем параметры и приводим к нужным типам
      const { 
        type, // 'popular' | 'new'
        limit = '10', 
        page = '1' 
      } = req.query;

      const suggestions = await this.homeService.getSuggestions({
        type: String(type),
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit)
      });

      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}