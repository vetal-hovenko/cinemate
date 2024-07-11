import { MovieEntity } from "../../db/entities/movie.entity";
import { Movie } from "../types/Movie";
import { MovieSearch } from "../types/MovieSearch";

export function isMovieInWatchList(
    movie: Movie | MovieSearch,
    movies: MovieEntity[]
) {
    return movies.some((m) => m.imdbID === movie.imdbID);
}
