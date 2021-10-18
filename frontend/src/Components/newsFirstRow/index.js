import HeroBig from "./heroBig";

export default function NewsFirstRow() {
    return (
        <>
            <HeroBig />
            <div className="grid grid-rows-3 gap-4 md:col-span-2">
                <div className="rounded-xl h-36 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                </div>
                <div className="rounded-xl  h-36 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">

                </div>
                <div className="rounded-xl  h-36 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">

                </div>
            </div>


        </>
    )
}