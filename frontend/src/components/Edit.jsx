import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function Edit() {
    let {id} = useParams();
    let [content, setContent] = useState("")
    let navigate = useNavigate();





    useEffect(()=>{
        let fetchPost = async () =>{
        try {
           const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
            setContent(res.data.CONTENT);
            console.log(res.data)
        } catch (error) {
            console.log("Error in fetching post to edit",error)
        }
    }
        fetchPost();
    },[id])

    const handleUpdate = async ()=>{
        try {
            await axios.put(`http://localhost:3000/api/posts/${id}`, {content})
            navigate("/profile")
        } catch (error) {
            console.log("Failed to update the post")
        }
    }
    
    return (
        <div>
            <h2>Edit Post</h2>
            <textarea rows={20} cols={50} name="content" id="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
                <br /><br />
            <button onClick={handleUpdate}>Edit</button>
        </div>
        
    )
}