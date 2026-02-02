import { Request, Response } from 'express';
import HomeService from './home.service';
import { HomeControllerContract } from './home.types';

const HomeController: HomeControllerContract = {
  async getSuggestions(req: Request, res: Response) {
    try {
      const type = (req.query.type as string) || '';
      const limit = Number(req.query.limit ?? 12);
      const page = Number(req.query.page ?? 1);

      if (!['popular', 'new'].includes(type)) {
        return res.status(400).send("Type must be either 'popular' or 'new'");
      }

      if (isNaN(limit) || isNaN(page)) {
        return res.status(400).send('Limit and page must be numbers');
      }

      const suggestions = await HomeService.getSuggestions({
        type: type as 'popular' | 'new',
        limit,
        offset: (page - 1) * limit,
      });

      return res.json(suggestions);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  },
};

export default HomeController;
