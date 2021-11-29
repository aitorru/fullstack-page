import useSWR from 'swr';

export function useFullNewsList(query) {
	const fetchWithQuery = (url, query) => fetch(url, { headers: { query: query } }).then(r => r.json());
	const { data, error } = useSWR(['http://localhost/api/news_list', query], fetchWithQuery);

	return {
		fullNewsList: data,
		isLoading: !error && !data,
		isError: error
	};
}
