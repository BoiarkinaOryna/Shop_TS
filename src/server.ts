import express from "express"
import { ShopRouter } from "./Shop/shop.router";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001"
}))

app.use("/products/", ShopRouter)

app.get("/",(req, res )=>{
    res.send("Server is running");
});

const PORT: number = 3000
const HOST: string = 'localhost'
app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`)
})

