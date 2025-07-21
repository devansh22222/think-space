import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom"
import "../style/Home.css"



export default function Home(){

    const userName = localStorage.getItem("userName")

    let [thoughts, setThought] = useState([]);
    let [likedPosts, setLikedPosts] = useState({});

    let handleLike = async (thoughtId) =>{
        const userId = localStorage.getItem("userId");
        setLikedPosts((prev)=>({
            ...prev, 
            [thoughtId]: !prev[thoughtId]

        }))

        try {
            await axios.post("http://localhost:3000/api/likes", {user_id: userId, thought_id: thoughtId});
            const res = await axios.get(`http://localhost:3000/api/thoughts`)
            setThought(res.data);

        } catch (error) {
            console.log("ERROR in LIKE", error)
        }
    }

    useEffect(()=>{
        const fetchThoughts = async ()=>{
            try {
                const res = await axios.get("http://localhost:3000/api/thoughts");
                setThought(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchThoughts()
    },[])

    return (
        <div className="home-page">
            <div className="nav-bar">
                <div>
                    <h1 style={{color:"#646cff", textShadow:"0px 0px 2px #646cff"}}>ThinkSpace</h1>
                </div>
                <div className="home-btns">
                    <Link to="/"><button>Logout</button></Link> 
                    <Link to="/createPost"><button><i class="fa-solid fa-plus"></i> Create Post</button></Link>
                    <div style={{display:"flex", textDecoration:"none", }}><Link to="/profile" ><i class="fa-solid fa-user" ></i><p style={{margin:"0", padding:"0", boxSizing:"border-box"}}>{userName}</p></Link></div>
                </div>
            </div>
            
            <div>
                
                
                {
                    thoughts.map((t,index)=>{
                        return (
                        <div key={index} className="thought-card">
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <p style={{fontWeight:"700"}}>{t.name}</p>
                                <p>{new Date(t.created_at).toLocaleString()}</p>
                            </div>
                            <hr />
                            <div style={{height:"8rem"}}>{t.content}</div>
                            <hr />
                            <button onClick={()=>handleLike(t.id)}>Like</button>&nbsp;&nbsp;<span>{t.like_count}</span>
                        </div>
                        )
                    })
                }
            </div>

        </div>
    )
}