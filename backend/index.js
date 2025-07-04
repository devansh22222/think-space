require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

app.use(cors());
app.use(express.json());


app.listen(port, ()=>{
    console.log("Server Started");
})

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

connection.connect((err)=>{
    if(!err){
        console.log("Connected to Database")
    }
    else{
        console.log("Failed to connect to Database")
    }
});


app.get("/posts" , (req,res)=>{
    // res.send("hello")
    let q = "SELECT * FROM USERS"

    try {
        connection.query(q, (err,result)=>{
            if(err){
                console.log("Error to Display Thought")
            }
            else{
                console.log("Response sent From DB")
                return res.status(200).json(result)
            }
        })
    } catch (error) {
        res.send("ERROR:", error)
    }
});


app.get
