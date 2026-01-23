import { Router } from 'express';
import { HomeController } from './home.controller';

const HomeRouter = Router();
const homeController = new HomeController();

HomeRouter.get('/suggestions', homeController.getSuggestions);

export default HomeRouter;