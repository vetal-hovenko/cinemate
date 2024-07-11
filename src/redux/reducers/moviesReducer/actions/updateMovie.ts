import { ThunkAction } from "redux-thunk";
import { MovieEntity } from "../../../../db/entities/movie.entity";
import { Movie } from "../../../../utils/types/Movie";
import { RootState } from "../../../store";
import { SetMoviesAction } from "../../../types/moviesTypes";
import { WatchListService } from "../../../../lib/movies/movies-service/movies-service";
import { getUpdatedMoviesFromWatchList } from "./getUpdatedMoviesFromWatchList";

export const updateMovie = (
    payload: MovieEntity
): ThunkAction<
    Promise<MovieEntity | null>,
    RootState,
    unknown,
    SetMoviesAction
> => {
    return async (dispatch) => {
        const updatedMovie = await WatchListService.updateMovie(payload);

        if (!!updatedMovie) {
            dispatch(getUpdatedMoviesFromWatchList());
        }

        return updatedMovie;
    };
};
