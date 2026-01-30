import express from 'express';
import HomeController from "./home.controller";


const HomeRouter: express.Router = express.Router()

HomeRouter.get('/suggestions', HomeController.getSuggestions)

export default HomeRouter