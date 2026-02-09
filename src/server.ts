import 'dotenv/config'
import cors from "cors"
import express from "express"
import { ShopRouter } from "./Shop/shop.router"
import { UserRouter } from "./User/user.routes"
import { logMiddleware } from "./middlewares/log.middleware";
import HomeRouter from './Home/home.router';

const app = express();

const PORT: number = 8000
const HOST: string = 'localhost'

app.use(cors({
  origin: true,
}));

app.use(express.json());

app.use(logMiddleware)

app.use("/products/", ShopRouter)
app.use("/user/", UserRouter)
app.use("/suggestions/", HomeRouter)


app.get("/",(req, res )=>{
    res.send("Server is running");
});

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`)
})