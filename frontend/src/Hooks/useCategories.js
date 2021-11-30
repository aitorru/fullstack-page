import useSWR from 'swr';

export function useCategories() {
	const { data, error } = useSWR('/api/get_categories');

	return {
		categories: data,
		isLoading: !error && !data,
		isError: error
	};
}
