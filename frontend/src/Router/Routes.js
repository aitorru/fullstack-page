import React, { Suspense } from 'react';
import {
	Switch,
	Route,
	Link
} from 'react-router-dom';
const App = React.lazy(() => import('../Pages'));
const MoreNews = React.lazy(() => import('../Pages/moreNews'));
const Post = React.lazy(() => import('../Pages/post'));
const Login = React.lazy(() => import('../Pages/login'));
const Register = React.lazy(() => import('../Pages/register'));

export default function CustomRouter() {
	return (
		<Switch>
			<Route exact path="/">
				<Suspense fallback={<div>Loading...</div>}>
					<App />
				</Suspense>
			</Route>
			<Route path="/masNoticias">
				<Suspense fallback={<div>Loading...</div>}>
					<MoreNews />
				</Suspense>
			</Route>
			<Route path="/post/:id">
				<Suspense fallback={<div>Loading...</div>}>
					<Post />
				</Suspense>
			</Route>
			<Route path="/login">
				<Suspense fallback={<div>Loading...</div>}>
					<Login />
				</Suspense>
			</Route>
			<Route path="/register">
				<Suspense fallback={<div>Loading...</div>}>
					<Register />
				</Suspense>
			</Route>
			<Route path="/*">
				<div className="min-h-screen min-w-screen flex align-middle justify-center items-center justify-items-center text-center text-3xl">No hemos encontrado la pagina que necesitas.<Link to="/"><span className="text-indigo-500 hover:underline"> ¿Quieres volver a casa?</span></Link></div>
			</Route>
		</Switch>
	);
}