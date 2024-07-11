import { Heading } from '../components/Heading'
import { Inputbox } from '../components/Inputbox'
import {Subhead} from '../components/Subheading'
import { Button } from '../components/Button'
import { Warning } from '../components/Warning'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { passwordstate, usernamestate } from '../../store/atoms'
export default function Signin(){
    const [username,setusername]=useRecoilState(usernamestate);
    const [password,setpassword]=useRecoilState(passwordstate)
    const navigate=useNavigate()
    return(
        <div className="bg-neutral-500 w-screen h-screen flex justify-center items-center">
            <div className="bg-slate-50 border-2 border-black w-5/12 h-2/3 rounded-xl">
                <Heading heading={"Sign In"} />
                <Subhead subhead={"Welcome Back!"}/>
                <div id="inputs" className="grid grid-cols-1 pt-5 gap-5 pl-7 pr-7">
                    <Inputbox text={"Email"} onchange={(e)=>{
                        setusername(e.target.value)
                    }
                    } />
                    <Inputbox text={"Password"} onchange={(e)=>{
                        setpassword(e.target.value)
                    }}/>
                </div>
                <Button text={"Sign In"} onclick={async()=>{
                    const response=await axios.post("http://localhost:3000/api/v1/user/signin" ,{
                        username,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    console.log("signed in")
                    navigate('/dashboard')
                }}/>
                <Warning task={"Sign Up"} path={"signup"} text={"Don't have an Account?"}/>
            </div>
        </div>
    )
}
