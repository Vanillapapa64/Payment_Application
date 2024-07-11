export function Inputbox({text,onchange}){
    return(
        <div className="col-span-1">
                    <div>{text}</div>
                    <div><input onChange={onchange} className="rounded-lg p-4 w-full h-10 border-2 border-black shadow-sm" ></input></div>
        </div>
    )
}