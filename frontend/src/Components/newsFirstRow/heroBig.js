import { useNewsList } from "../../Hooks/useNewsList"
import {
    Link
} from "react-router-dom";
import Title from "./titleGrid";

export default function HeroBig() {
    const { newsList, isLoading, isError } = useNewsList();
    return (
        <div
            className={`rounded-xl md:col-span-6 h-auto md:h-full w-full transition-all bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-cover bg-center`}
            style={isLoading || isError ? {} : { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${newsList[0]['image']}")` }}>
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4 z-10">
                {
                    isLoading || isError
                        ?
                        <Title title={"Loading..."} />
                        :
                        <Link to={`/post/${newsList[0]['_id']['$oid']}`}><Title title={newsList[0]['title']} /></Link>
                }
            </div>
        </div>
    )
}
