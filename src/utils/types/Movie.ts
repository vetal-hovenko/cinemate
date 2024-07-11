export interface Movie {
    actors: string;
    awards: string;
    boxOffice: string;
    country: string;
    dVD: string;
    director: string;
    genre: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
    language: string;
    metascore: string;
    plot: string;
    poster: string;
    production: string;
    rated: string;
    ratings: {
        source: string;
        value: string;
    }[];
    released: string;
    response: string;
    runtime: string;
    title: string;
    type: string;
    website: string;
    writer: string;
    year: string;
}
