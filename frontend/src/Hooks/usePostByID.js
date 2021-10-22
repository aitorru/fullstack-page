import useSWR from "swr";
import { hostname, protol } from '../utils/const';

export function usePostByID(id) {
    const { data, error } = useSWR(`${protol}//${hostname}:5000/api/post/${id}`)

    return {
        post: data,
        isLoading: !error && !data,
        isError: error
    }
}