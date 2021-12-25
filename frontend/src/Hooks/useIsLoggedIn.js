import useSWR from 'swr';
const fetcher = (...args) => fetch(...args, { credentials: 'include' }).then(res => res.json());
export function useIsLoggedIn() {
	const { data, error } = useSWR('/api/user', fetcher);

	return {
		isLoggedIn: data,
		isLoading: !error && !data,
		isError: error
	};
}
