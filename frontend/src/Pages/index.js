import {
    Link
} from "react-router-dom";
import { hostname, protol } from '../utils/const';
import useSWR from 'swr'


function App() {

    const { data, error } = useSWR(`${protol}//${hostname}:5000/api/hello`)

    const ServerResponse = () => {
        if (error) return <h1 className='flex-1 text-lg text-center'>Server error</h1>
        else if (!data) return <h1 className='flex-1 text-lg text-center'>Loading...</h1>
        return <h1 className='flex-1 text-lg text-center'>{data['payload']}</h1>
    }

    return (
        <div className="container mx-auto">
            <h1 className='flex-1 text-lg text-center'>Hola mundo</h1>
            <ServerResponse />
            <Link to="/login">Go to login</Link>
        </div>
    );
}

export default App;
