import React from 'react';
import Header from '../Components/header';

const LoginForm = React.lazy(() => import('../Components/loginForm'));

export default function Login() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<LoginForm />
		</div>
	);
}