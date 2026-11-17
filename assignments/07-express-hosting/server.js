import express from "express"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

//List of new products added
let products = []

//Waits for the app to start and logs this message
app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`);
})


//Adds a new product to the server
app.post("/new-product",(req,res)=>{
    products.push(req.body)
})

//Returns the list of products in the server
app.get("/products",(req,res)=>{
    res.json(products)
})

//Clears the list of products in the server
app.get("/clear-products",(req,res)=>{
    products = []
    res.json(products)
})