import { useRecoilValue } from "recoil";
import { Appbar } from "../components/Appbar";
import axios from "axios"
import { usernamestate } from "../../store/atoms";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    const username=useRecoilValue(usernamestate)
    return(

        <div>
        
        <Appbar username={username} />
        <Balance />
        <Users />
        </div>
    )
}