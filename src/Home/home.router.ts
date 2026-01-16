import { Router } from 'express';
import { HomeController } from './home.controller';

const router = Router();
const homeController = new HomeController();

router.get('/suggestions', homeController.getSuggestions);

export default router;