import useSWR from 'swr';

export function useNewsList() {
	const { data, error } = useSWR('http://localhost/api/news_list_limit_10');

	return {
		newsList: data,
		isLoading: !error && !data,
		isError: error
	};
}
