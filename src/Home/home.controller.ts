import HomeService from './home.service';
import { HomeControllerContract } from './home.types';

const HomeController: HomeControllerContract = {
  async getSuggestions(req, res) {
    try {
      const type = (req.query.type as string) || '';
      const limit = Number(req.query.limit ?? 12);
      const page = Number(req.query.offset ?? 1);

      if (!['popular', 'new'].includes(type)) {
        res.status(400).send("Type must be either 'popular' or 'new'");
        return
      }

      if (isNaN(limit) || isNaN(page)) {
        res.status(400).send('Limit and page must be numbers');
        return
      }

      const suggestions = await HomeService.getSuggestions({
        type: type as 'popular' | 'new',
        limit,
        offset: (page - 1) * limit,
      });

      res.json(suggestions);
      return
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
      return
    }
  },
};

export default HomeController;