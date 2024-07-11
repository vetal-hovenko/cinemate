import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from "typeorm/browser";

export interface IMovieEntity {
    id: number;
    title: string;
    isWatched: boolean;
    dateAdded: string;
    dateWatched: string | null;
    genre: string;
    imdbRating: string;
    imdbID: string;
    plot: string;
    poster: string;
    userRating: string | null;
}

@Entity()
export class MovieEntity extends BaseEntity implements IMovieEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    title: string;

    @Column()
    isWatched: boolean;

    /** Date YYYY-mm-dd */
    @Column()
    dateWatched: string | null;

    /** Date YYYY-mm-dd */
    @Column()
    dateAdded: string;

    @Column()
    genre: string;

    @Column()
    imdbRating: string;

    @Column()
    imdbID: string;

    @Column()
    plot: string;

    @Column()
    poster: string;

    @Column()
    userRating: string | null;
}
