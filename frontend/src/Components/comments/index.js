import { useRef } from 'react';
import { mutate } from 'swr';
import { useComments } from '../../Hooks/useComments';
import { getCookie } from '../../utils/utils';
import MainButton from '../button';

export default function Comments({ id }) {
	const { comments, isLoading, isError } = useComments(id);

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
		fetch('http://localhost/api/comment',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-TOKEN': getCookie('csrf_access_token'),
				},
				body: JSON.stringify(body),
				credentials: 'include'
			}
		).then(() => mutate(`http://localhost/api/comments/${id}`));
	};

	return (
		<>
			<input type="text"
				ref={commentText}
				className="placeholder-gray-500 placeholder-opacity-50 bg-gray-100 rounded-xl py-3 px-4 border border-gray-400 focus:border-gray-700 w-full" />
			<MainButton text="Comentar" className="w-full mt-5" onClick={uploadComment} />
			{isLoading || isError 
				?
				null
				:
				comments.map((comment) => <div key={comment['_id']['$oid']}><h1>{comment['username']}</h1><h1>{comment['comment']}</h1></div>)
			}
		</>
	);
}