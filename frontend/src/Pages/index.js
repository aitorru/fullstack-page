import { useEffect } from 'react';
import {
    Link
} from "react-router-dom";
import { hostname, protol } from '../utils/const';

function App() {

    useEffect(() => {
        console.log(window.location)
        fetch(`${protol}//${hostname}:5000/api/hello`)
            .then(data => {
                data.json()
                    .then(json => {
                        console.log(json);
                    })
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="container mx-auto">
            <h1 className='flex-1 text-lg text-center'>Hola mundo</h1>
            <Link to="/login">Go to login</Link>
        </div>
    );
}

export default App;
