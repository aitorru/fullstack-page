import { Link } from "react-router-dom";

export default function HeroGrid({ title, to, image }) {

    return (
        <div className="rounded-xl md:col-span-6 h-auto md:h-full w-full transition-all bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${image}")` }}>
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                <Link to={`/post/${to}`}>{heroGridCustomTitle(title)}</Link>
            </div>
        </div>
    )
}


function heroGridCustomTitle(title) {
    return <h1 className="text-xl md:text-1xl lg:text-2xl xl:text-3xl text-white font-bold break-words">{title}</h1>;
}

