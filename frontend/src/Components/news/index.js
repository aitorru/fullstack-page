import React, { Suspense } from "react";
import { useNewsList } from "../../Hooks/useNewsList";
const NewsFirstRow = React.lazy(() => import("../newsFirstRow"))
const NextGrid = React.lazy(() => import("../newsFirstRow/nextGrid"))

export default function News() {
    const { newsList, isLoading } = useNewsList();

    return (
        <div className="w-full md:container md:mx-auto">
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
                        newsList.slice(5)?.map((index) => {
                            return <Suspense fallback={LoadingNextGrid}><NextGrid title={index['title']} /></Suspense>
                        })
                }
            </div>
        </div>
    )
}

function LoadingNextGrid() {
    return (
        <div className="rounded-xl h-36 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                <h1 className="text-4xl text-white font-bold">Loading</h1>
            </div>
        </div>
    )
}