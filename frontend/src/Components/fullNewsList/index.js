import { Link } from "react-router-dom";
import { useFullNewsList } from "../../Hooks/useFullNewsList"
import Title from "../newsFirstRow/titleGrid";

export default function FullNewsList() {
    const { fullNewsList, isLoading, isError } = useFullNewsList();
    return (
        <div className="pt-2 px-3 md:px-0 md:container md:mx-auto grid grid-cols-1 gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl w-full text-center p-4">Más noticias</h1>
            {
                isLoading || isError
                    ?
                    <h1>Loading...</h1>
                    :
                    fullNewsList.map((data) => {
                        return (
                            <div key={data['_id']['$oid']} className="rounded-xl md:col-span-10 h-auto md:h-full w-full transition-all bg-center bg-cover"
                                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${data['image']}")` }}>
                                <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                                    <Link to={`/post/${data['_id']['$oid']}`}><Title title={data['title']} /></Link>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}