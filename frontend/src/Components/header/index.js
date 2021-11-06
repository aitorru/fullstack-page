import {
    Link
} from "react-router-dom";
import MainButton from "../button";

export default function Header() {
    return (
        <div className='w-full border-b-2 shadow-md'>
            <div className='md:container md:mx-auto'>
                <div className='flex align-middle items-center h-20 px-2 md:py-0'>
                    <div className='flex-grow-0'>
                        <Link to="/"><h1 className='text-center text-4xl md:text-5xl lg:text-6xl font-extrabold'>Midunews</h1></Link>
                    </div>
                    <div className='flex-grow' />
                    <div className='flex-grow-0'>
                        <Link to="/masNoticias"><MainButton className="w-auto px-1 md:px-4 text-sm md:text-base lg:text-xl" text="Buscar mas noticias" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 