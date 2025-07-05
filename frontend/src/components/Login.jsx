import { useState } from "react"
import "../style/Login.css"
import axios from "axios";

export default function Login(){
    
    let [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    let handleChange = (event)=>{
        let fieldName = event.target.name;
        let newValue = event.target.value;

        setLoginData((curr)=>{
            return {...curr, [fieldName]: newValue}
        })
    }

    let handleSubmit = (event)=>{
        event.preventDefault();
        console.log(loginData)
        setLoginData({
            email: "",
            password: ""
        })

        try {
            const res = axios.post("http://localhost:3000/api/login", loginData)
        } catch (error) {
            console.log("Invalid Credentials")
        }
    }


    return (
        <div className="login-form-container">
            <form>
                <label htmlFor="email">Email: </label>
                <input type="text" placeholder="Enter email" name="email" id="email" value={loginData.email} onChange={handleChange}/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="text" placeholder="Enter Password" name="password" id="password" value={loginData.password} onChange={handleChange}/>
                <br />
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}