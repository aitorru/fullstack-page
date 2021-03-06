/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import {
	Link
} from 'react-router-dom';
import { mutate } from 'swr';
import { useIsLoggedIn } from '../../Hooks/useIsLoggedIn';
import MainButton from '../button';

export default function Header() {

	const [hoveringText, setHoveringText] = useState('Logged in');

	const mouseEnter = () => {
		setHoveringText('¿Cerrar sesión?');
	};
	const mouseLeave = () => {
		setHoveringText('Logged in');
	};
	const logout = () => {
		fetch('/api/logout', {
			method: 'GET',
			credentials: 'include'
		}).then(
			response => {
				if (response.status === 200) {
					mutate('/api/user');
				}
			}
		);
	};

	const { isLoggedIn, isLoading, isError } = useIsLoggedIn();

	return (
		<div className='w-full border-b-2 shadow-md bg-white'>
			<div className='md:container md:mx-auto'>
				<div className='flex align-middle items-center h-20 px-2 md:py-0'>
					<div className='flex-grow-0'>
						<Link to="/"><h1 className='text-center text-2xl md:text-5xl lg:text-6xl font-extrabold'>Midunews</h1></Link>
					</div>
					<div className='flex-grow' />
					{
						isLoading || isError
							?
							<div className="rounded-full bg-yellow-300 border-2 border-yellow-800 flex flex-row align-middle justify-center items-center pr-1">
								<h1 className="text-xs md:text-sm lg:text-base text-yellow-700 p-2 font-bold cursor-pointer">
									Loading...
								</h1>
								<span className="animate-pulse inline-flex rounded-full h-1 w-1 md:h-3 md:w-3 bg-yellow-700">
								</span>
							</div> 
							:
							isLoggedIn['loggedIn'] === true
								?
								<div className="flex-grow-0 w-auto pr-2 md:pr-5">
									<div className="rounded-full bg-green-300 border-2 border-green-800 flex flex-row align-middle justify-center items-center pr-1"
										onMouseEnter={mouseEnter}
										onMouseLeave={mouseLeave}
										onClick={logout}>
										<h1 className="text-xs md:text-sm lg:text-bas text-green-700 p-2 font-bold cursor-pointer">
											{hoveringText}
										</h1>
										<span className="animate-pulse inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-green-700">

										</span>
									</div>
								</div>
								:
								<div className="flex-grow-0 w-auto pr-2">
									<Link to="/login"><MainButton className="w-auto px-1 md:px-4 text-sm md:text-base lg:text-xl" text="Login" /></Link>
								</div>
					}
					<div className='flex-grow-0 w-auto'>
						<Link to="/masNoticias"><MainButton className="w-auto px-1 md:px-4 text-sm md:text-base lg:text-xl" text="Buscar mas noticias" /></Link>
					</div>
				</div>
			</div>
		</div>
	);
} 