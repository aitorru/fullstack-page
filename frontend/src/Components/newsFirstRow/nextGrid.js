import { Link } from "react-router-dom";
import Title from "./titleGrid";

export default function NextGrid({ title, to }) {
    return (
        <div className="rounded-xl h-auto md:h-36 md:col-span-10 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                <Link to={`/post/${to}`}><Title title={title} /></Link>
            </div>
        </div>
    )
}