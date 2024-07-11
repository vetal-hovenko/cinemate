import moment from "moment";
import { DatabaseService } from "../../../db/database-service";
import { MovieEntity } from "../../../db/entities/movie.entity";
import { Movie } from "../../../utils/types/Movie";
import { DATE_FORMAT } from "../../../utils/constants";
import { Equal } from "typeorm/browser";
import { getMovieByName } from "../../../utils/api/searchMoviesByName";

export class WatchListService {
    private static dbManager = DatabaseService.getManager();

    static async getAll(): Promise<MovieEntity[]> {
        const movieEntities = await this.dbManager.find(MovieEntity);

        return movieEntities;
    }

    static async addMovie(movieTitle: string) {
        const movieFromApi = await getMovieByName(movieTitle);

        if (!movieFromApi) {
            return null;
        }

        const movieEntity = this.serializeMovie(movieFromApi);

        const existingMovie = await this.findMovie(movieEntity.imdbID);

        if (!!existingMovie) {
            return null;
        }

        const result = await this.dbManager.save(MovieEntity, movieEntity);

        return result;
    }

    static async updateMovie(movie: MovieEntity) {
        const movieEntity = await this.findMovie(movie.imdbID);

        if (!movieEntity) {
            console.error("Movie not found.");
            return null;
        }

        const updatedMovie = await this.dbManager.save(MovieEntity, movie);

        return updatedMovie;
    }

    static async removeMovie(movieImdbID: string) {
        const existingMovie = await this.findMovie(movieImdbID);

        if (!existingMovie) {
            return null;
        }

        await this.dbManager.remove(existingMovie);

        return existingMovie;
    }

    static serializeMovie(movie: Movie): MovieEntity {
        const movieEntity = new MovieEntity();

        movieEntity.title = movie.title;
        movieEntity.genre = movie.genre;
        movieEntity.imdbRating = movie.imdbRating;
        movieEntity.plot = movie.plot;
        movieEntity.poster = movie.poster;
        movieEntity.dateAdded = moment().format(DATE_FORMAT);
        movieEntity.dateWatched = null;
        movieEntity.isWatched = false;
        movieEntity.imdbID = movie.imdbID;

        return movieEntity;
    }

    static async findMovie(movieImdbID: string) {
        const addedMovie = this.dbManager.findOne(MovieEntity, {
            where: {
                imdbID: Equal(movieImdbID),
            },
        });

        return !!addedMovie ? addedMovie : null;
    }
}
