import React, { Suspense } from "react";
import { useNewsList } from "../../Hooks/useNewsList";
import Title from "../newsFirstRow/titleGrid";
const NewsFirstRow = React.lazy(() => import("../newsFirstRow"))
const NextGrid = React.lazy(() => import("../newsFirstRow/nextGrid"))

export default function News() {
    const { newsList, isLoading } = useNewsList();

    return (
        <div className="w-full md:container md:mx-auto py-2 px-2 md:px-0">
            <div className='md:p-3 grid grid-cols-1 md:grid-cols-10 w-full gap-4'>
                <Suspense fallback={<div>Loading...</div>}>
                    <NewsFirstRow />
                </Suspense>
                {
                    isLoading
                        ?
                        <>
                        </>
                        :
                        newsList.slice(4)?.map((index) => {
                            return <Suspense key={index['_id']['$oid']} fallback={<LoadingNextGrid />}><NextGrid to={index['_id']['$oid']} key={index['_id']['$oid']} title={index['title']} /></Suspense>
                        })
                }
            </div>
        </div>
    )
}

function LoadingNextGrid() {
    return (
        <div className="rounded-xl md:col-span-10 h-36 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                <Title title={"Loading..."} />
            </div>
        </div>
    )
}