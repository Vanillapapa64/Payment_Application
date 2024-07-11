import { useRecoilValue } from "recoil"
import { usernamestate } from "../../store/atoms"
import { Button } from "../components/Button"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"

export function Send(){
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const username=searchParams.get("name");
    const [amount,setamount]=useState(0)
    
    
    return(
        <div id="full" className="w-screen bg-zinc-200 h-screen flex justify-center items-center">
            <div id="wrapper " className=" rounded-xl shadow-lg bg-white w-8/12 h-3/6">
                
                <div id="send money" className="text-center text-3xl font-semibold pb-6 pt-6">
                    Send Money
                </div>
                <div id="lower component" className="p-6">
                    <div id="name" className="flex">
                        <div className="border-2 bg-gray-700 text-white border-black rounded-full size-10 justify-center flex items-center text-xl font-medium">{username.split("")[0]}</div>
                        <div className="flex items-center pl-4 text-xl">{username}</div>
                    </div>
                    <div id="input box" className="pt-4" >
                        <div>Amount (in $)</div>
                        <div className=" rounded-md shadow-lg h-10"><input className="bg-slate-100 w-full h-full" onChange={(e)=>{
                            setamount(e.target.value)
                        }}></input></div>
                    </div>
                    <div id="button" className="justify items"><Button text={"Inititate Transfer"} onclick={()=>{
                        axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to: id,
                            amount
                        },{
                            headers:{
                                Authorization:"Bearer "+ localStorage.getItem("token")
                            }
                        })
                    }}/></div>
                </div>
                
            </div>
        </div>
    )
}