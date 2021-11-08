import useSWR from "swr";

export function usePostByID(id) {
    const { data, error } = useSWR(`/api/post/${id}`)

    return {
        post: data,
        isLoading: !error && !data,
        isError: error
    }
}