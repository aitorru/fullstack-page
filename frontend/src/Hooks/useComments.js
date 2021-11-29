import useSWR from 'swr';

export function useComments(id) {
	const { data, error } = useSWR(`http://localhost/api/comments/${id}`);

	return {
		comments: data,
		isLoading: !error && !data,
		isError: error
	};
}