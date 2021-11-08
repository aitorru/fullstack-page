import { Link } from "react-router-dom";
import { useState } from "react"
import { useFullNewsList } from "../../Hooks/useFullNewsList"
import Title from "../newsFirstRow/titleGrid";

export default function FullNewsList() {
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }
    const { fullNewsList, isLoading, isError } = useFullNewsList(inputValue);
    return (
        <div className="md:container md:mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl w-full text-center p-4">Más noticias</h1>
            <div className="flex justify-center py-3">
                <input className="placeholder-gray-500 placeholder-opacity-50 rounded-3xl py-3 px-4 border border-indigo-500 focus:border-indigo-900 w-11/12"
                    type="text"
                    placeholder="Termino de busqueda..."
                    value={inputValue}
                    onChange={handleInputChange} />
            </div>
            <div className="pt-2 px-3 md:px-0 grid grid-flow-row gap-2 pb-3">
                {
                    isLoading || isError
                        ?
                        <h1>Loading...</h1>
                        :
                        fullNewsList.map((data) => {
                            return (
                                <div key={data['_id']['$oid']} className="rounded-xl h-auto md:h-full w-full transition-all bg-center bg-cover"
                                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${data['image']}")` }}>
                                    <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                                        <Link to={`/post/${data['_id']['$oid']}`}><Title title={data['title']} /></Link>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}