import axios from "axios";
import { useState } from "react";

export default function Profile(){

    let [thoughts, setThoughts] = useState([])

    const userId = localStorage.getItem("userId");

    const fetchUserPosts = async ()=>{
        try {
            const res = await axios.get(`http://localhost:3000/api/profile/${userId}`)
            setThoughts(res.data)
            console.log(thoughts)
        } catch (error) {
            console.log("Failed to get your Posts",error)
        }
        
    }
    fetchUserPosts()
    return (
        <div>
            <h1>Your Posts</h1>
            {/* <br />
            {thoughts.map((t,index)=>{
                <div key={index}>
                    {t.name}
                </div>
            })} */}
        </div>

    )
}