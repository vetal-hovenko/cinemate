import {
    MoviesState,
    SET_MOVIES,
    SetMoviesAction,
} from "../../types/moviesTypes";
import { setMovies } from "./case-reducers/setMovies";

const initialState: MoviesState = {
    movies: [],
};

export const moviesReducer = (
    state = initialState,
    action: SetMoviesAction
): MoviesState => {
    switch (action.type) {
        case SET_MOVIES:
            return setMovies(state, action);
        default:
            return state;
    }
};
