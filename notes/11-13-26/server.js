import express from "express";

const app = express();
const port = 3000;

let foods=[]

app.use(express.static("public"));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`);
})

app.get("/demo", (req,res)=>{
    console.log("DEMO REQUEST ON SERVER")

    let jsonOBJ ={
        message:"THIS IS FROM THE SERVER"
    }

    res.json(jsonOBJ)
})

app.get("/food", (req,res)=>{
    let foodFromURL = req.query.food;
    let userFromURL = req.query.user;
    foods.push(foodFromURL);
    console.log(foods);
})

app.post("/food", (req,res)=>{
    console.log(req.query.food)
})