import { useNewsList } from "../../Hooks/useNewsList"

export default function HeroBig() {
    const { newsList, isLoading } = useNewsList();
    return (
        <div className="rounded-xl md:col-span-8 h-36 md:h-96 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex">
                {isLoading ? <h1>Loading...</h1> : <h1>Done</h1>}
            </div>
        </div>
    )
}
