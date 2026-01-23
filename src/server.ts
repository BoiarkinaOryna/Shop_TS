import express from "express"
import { ShopRouter } from "./Shop/shop.router";
import HomeRouter from "./Home/home.router";

const app = express();

app.use(express.json());

app.use("/products/", ShopRouter)
app.use("/home/", HomeRouter)


app.get("/",(req, res )=>{
    res.send("Server is running");
});

const PORT: number = 8001
const HOST: string = 'localhost'
app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`)
})

