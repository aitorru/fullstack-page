import {
    Link
} from "react-router-dom";
import MainButton from "../button";

export default function Header() {
    return (
        <div className='w-full border-b-2 shadow-md'>
            <div className='md:container md:mx-auto'>
                <div className='flex align-middle items-center h-20'>
                    <div className='flex-grow-0'>
                        <h1 className='text-center text-5xl font-extrabold'>Midunews</h1>
                    </div>
                    <div className='flex-grow' />
                    <div className='flex-grow-0'>
                        <Link to="/login"><MainButton text="Login" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 