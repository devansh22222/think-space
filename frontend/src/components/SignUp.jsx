import { useState } from "react"
import "../style/Auth.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function SignUp(){

    const navigate = useNavigate();

    let [data,setData] = useState({
        name: "",
        email:"",
        password:""
    })

    let handleChange = (event)=>{
        let newValue = event.target.value
        let fieldName = event.target.name

        setData((curr)=>{
            return {...curr, [fieldName]: newValue}
        })
    }

    let handleSubmit = async (event)=>{
        event.preventDefault();
        if (!data.name || !data.email || !data.password) {
        alert("Please fill all the fields.");
        return;
        }
        console.log(data)
        setData({
            name:"",
            email:"",
            password:""
        })

        try {
            const res = await axios.post("http://localhost:3000/api/signup",data);
            if(res.status === 201){
                localStorage.setItem("userId", res.data.user.id);
                localStorage.setItem("userName", res.data.user.name);
                navigate("/home")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <form >
                    <h1 style={{textAlign:"center"}}>Sign up</h1>
                    <div className="inputs">
                        <label htmlFor="name">Name: </label>
                        <input type="text" placeholder="Enter Name" id="name" name="name" value={data.name} onChange={handleChange}/>
                    </div>
                    <br />
                    <div className="inputs">
                        <label htmlFor="email">Email: </label>
                        <input type="email" placeholder="Enter Email" id="email" name="email" value={data.email} onChange={handleChange}/>
                    </div>
                    <br />
                    <div className="inputs">
                        <label htmlFor="password">Password: </label>
                        <input type="password" placeholder="Enter Password" id="password" name="password" value={data.password} onChange={handleChange}/>
                    </div>
                    <br />

                    <div className="auth-btns">
                    <button onClick={handleSubmit}>Sign Up</button>
                    <Link to="/login"><button>Already a User?</button></Link>
                    </div>
            </form>
            </div>
        </div>
        
    )
}