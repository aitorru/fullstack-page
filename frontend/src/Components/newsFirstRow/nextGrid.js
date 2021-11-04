import { Link } from "react-router-dom";
import Title from "./titleGrid";

export default function NextGrid({ title, to, image }) {
    return (
        <div className="rounded-xl md:col-span-10 h-auto md:h-full w-full transition-all bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${image}")` }}>
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                <Link to={`/post/${to}`}><Title title={title} /></Link>
            </div>
        </div>
    )
}