import React from "react";
import { View, Image, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import StyledText, { TextSize } from "../components/UI/StyledText/StyledText";
import { Movie } from "../utils/types/Movie";
import MovieDetailsList from "../components/MovieScreen/MovieDetailsList/MovieDetailsList";
import ImdbRating from "../components/UI/ImdbRating/ImdbRating";
import CustomButton from "../components/UI/CustomButton/CustomButton";
import { useAddMovieToWatchList } from "../utils/hooks/useAddMovieToWatchList";
import { isMovieInWatchList } from "../utils/helpers/isMovieInWatchList";
import { useSelector } from "../redux/hooks";

export type MovieScreenRouteProp = RouteProp<
    { params: { movie: Movie } },
    "params"
>;

export const MovieScreen = () => {
    const route = useRoute<MovieScreenRouteProp>();
    const { movie } = route.params;
    const movies = useSelector(({ movies }) => movies.movies);
    const addMovieToWatchList = useAddMovieToWatchList(movie);

    const {
        poster,
        title,
        year,
        director,
        writer,
        actors,
        genre,
        boxOffice,
        country,
        awards,
        runtime,
        imdbRating,
        imdbVotes,
        plot,
    } = movie;

    const mainDetailsMap = {
        Director: director,
        Writers: writer,
        Actors: actors,
        Genre: genre,
    };
    const additionalDetailsMap = {
        "Box Office": boxOffice,
        Country: country,
        Awards: awards,
        Runtime: runtime,
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View className="flex-1 justify-between p-4">
                <View>
                    <View style={{ gap:8 }} className="mb-6 flex-row">
                        <Image
                            source={{ uri: poster }}
                            className="w-1/2 h-64 rounded-xl"
                            resizeMode="cover"
                        />
                        <View style={{ flex: 2, gap: 8 }}>
                            <StyledText
                                size={TextSize.REGULAR}
                                style={{ color: "white", flexDirection: "row" }}
                            >
                                {title}
                                <StyledText size={TextSize.REGULAR}>
                                    {" "}
                                    ({year})
                                </StyledText>
                            </StyledText>

                            <StyledText
                                style={{ flex: 2, lineHeight: 20 }}
                                size={TextSize.SMALL}
                            >
                                {plot}
                            </StyledText>
                        </View>
                    </View>
                    <View style={{ gap: 8 }} className="mt-4 w-full">
                        <View style={{ gap: 8 }} className="flex-row">
                            <ImdbRating imdbRating={imdbRating} />
                            <StyledText>({imdbVotes} votes)</StyledText>
                        </View>
                    </View>

                    <View style={{ gap: 16, marginTop: 8 }}>
                        <MovieDetailsList detailsMap={mainDetailsMap} />
                        <MovieDetailsList detailsMap={additionalDetailsMap} />
                    </View>
                </View>

                <CustomButton
                    text={
                        isMovieInWatchList(movie, movies)
                            ? "Remove from watch list"
                            : "Add to watch list"
                    }
                    pressHandler={addMovieToWatchList}
                    textSize={TextSize.MEDIUM}
                />
            </View>
        </ScrollView>
    );
};
