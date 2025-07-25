import { useState } from "react"
import "../style/Auth.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Login(){

    const navigate = useNavigate();
    
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

    let handleSubmit = async (event)=>{
        event.preventDefault();
        console.log(loginData)
        setLoginData({
            email: "",
            password: ""
        })

        try {
            const res = await axios.post("http://localhost:3000/api/login", loginData);
            if(res.status === 201){

                // UserId Stored in localStorage and can be used anywhere now. For example see CreatePost page
                localStorage.setItem("userId", res.data.user.id);
                localStorage.setItem("userName",  res.data.user.name)
                navigate("/home")
            }
            

        } catch (error) {
            if(error.response && error.response.status === 401){
                
                alert("Invalid Credentials")
            }
            else{
                alert("Something Went Wrong. Please Try Again Later")
            }
        }
    }


    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <form>
                    <h1 style={{textAlign:"center"}}>Login</h1>
                    <br />
                    <div className="inputs">
                        <label htmlFor="email">Email: </label>
                        <input type="text" placeholder="Enter email" name="email" id="email" value={loginData.email} onChange={handleChange}/>
                    </div>
                    <br />
                    <div className="inputs">
                        <label htmlFor="password">Password: </label>
                        <input type="text" placeholder="Enter Password" name="password" id="password" value={loginData.password} onChange={handleChange}/>
                    </div>
                    <br />

                    <div className="auth-btns">
                        <button onClick={handleSubmit}>Login</button>
                        <Link to="/"><button>New User?</button></Link>
                    </div>
                </form>
                
            </div>
        </div>
    )
}