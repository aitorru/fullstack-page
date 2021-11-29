import { useComments } from '../../Hooks/useComments';

export default function Comments({ id }) {
	// FIXME: Finish this
	// eslint-disable-next-line no-unused-vars
	const { comments, isLoading, isError } = useComments(id);

	return (
		<h1>Hola mundo</h1>
	);
}