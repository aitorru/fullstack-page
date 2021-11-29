import React from 'react';
import Header from '../Components/header';
const RegisterForm = React.lazy(() => import('../Components/registerForm'));


export default function Register() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<RegisterForm />
		</div>
	);
}