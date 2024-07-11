import React, { useMemo } from "react";
import { useSelector } from "../../redux/hooks";
import { moviePlotTrim } from "../../utils/helpers/moviePlotTTrim";
import { MovieEntity } from "../../db/entities/movie.entity";
import WatchListItem from "./WatchListItem/WatchListItem";
import { SortKey } from "../UI/MoviesSortOrderSelect/MoviesSortOrderSelect";
import moment from "moment";

const WatchList = ({ sortKey, isOrderAscending }: { sortKey: SortKey, isOrderAscending: boolean  }) => {
    const movies = useSelector((store) => store.movies.movies);

    const sortedMovies = useMemo(() => {
        const result = [...movies].sort((movie1, movie2) => {
            switch (sortKey) {
                case "dateWatched":
                    const date1 = movie1.dateWatched
                        ? moment(movie1.dateWatched)
                        : moment(0);
                    const date2 = movie2.dateWatched
                        ? moment(movie2.dateWatched)
                        : moment(0);
                    return date2.diff(date1);
                case "imdbRating":
                    return (
                        parseFloat(movie2.imdbRating) -
                        parseFloat(movie1.imdbRating)
                    );
                case "personalRating":
                    const movie1Rating = movie1.userRating
                        ? parseFloat(movie1.userRating)
                        : 0;
                    const movie2Rating = movie2.userRating
                        ? parseFloat(movie2.userRating)
                        : 0;

                    return movie2Rating - movie1Rating;
                default:
                    return movie2.id - movie1.id;
            }
        });

        return isOrderAscending ? result : [...result].reverse();
    }, [sortKey, movies, isOrderAscending]);

    return (
        <>
            {sortedMovies.map((movie) => {
                const trimmedPlot = moviePlotTrim(movie.plot);

                return (
                    <WatchListItem
                        key={movie.id}
                        movie={
                            {
                                ...movie,
                                plot: trimmedPlot,
                            } as MovieEntity
                        }
                    />
                );
            })}
        </>
    );
};

export default WatchList;
