import {
    Link
} from "react-router-dom";

export default function Login() {
    return (
        <div className='container mx-auto'>
            <h1 className='flex1 text-lg text-center'>Login</h1>
            <Link to="/">Go to index</Link>
        </div>
    )
}