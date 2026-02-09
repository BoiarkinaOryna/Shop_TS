import express from 'express';
import HomeController from './home.controller';

const HomeRouter = express.Router();

HomeRouter.get('/', HomeController.getSuggestions);

export default HomeRouter;
