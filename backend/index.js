require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


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
        console.log("Failed to connect to Database",err)
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


// SignUp Route 
app.post("/api/signup", async (req,res)=>{
    const {name, email, password} = req.body;
    let hashedPassword = await bcrypt.hash(password, 10)
    let id = uuidv4();
    
    let q = "INSERT INTO USERS (ID, NAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)";
    try {
        connection.query(q, [id,name, email, hashedPassword], (err,result)=>{
            if(err){
                console.log("Failed to Store data");
            }
            else{
                console.log("User Created Successfully")
                res.send("USer created succefully")
            }
        })
    } catch (error) {
        console.log(error)
    }
})


// Login Route
app.post("/api/login", (req,res)=>{
    let {email, password} = req.body;

    let q = "SELECT * FROM USERS WHERE EMAIL = ?"

    try {
        connection.query(q, [email], async (err,result)=>{
            if(err){
                console.log(err)
            }
            const user = result[0];
            const match = await bcrypt.compare(password, user.password)

            if(match){
                console.log("USer logged In successfully")
            }
            else{
                console.log("Wrong credentials")
            }
        })
    } catch (error) {
        console.log(error)
    }
    
})
