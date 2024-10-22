import { MovieSearch } from "../types/MovieSearch";
import { apiConfig } from "./apiConfig";

export async function searchMoviesByName(
    name: string
): Promise<MovieSearch[] | null> {
    if (!name.trim()) {
        return null;
    }

    try {
        const response = await apiConfig.get("", {
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
