import 'dotenv/config'
import express from "express"
import { ShopRouter } from "./Shop/shop.router"
import { UserRouter } from "./User/user.routes"
import { logMiddleware } from "./middlewares/log.middleware";

const app = express();

app.use(express.json());

app.use(logMiddleware)

app.use("/products/", ShopRouter)
app.use("/user/", UserRouter)


app.get("/",(req, res )=>{
    res.send("Server is running");
});

const PORT: number = 8001
const HOST: string = 'localhost'
app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`)
})