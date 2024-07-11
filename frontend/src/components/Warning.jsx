export function Warning({text,path,task}){
    return(
        <div id="login" className="text-center pt-7">
                    {text} <a className="text-blue-700 underline underline-offset-2" href={"/"+path}>
                        {task}
                    </a>
                </div>
    )
}