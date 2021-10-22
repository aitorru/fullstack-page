import {
    useParams
} from "react-router-dom";
import Header from "../Components/header";
import { usePostByID } from "../Hooks/usePostByID";

export default function Post() {
    const { id } = useParams();
    const { post, isLoading } = usePostByID(id);
    return (
        <>
            <Header />
            <div className="md:container md:mx-auto">
                <div className="w-full flex-1">
                    <h1 className="text-3xl text-center py-5">{id}</h1>
                    {
                        isLoading
                            ?
                            <h1 className="text-3xl text-center py-5">Loading...</h1>
                            :
                            <>
                                <h1 className="text-7xl text-center py-5 font-bold">{post['title']}</h1>
                                <p style={{ whiteSpace: 'pre-line' }} className="text-justify py-3 px-10 text-xl">{post['body']}</p>
                            </>
                    }
                </div>
            </div>
        </>

    )
}