import { useDispatch, useSelector } from "../../redux/hooks";
import { addMovieToWatchList } from "../../redux/reducers/moviesReducer/actions/addMovieToWatchList";
import { removeMovieToWatchList } from "../../redux/reducers/moviesReducer/actions/removeMovieFromWatchList";
import { isMovieInWatchList } from "../helpers/isMovieInWatchList";
import { Movie } from "../types/Movie";
import { MovieSearch } from "../types/MovieSearch";

export const useAddMovieToWatchList = (movie: Movie | MovieSearch) => {
    const movies = useSelector(({ movies }) => movies.movies);
    const dispatch = useDispatch();

    return async () => {
        !!isMovieInWatchList(movie, movies)
            ? await dispatch(removeMovieToWatchList(movie.imdbID))
            : await dispatch(addMovieToWatchList(movie.title));
    };
};
