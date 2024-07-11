export function Appbar({username}){
    return(
        <div className="flex justify-between border-b-2 border-slate-500 shadow-lg h-16">
            <div className="p-3 flex items-end text-4xl">
                Payments App
            </div>
            <div className="flex">
                <div className="pr-6 pb-3 font-medium flex items-end">Hello {username}</div>
                <a href="/signin"><div className="border-2 rounded-full size-14 flex justify-center items-center text-4xl pb-2 bg-stone-300 font-light">{username.split("")[0]}</div></a>
            </div>
        </div>
    )
}