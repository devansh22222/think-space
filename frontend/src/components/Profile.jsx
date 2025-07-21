import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../style/Profile.css"
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
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div className="profile-container">
                <div style={{width:"30%",display:"flex", justifyContent: "space-between", alignItems:"center"}}><h1 style={{textAlign:"center"}}>Your Posts</h1> <Link to={"/home"}> <button>Home</button> </Link></div>
                <br />
                
                {
                    postToggle ? <Link to="/createPost"><button>Write your first post</button></Link> : null
                }
                {thoughts.map((t,index)=>{
                    return <div key={index} className="profile-thought-cards">
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <p style={{fontWeight:"700"}}>{t.name}</p>
                                    <p>{new Date(t.created_at).toLocaleString()}</p>
                                </div>
                                 <hr />
                                <div style={{height:"8rem"}}>{t.content}</div>
                                <hr />
                                <div><button onClick={()=>handleDelete(t.id)}>Delete</button>  <button onClick={()=>handleEdit(t.id)}>Edit</button></div>
                            </div>
                })}
                
            </div>
        </div>

    )
}