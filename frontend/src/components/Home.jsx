import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom"
import "../style/Home.css"



export default function Home(){

    const userName = localStorage.getItem("userName")

    let [thoughts, setThought] = useState([]);

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
        <div>
            <h1>Home Page</h1>
            <h2>Welcome {userName}</h2> 
            <Link to="/profile" ><button>Profile</button></Link> &nbsp;
            <Link to="/"><button>Logout</button></Link> &nbsp;
            <Link to="/createPost"><button>Create Post</button></Link> &nbsp;
            <h3>Thought Feed</h3>
            {
                thoughts.map((t,index)=>{
                    return <div key={index} className="thought-card">
                        <p>{t.name}</p>
                        <p>{t.content}</p>
                        <p>{new Date(t.created_at).toLocaleString()}</p>
                    </div>
                })
            }

        </div>
    )
}