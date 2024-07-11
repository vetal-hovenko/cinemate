import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../store";
import { SET_MOVIES, SetMoviesAction } from "../../../types/moviesTypes";
import { WatchListService } from "../../../../lib/movies/movies-service/movies-service";

export const getUpdatedMoviesFromWatchList = (): ThunkAction<
    void,
    RootState,
    unknown,
    SetMoviesAction
> => {
    return async (dispatch) => {
        const allMovies = await WatchListService.getAll();
        dispatch({ type: SET_MOVIES, payload: { movies: allMovies } });
    };
};
