import { useComments } from '../../Hooks/useComments';
import MainButton from '../button';

export default function Comments({ id }) {
	// FIXME: Finish this
	// eslint-disable-next-line no-unused-vars
	const { comments, isLoading, isError } = useComments(id);

	return (
		<>
			<input type="text"
				className="placeholder-gray-500 placeholder-opacity-50 bg-gray-100 rounded-xl py-3 px-4 border border-gray-400 focus:border-gray-700 w-full" />
			<MainButton text="Comentar" className="w-full mt-5"/>
		</>
	);
}