export default function NextGrid({ title }) {
    return (
        <div className="rounded-xl h-36 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="flex w-full h-full align-bottom flex-col justify-end p-4">
                <h1 className="text-4xl text-white font-bold">{title}</h1>
            </div>
        </div>
    )
}