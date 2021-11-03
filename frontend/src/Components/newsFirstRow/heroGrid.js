import { Link } from "react-router-dom";

export default function HeroGrid({ title, to }) {

    return (
        <div className="rounded-xl h-auto md:h-36 w-full max-w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                <Link to={`/post/${to}`}>{heroGridCustomTitle(title)}</Link>
            </div>
        </div>
    )
}


function heroGridCustomTitle(title) {
    return <h1 className="text-xl md:text-3xl text-white font-bold break-words">{title}</h1>;
}

