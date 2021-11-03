import { Link } from "react-router-dom";

export default function NextGrid({ title, to }) {
    return (
        <div className="rounded-xl h-36 md:col-span-10 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 truncate">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4 truncate">
                <Link to={`/post/${to}`}><h1 className="text-md md:text-4xl text-white font-bold truncate">{title}</h1></Link>
            </div>
        </div>
    )
}