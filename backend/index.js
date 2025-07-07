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

app.use(cors({ origin: "http://localhost:5173", credentials: true}));
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
                return res.status(201).json({ message: "Signup successful" ,
                    user: {
                        id: id,
                        name: name
                    }
                });

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
        connection.query(q, [email], (err,result)=>{
            if(err){
                console.log("ERROR OCCURED", err)
            }
            else{
                let user = result[0];
                if(!user){
                   return res.status(401).send("User Not Found")
                }
                // const match = bcrypt.compare(password, user.password)
                bcrypt.compare(password, user.password).then(match=>{
                    if(!match){
                        console.log("Wrong Credential")
                        return res.status(401).send("Invalid Password")
                    }
                    else{
                        console.log("User logged in Successfully")
                        // sending user data after login
                        return res.status(201).json({
                            message: "Login Successful", 
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }})
                }
                })

            }
        })
    } catch (error) {
        console.log("CATCH ERROR:", error)
    }
})


app.post("/api/createPost", (req,res)=>{
    let {content, user_id} = req.body;
    let q = "INSERT INTO THOUGHTS (ID, USER_ID, CONTENT) VALUES (?,?,?)";
    // this is content id
    let id = uuidv4()
    try {
        connection.query(q, [id,user_id,content], (err, result)=>{
            if(err){
                console.log("Error in inserting Thought:", err);
                res.status(500).json({message: "Failed to add Thought"})
            }
            else{
                console.log("Data Stored Successfully")
                res.status(201).json({message: "Thought created successfully"})
            }
        })
    } catch (error) { 

    }
})


app.get("/api/thoughts" , (req,res)=>{
    // res.send("hello")
    let q = `SELECT thoughts.content, thoughts.created_at, users.name 
            FROM thoughts 
            JOIN users ON thoughts.user_id = users.id
            ORDER BY thoughts.created_at DESC`;

    try {
        connection.query(q, (err,result)=>{
            if(err){
                console.log("Error to Display Thought")
                return res.status(500).json({message : "Failed to Fetch Thoughts"});
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


app.get("/api/profile/:userId", (req,res)=>{
    let {userId} = req.params;
    let q = `SELECT thoughts.content, thoughts.created_at, users.name 
            FROM thoughts 
            JOIN users ON thoughts.user_id = users.id 
            WHERE users.id = ?`

    try {
        connection.query(q, [userId], (err, result)=>{
            console.log(result)
            if(err){
                console.log("Failed to fetch Data", err)
                return res.status(500).json({message:"Failed"})
            }
            else{
                console.log("Your Posts are fetched")
                return res.status(200).json(result)
            }
        } )
    } catch (error) {
        console.log("Error: ", error)
    }
})



