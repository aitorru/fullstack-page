import { useNewsList } from "../../Hooks/useNewsList"

export default function HeroBig() {
    const { newsList, isLoading } = useNewsList();
    return (
        <div className="rounded-xl md:col-span-8 h-36 md:h-full w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                {isLoading ?
                    <h1 className="text-4xl text-white font-bold">Loading...</h1>
                    :
                    <h1 className="text-4xl text-white font-bold">{newsList[0]['title']}</h1>}
            </div>
        </div>
    )
}
