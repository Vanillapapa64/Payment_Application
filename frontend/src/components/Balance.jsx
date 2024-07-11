import { useRecoilValue } from "recoil";
import { usernamestate } from "../../store/atoms";
import axios from "axios";
import { useEffect,useState } from "react";

export function Balance(){
    const [balance,setbalance]=useState(null)
    const [err,seterr]=useState(null)
    const [loading,setloading]=useState(null)
    console.log('before effect')
    useEffect(()=>{
        const fetchbalance=async()=>{
            try{
                console.log("inside effect")
                const response= await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers:{
                        Authorization:"Bearer "+ localStorage.getItem("token")
                    }
                })
                console.log("after req")
                setbalance(response.data.balance)
                // console.log(response.data.balance)
                setloading(false)
            } catch(err){
                console.log("error")
                seterr(err.message)
                setloading(false)
            }
            
        }
        fetchbalance()
    },[])
    console.log(localStorage.getItem("token"))
    
    if(err){
        return(
            <div>Error</div>
        )
    }
    if(loading){
        return(
            <div> Loading ....</div>
        )
        
    }
    
    return(
        <div className="flex justify-between p-8 text-3xl">
            <div className="">Your Balance </div>
            <div>
                ${Math.round(balance*100)/100}
            </div>
        </div>
        
    )
}