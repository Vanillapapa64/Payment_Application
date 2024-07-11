import { Heading } from '../components/Heading'
import { Inputbox } from '../components/Inputbox'
import {Subhead} from '../components/Subheading'
import { Button } from '../components/Button'
import { Warning } from '../components/Warning'
import { useState } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { firstnamestate, lastnamestate, passwordstate, usernamestate } from '../../store/atoms'
import { useNavigate } from 'react-router-dom'
export default function Signup(){
    const [username,setusername]=useRecoilState(usernamestate);
    const [password,setpassword]=useRecoilState(passwordstate)
    const [firstname,setfirstname]=useRecoilState(firstnamestate);
    const [lastname,setlastname]=useRecoilState(lastnamestate)
    const navigate=useNavigate()
    return(
        <div className="bg-neutral-500 w-screen h-screen flex justify-center items-center">
            <div className="bg-slate-50 border-2 border-black w-5/12 h-3/4 rounded-xl">
                <Heading heading={"Sign up"} />
                <Subhead subhead={"Enter your information to create an Account"}/>
                <div id="inputs" className="grid grid-cols-1 pt-5 gap-5 pl-7 pr-7">
                    <Inputbox text={"first name"} onchange={(e)=>{
                        setfirstname(e.target.value)
                        
                    }}/>
                    <Inputbox text={"Last name"} onchange={(e)=>{
                        setlastname(e.target.value)
                    }}/>
                    <Inputbox text={"Email"} onchange={(e)=>{
                        setusername(e.target.value)
                    }}/>
                    <Inputbox text={"Password"}onchange={(e)=>{
                        setpassword(e.target.value)
                    }}/>
                </div>
                <Button text={"Sign Up"} onclick={async ()=>{
                    const response= await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        firstname,
                        lastname,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    console.log(username)
                    navigate('/dashboard')
                }}/>
                <Warning task={"Sign in"} path={"signin"} text={"Already have an account?"}/>
            </div>
        </div>
    )
}