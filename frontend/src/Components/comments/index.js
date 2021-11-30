import { useRef } from 'react';
import { mutate } from 'swr';
import { useComments } from '../../Hooks/useComments';
import { useIsLoggedIn } from '../../Hooks/useIsLoggedIn';
import { getCookie } from '../../utils/utils';
import MainButton from '../button';

export default function Comments({ id }) {
	const { comments, isLoading, isError } = useComments(id);
	const loginHook = useIsLoggedIn();


	const commentText = useRef(null);

	// Upload a comment and clear the input
	const uploadComment = () => {
		const body = {
			'postId': id,
			'comment': commentText.current?.value
		};
		commentText.current.value = '';

		/** You need to pass the X-CSRF-TOKEN.
		 * This is their way of protecting you from CSRF.
		 * See more: https://flask-jwt-extended.readthedocs.io/en/stable/token_locations/#cookies
		 * The basic idea is double submit. The same information goes on two diferent places to prevent unwanted modifications.
		 */
		fetch('/api/comment',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-TOKEN': getCookie('csrf_access_token'),
				},
				body: JSON.stringify(body),
				credentials: 'include'
			}
		).then(() => mutate(`/api/comments/${id}`));
	};

	return (
		<>
			<input type="text"
				ref={commentText}
				className="placeholder-gray-500 placeholder-opacity-50 bg-gray-100 rounded-xl py-3 px-4 border border-gray-400 focus:border-gray-700 w-full" />
			{loginHook.isLoading || loginHook.isError
				?
				null
				:
				loginHook.isLoggedIn['loggedIn'] === false
					? 
					<MainButton text="Haz login para comentar" className="w-full my-5 font-bold cursor-not-allowed" /> 
					:
					<MainButton text="Comentar" className="w-full my-5 font-bold" onClick={uploadComment} />
			}
			{isLoading || isError 
				?
				null
				:
				comments.map((comment) => {
					return <div className='m-5 p-3 hover:p-4 shadow-lg border-2 rounded-xl transform transition-all' key={comment['_id']['$oid']}>
						<h1 className='text-lg font-bold'>{comment['username']}, dice...</h1>
						<h1 className='mx-1 md:mx-5 text-justify'>{comment['comment']}</h1>
					</div>;
				})
			}
		</>
	);
}
