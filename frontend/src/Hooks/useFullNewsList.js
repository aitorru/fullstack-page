import useSWR from "swr";
import { hostname, protol } from '../utils/const';

export function useFullNewsList() {
    const { data, error } = useSWR(`${protol}//${hostname}:5000/api/news_list`)

    return {
        fullNewsList: data,
        isLoading: !error && !data,
        isError: error
    }
}
