import React, { useState } from "react";
import { BACKGROUND, HIGHLIGHT } from "../utils/colors";
import { Keyboard, ScrollView, View } from "react-native";
import StyledText, { TextSize } from "../components/UI/StyledText/StyledText";
import { searchMoviesByName } from "../utils/api/searchMoviesByName";

import MovieSearch from "../components/MovieSearch/MovieSearch";
import MovieFromApi from "../components/MovieFromApi/MovieFromApi";
import { MovieSearch as IMovieSearch } from "../utils/types/MovieSearch";

const HomeScreen = () => {
    const [movieName, setMovieName] = useState("");
    const [searchError, setSearchError] = useState(false);
    const [movies, setMovies] = useState<IMovieSearch[]>([]);

    const handleMovieSearch = async () => {
        if (!movieName) {
            return;
        }
        
        setSearchError(false);
        setMovies([]);
        const moviesFromAPI = await searchMoviesByName(movieName);

        if (!!moviesFromAPI) {
            setMovies(moviesFromAPI);
        } else {
            setSearchError(true);
        }

        Keyboard.dismiss();
    };

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            style={{ backgroundColor: BACKGROUND }}
        >
            <View className="flex-1 justify-center p-4 mt-16">
                <StyledText
                    style={{ color: HIGHLIGHT, textAlign: "center" }}
                    size={TextSize.EXTRA_LARGE}
                >
                    Cine-mate
                </StyledText>

                <MovieSearch
                    movieName={movieName}
                    handleMovieSearch={handleMovieSearch}
                    handleUserInput={(input: string) => setMovieName(input)}
                />

                <View>
                    <ScrollView>
                        <View
                            style={{
                                gap: 4,
                                marginBottom: movies.length ? 56 : 8,
                            }}
                            className="flex-row flex-wrap"
                        >
                            {movies.map((movie) => (
                                <MovieFromApi
                                    key={movie.imdbID}
                                    movie={movie}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {searchError && (
                    <StyledText style={{ marginTop: 8 }}>
                        Unfortunately we were unable to find this movie
                    </StyledText>
                )}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
