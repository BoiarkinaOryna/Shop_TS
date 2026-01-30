import { HomeControllerContract } from "./home.types";

const HomeController: HomeControllerContract = {
  async getSuggestions {
    try {
      // Извлекаем параметры и приводим к нужным типам
      const { 
        type, // 'popular' | 'new'
        limit = '12', 
        page = '1' 
      } = req.query;

      if (type !== "popular" && type !== "new"){
        res.status(400).json("Type must be either 'new or 'popular")
        return
      }
      if (isNaN(+limit) || isNaN(+page)){
        res.status(400).json("Limit and page must be numbers")
        return
      }

      const suggestions = await this.H.getSuggestions({
        type: String(type),
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit)
      });
      if (!suggestions){
        res.status(404). json("No products found")
      }
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default HomeController