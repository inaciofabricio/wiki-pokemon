import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
});

export default function useApi(url) {

    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        api.get(url)
            .then(response => {
                setData(response.data);
            })
            .catch((err) => {
                const { data: message, status } = err.response;
                setError({ message, status });
            })
            .finally(() => {
                setIsFetching(false);
            });

    }, [url]);

    return { data, error, isFetching };
}