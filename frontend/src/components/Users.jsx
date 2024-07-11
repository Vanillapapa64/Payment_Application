
import { useEffect, useState,  } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export const Users=()=>{
    const [users,setusers]=useState([])
    const [filter,setfilter]=useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(response=>setusers(response.data.users))
        
    },[filter])
    
    return(
        <div className="p-10 grid gap-5">
            <div className="text-4xl">Users</div>
            <div ><input className="border-black border-2 rounded-lg w-full h-9 " onChange={(e)=>{setfilter(e.target.value)}}></input></div>
            <div>{users.map(user=><User user={user} />)}</div>
        </div>
    )
}
function User({user}){
    const navigate=useNavigate()
    return(
        <div className=" grid grid-cols-10 gap-16 pt-8 pb-8">
            <div className=" grid col-span-2 rounded-full border-2 size-14 flex items-center text-center ">{user.firstname[0]}</div>
            <div className="grid col-span-5 flex items-center text-2xl">{user.firstname} {user.lastname}</div>
            <button className="grid col-span-3 flex items-center bg-gray-700 w-full rounded-lg text-white bg-black h-14" onClick={(e)=>{
                navigate('/send?id='+user._id+"&name="+user.firstname)
            }}>Transfer money</button>
        </div>
    )
}