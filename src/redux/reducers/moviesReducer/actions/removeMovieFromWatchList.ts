import { ThunkAction } from "redux-thunk";
import { MovieEntity } from "../../../../db/entities/movie.entity";
import { Movie } from "../../../../utils/types/Movie";
import { RootState } from "../../../store";
import { SetMoviesAction } from "../../../types/moviesTypes";
import { WatchListService } from "../../../../lib/movies/movies-service/movies-service";
import { getUpdatedMoviesFromWatchList } from "./getUpdatedMoviesFromWatchList";
import { MovieSearch } from "../../../../utils/types/MovieSearch";

export const removeMovieToWatchList = (
    payload: string
): ThunkAction<
    Promise<MovieEntity | null>,
    RootState,
    unknown,
    SetMoviesAction
> => {
    return async (dispatch) => {
        const removedMovie = await WatchListService.removeMovie(payload);

        if (!!removedMovie) {
            dispatch(getUpdatedMoviesFromWatchList());
        }

        return removedMovie;
    };
};
