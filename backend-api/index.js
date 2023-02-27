// npm i express
// npm i nodemon

// To run this project.. command nodemon index.js
const express = require("express")

const app =express();

app.use(express.json());

const books=[
    {title:"THi si bess", id:1},
    {title:"Coding with python", id:2},
    {title:"Mathematics Book", id:3},
    {title:"Physics Book", id:4},
]

app.get("/",(req,res)=>{
    res.status(200).json(books)
})

app.get("/api/books",(req,res)=>{
    res.send(books)
})

app.get("/api/books/:id",(req,res)=>{

    const book = books.find(item=> item.id === parseInt(req.params.id))
    if(!book) res.status(404).send("No book found");

    res.send(book)
})



app.post("/api/books/addbook",(req,res)=>{

    const book = books.find(item=> item.title.toLowerCase() === req.body.title.toLowerCase())
    if(book) res.status(402).send("This book already exist");

    const newbook={
        id:books.length+1,
        title:req.body.title
    }

    books.push(newbook);

    res.status(201).json(newbook);
})

app.put("/api/books/update/:id",(req,res)=>{

    const book = books.find(item=> item.id === parseInt(req.params.id))
    if(!book) res.status(404).send("no Book Found");

    book.title= req.body.title;

    res.status(200).json({msg:"Record has been Updated"});
})

// Delete API
app.delete("/api/books/delete/:id",(req, res)=>{

    const result = books.findIndex((item)=> item.id== parseInt(req.params.id));
    if(result<0) res.status(404).json({msg:"No Book found"})

    books.splice(result, 1);

    res.status(201).json("Record has ben Deleted")
})

app.listen(1001,()=>{
    console.log("Server is running at port 1001")
})

