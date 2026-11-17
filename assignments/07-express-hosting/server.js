import express from "express"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

let products = []
let categories = []

app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`);
})



app.post("/new-product",(req,res)=>{
    products.push(req.body)
})

app.get("/products",(req,res)=>{
    res.json(products)
})

app.get("/clear-products",(req,res)=>{
    products = []
    res.json(products)
})