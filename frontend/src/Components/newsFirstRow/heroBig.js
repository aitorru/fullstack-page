import { useNewsList } from "../../Hooks/useNewsList"
import {
    Link
} from "react-router-dom";

export default function HeroBig() {
    const { newsList, isLoading } = useNewsList();
    return (
        <div className="rounded-xl md:col-span-8 h-36 md:h-full w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 truncate">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4 truncate">
                {isLoading ?
                    <h1 className="text-4xl text-white font-bold">Loading...</h1>
                    :
                    <Link to={`/post/${newsList[0]['_id']['$oid']}`}><h1 className="text-md md:text-4xl text-white font-bold truncate">{newsList[0]['title']}</h1></Link>}
            </div>
        </div>
    )
}
