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
                    {
                        isLoading
                            ?
                            <h1 className="text-3xl text-center py-5">Loading...</h1>
                            :
                            <>
                                <h1 className="text-4xl md:text-7xl text-center py-5 font-bold">{post['title']}</h1>
                                <div className="flex w-full justify-center">
                                    <img alt={post['title']} className="my-1 w-11/12 md:w-4/6 lg:w-1/2" src={post['image']} />

                                </div>
                                <div className="flex flex-col text-justify py-3 px-3 md:px-0 text-xl dangerouslySetInnerHTML" dangerouslySetInnerHTML={{ __html: post['body'] }} />
                            </>
                    }
                </div>
            </div>
        </>

    )
}