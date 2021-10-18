import React, { Suspense } from "react";
const NewsFirstRow = React.lazy(() => import("../newsFirstRow"))


export default function News() {
    return (
        <div className="w-full md:container md:mx-auto">
            <div className='md:p-3 grid grid-cols-1 md:grid-cols-10 w-full gap-4'>
                <Suspense fallback={<div>Loading...</div>}>
                    <NewsFirstRow />
                </Suspense>
            </div>
        </div>
    )
}