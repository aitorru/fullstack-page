import { Link } from "react-router-dom";

export default function HeroGrid({ title, to }) {

    return (
        <div className="rounded-xl h-36 w-full max-w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 truncate">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4 truncate">
                <Link to={`/post/${to}`}><h1 className="text-lg md:text-4xl text-white font-bold break-words truncate">{title}</h1></Link>
            </div>
        </div>
    )
}