import { useState } from "react"
import "../style/CreatePost.css"
import axios from "axios"

export default function CreatePost(){

    let [content, setContent] = useState("")

    let handleChange = (event)=>{
        setContent(event.target.value)
    }

    let handleSubmit = async (event)=>{
        event.preventDefault();
        setContent("")

        try {
            const res = await axios.post("http://localhost:3000/api/createPost", {content})
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
            </form>
        </div>
    )

}