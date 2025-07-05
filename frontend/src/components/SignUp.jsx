import { useState } from "react"
import "../style/SignUp.css"
import axios from "axios";
export default function SignUp(){

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
        console.log(data)
        setData({
            name:"",
            email:"",
            password:""
        })

        try {
            const res = axios.post("http://localhost:3000/api/signup",data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="signUp-form-container">
            <form >
                <label htmlFor="name">Name: </label>
                <input type="text" placeholder="Enter Name" id="name" name="name" value={data.name} onChange={handleChange}/>
                <br />
                <label htmlFor="email">Email: </label>
                <input type="email" placeholder="Enter Email" id="email" name="email" value={data.email} onChange={handleChange}/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="Enter Password" id="password" name="password" value={data.password} onChange={handleChange}/>
                <br />
                <button onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
        
    )
}