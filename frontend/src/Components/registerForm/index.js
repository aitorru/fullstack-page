import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MainButton from '../button';

export default function RegisterForm() {
	const history = useHistory();

	const usernameInput = useRef(null);
	const passwordInput = useRef(null);

	const loginBehaviour = () => {
		const payload = {
			'username': usernameInput.current?.value,
			'password': passwordInput.current?.value
		};
		fetch('http://localhost/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload),
			credentials: 'include'

		}).then((response) => {
			if (response.status === 200) {
				history.push('/');
			}
		});
	};

	return (
		<div className="min-h-full flex flex-auto align-middle justify-items-center items-center justify-center">
			<div
				className="grid grid-flow-row gap-2 md:p-11 md:shadow-lg md:bg-gray-50 md:rounded-xl align-middle justify-items-center items-center justify-center">
				<h1 className="text-4xl">Registro</h1>
				<h1 className="text-2xl">Username</h1>
				<input type="text"
					ref={usernameInput}
					className="placeholder-gray-500 placeholder-opacity-50 bg-gray-100 rounded-xl py-3 px-4 border border-gray-400 focus:border-gray-700" />
				<h1 className="text-2xl">Password</h1>
				<input type="password"
					ref={passwordInput}
					className="placeholder-gray-500 placeholder-opacity-50 bg-gray-100 rounded-xl py-3 px-4 border border-gray-400 focus:border-gray-700" />
				<MainButton text="Register" onClick={loginBehaviour} className="w-full" />
			</div>
		</div>
	);
}