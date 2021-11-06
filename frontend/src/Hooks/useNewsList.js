import useSWR from "swr";
import { hostname, protol } from '../utils/const';

export function useNewsList() {
    const { data, error } = useSWR(`${protol}//${hostname}:5000/api/news_list_limit_10`)

    return {
        newsList: data,
        isLoading: !error && !data,
        isError: error
    }
}
