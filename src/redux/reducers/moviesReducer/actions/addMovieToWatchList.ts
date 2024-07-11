import { ThunkAction } from "redux-thunk";
import { MovieEntity } from "../../../../db/entities/movie.entity";
import { RootState } from "../../../store";
import { SetMoviesAction } from "../../../types/moviesTypes";
import { WatchListService } from "../../../../lib/movies/movies-service/movies-service";
import { getUpdatedMoviesFromWatchList } from "./getUpdatedMoviesFromWatchList";

export const addMovieToWatchList = (
    payload: string
): ThunkAction<
    Promise<MovieEntity | null>,
    RootState,
    unknown,
    SetMoviesAction
> => {
    return async (dispatch) => {
        const addedMovie = await WatchListService.addMovie(payload);

        if (!!addedMovie) {
            dispatch(getUpdatedMoviesFromWatchList());
        }

        
        return addedMovie;
    };
};
