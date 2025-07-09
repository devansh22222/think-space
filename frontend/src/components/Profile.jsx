import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../style/Home.css"
import { Link, Links, useNavigate } from "react-router-dom";

export default function Profile(){

    let [thoughts, setThoughts] = useState([])
    let [postToggle, setPostToggle] = useState(false)
    let navigate = useNavigate();
  
    const userId = localStorage.getItem("userId");

    useEffect(()=>{
        const fetchUserPosts = async ()=>{
        try {
            const res = await axios.get(`http://localhost:3000/api/profile/${userId}`)
            if(res.data.length === 0){
                console.log("No posts to show")
                setPostToggle(true)
            }
            setThoughts(res.data)
        } catch (error) {
            console.log("Failed to get your Posts",error)
        }
        
    }
        fetchUserPosts()
    },[])

    let handleDelete = async (id)=>{
        try {
            await axios.post(`http://localhost:3000/api/profile/${id}/delete`);
            
            setThoughts(thoughts.filter((t)=> t.id !== id))
        } catch (error) {
            console.log("DELETE FAILED", error)
        }
    }

    let handleEdit = async (id)=>{
        navigate(`/edit/${id}`)
    }

    
    return (
        <div>
            <h1>Your Posts</h1>
            <br />
            {
                postToggle ? <Link to="/createPost"><button>Write your first post</button></Link> : null
            }
            {thoughts.map((t,index)=>{
                return <div key={index} className="thought-card">
                            <p>{t.created_at}</p>
                            <p>{t.name}</p>
                            <p>{t.content}</p>
                            <button onClick={()=>handleDelete(t.id)}>Delete</button>
                            <button onClick={()=>handleEdit(t.id)}>Edit</button>
                        </div>
            })}
            <Link to="/home"><button>Home</button></Link>
        </div>

    )
}