import { MovieEntity } from "../../db/entities/movie.entity";

export const SET_MOVIES = "movies/set-movies";

export interface MoviesState {
    movies: MovieEntity[];
}

export interface SetMoviesAction {
    type: typeof SET_MOVIES;
    payload: {
        movies: MovieEntity[];
    };
}
