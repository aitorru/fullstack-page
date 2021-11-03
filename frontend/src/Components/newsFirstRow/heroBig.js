import { useNewsList } from "../../Hooks/useNewsList"
import {
    Link
} from "react-router-dom";
import Title from "./titleGrid";

export default function HeroBig() {
    const { newsList, isLoading } = useNewsList();
    return (
        <div className="rounded-xl md:col-span-6 h-auto md:h-full w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            style={isLoading ? { width: 10 } : { backgroundImage: `url(${newsList[0]['image']})` }}>
            {
                isLoading
                    ?
                    <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                        {isLoading ?
                            <Title title={"Loading..."} />
                            :
                            <Link to={`/post/${newsList[0]['_id']['$oid']}`}><Title title={newsList[0]['title']} /></Link>}
                    </div>
                    :
                    <img alt="decorative" src={`${newsList[0]['image']}`}>
                        <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                            <Link to={`/post/${newsList[0]['_id']['$oid']}`}><Title title={newsList[0]['title']} /></Link>
                        </div>
                    </img>
            }
        </div>
    )
}
