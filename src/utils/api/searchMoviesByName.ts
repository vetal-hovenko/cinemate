import axios from "axios";
import { MovieSearch } from "../types/MovieSearch";
import { Movie } from "../types/Movie";

export const api = axios.create({
    baseURL: "http://www.omdbapi.com/",
    params: {
        apikey: "ba09bc9c",
    },
});

api.interceptors.response.use((response) => {
    if (response.data && typeof response.data === "object") {
        const transformToCamelCase = (data: any): any => {
            if (Array.isArray(data)) {
                return data.map(transformToCamelCase);
            } else if (data !== null && typeof data === "object") {
                const camelCaseData: { [key: string]: any } = {};

                for (const [key, value] of Object.entries(data)) {
                    const camelCaseKey =
                        key.charAt(0).toLowerCase() + key.slice(1);
                    camelCaseData[camelCaseKey] = transformToCamelCase(value);
                }

                return camelCaseData;
            }

            return data;
        };

        response.data = transformToCamelCase(response.data);
    }

    return response;
});

export async function getMovieByName(name: string): Promise<Movie | null> {
    if (!name.trim()) {
        return null;
    }

    try {
        const response = await api.get("", {
            params: {
                t: name,
            },
        });

        if (response.data.error) {
            return null;
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        throw new Error("Error fetching the movie.");
    }
}
export async function searchMoviesByName(
    name: string
): Promise<MovieSearch[] | null> {
    if (!name.trim()) {
        return null;
    }

    try {
        const response = await api.get("", {
            params: {
                s: name,
                page: 1,
            },
        });

        if (response.data.error) {
            return null;
        }

        return response.data.search;
    } catch (error) {
        console.error("Error fetching movie:", error);
        throw new Error("Error fetching the movie.");
    }
}
