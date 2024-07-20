import { apiConfig } from './apiConfig';
import { Movie } from "../types/Movie";

export async function getMovieByName(name: string): Promise<Movie | null> {
    if (!name.trim()) {
        return null;
    }

    try {
        const response = await apiConfig.get("", {
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