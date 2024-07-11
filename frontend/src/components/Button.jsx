export function Button({text,onclick}){
    return(
        <div id="signupbutton" className="flex pl-7 pr-7 justify-center pt-10"><button onClick={onclick} className="bg-gray-700 w-full rounded-lg text-white bg-black h-14">{text}</button></div>
    )
}