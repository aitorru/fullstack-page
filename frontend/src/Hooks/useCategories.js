import useSWR from "swr";

export function useCategories() {
    const { data, error } = useSWR(`http://localhost/api/get_categories`)

    return {
        categories: data,
        isLoading: !error && !data,
        isError: error
    }
}
