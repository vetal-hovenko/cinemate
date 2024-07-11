import { MoviesState, SetMoviesAction } from "../../../types/moviesTypes";

export const setMovies = (
    state: MoviesState,
    action: SetMoviesAction
): MoviesState => {
    return { ...state, movies: action.payload.movies };
};
