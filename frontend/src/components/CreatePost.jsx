import { useState } from "react"
import "../style/CreatePost.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function CreatePost(){

    const navigate = useNavigate();

    let [content, setContent] = useState("")

    let handleChange = (event)=>{
        setContent(event.target.value)
    }

    let handleSubmit = async (event)=>{
        event.preventDefault();
        setContent("")
        
        // Using userId which stored using Login. For more info go to Login component
        const userId = localStorage.getItem("userId")
        console.log(userId)
        try {
            const res = await axios.post("http://localhost:3000/api/createPost", {content , user_id:userId})
            if(res.status === 201){
                navigate("/home")
            }
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="post-form-container">
            <form>
                <label htmlFor="content">Content: </label>
                <textarea name="content" id="content" rows={10} cols={35} placeholder="Enter Your Thought" value={content} onChange={handleChange}></textarea>
                <br />
                <button onClick={handleSubmit}>Post</button>
                <Link to="/home"><button>Home</button></Link>
            </form>
        </div>
    )

}