/// npm i mongodb

const express  =require("express")

const {MongoClient} = require('mongodb');
// const url = 'mongodb://localhost:27017';
const url ='mongodb://localhost:27017/mydatabase';
const options = { serverSelectionTimeoutMS: 5000 };
const app = express();
var database

app.use(express.json());

app.get("/",(req, res)=>{
    res.send("Wekcome to Mogndo ")
})

app.get("/api/books",(req,res)=>{
    database.collection('books').find({}).toArray((err,result)=>{
        if(err) throw err;

        res.send(result)
    })
})

app.listen(1003,()=>{
    MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true},(error, result)=>{
        if(error){
            console.error(error)
        }
        database= result.db("mydatabase")
        console.log("Connection Successful")
        })
})

// app.listen(1003,()=>{
//     MongoClient.connect(url,options,(error, result)=>{
//         if(error){
//             console.error(error)
//         }
       
//         console.log("Connection Successful")
//         })
// })