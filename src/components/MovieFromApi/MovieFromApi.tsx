import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText, { TextSize } from "../UI/StyledText/StyledText";
import { BACKGROUND_DARKER, HIGHLIGHT, TEXT_MAIN } from "../../utils/colors";
import { iconsMap } from "../../utils/images/icons";
import { MovieSearch } from "../../utils/types/MovieSearch";
import { useSelector } from "../../redux/hooks";
import CustomButton from "../UI/CustomButton/CustomButton";
import { useNavigateToMovieScreen } from "../../utils/hooks/useNavigateToMovieScreen";
import { useAddMovieToWatchList } from "../../utils/hooks/useAddMovieToWatchList";
import { isMovieInWatchList as isInWatchList } from "../../utils/helpers/isMovieInWatchList";
import MoviePoster from "../UI/MoviePoster/MoviePoster";

interface MovieFromApiProps {
    movie: MovieSearch;
}

const IMAGE_NOT_AVAILABLE = "N/A";
const IMAGE_HEIGHT = 212;
const IMAGE_WIDTH = 144;
const BACKUP_IMAGE_SIZE = 32;

const MovieFromApi = (props: MovieFromApiProps) => {
    const { movie } = props;

    const { title, poster, year } = movie;

    const navigateToMovieScreen = useNavigateToMovieScreen();
    const movies = useSelector((store) => store.movies.movies);

    const isPosterValid = poster !== IMAGE_NOT_AVAILABLE;
    const imageSource = isPosterValid ? { uri: poster } : iconsMap.imdbIcon;

    const imageWidth = isPosterValid ? IMAGE_WIDTH : BACKUP_IMAGE_SIZE;
    const imageHeight = isPosterValid ? IMAGE_HEIGHT : BACKUP_IMAGE_SIZE;

    const addMovieToWatchList = useAddMovieToWatchList(movie);

    const isMovieInWatchList = useMemo(
        () => isInWatchList(movie, movies),
        [movie, movies]
    );

    return (
        <View
            style={{
                backgroundColor: BACKGROUND_DARKER,
                elevation: 2,
                shadowColor: HIGHLIGHT,
                gap: 16,
            }}
            className="rounded-lg mt-4 shadow-lg px-3 py-4 w-[48%] justify-between"
        >
            <View style={styles.imageContainer}>
                <MoviePoster movie={movie} imageStyles={{ width: imageWidth, height: imageHeight }} source={imageSource} />
            </View>

            <View style={{ gap: 4 }}>
                <TouchableOpacity onPress={() => navigateToMovieScreen(movie)}>
                    <StyledText
                        style={{ color: HIGHLIGHT }}
                        size={TextSize.REGULAR}
                    >
                        {title}
                    </StyledText>
                </TouchableOpacity>
                <StyledText
                    style={{ color: TEXT_MAIN }}
                    size={TextSize.REGULAR}
                >
                    {year}
                </StyledText>
            </View>

            <CustomButton
                text={
                    !!isMovieInWatchList
                        ? "Remove from the watch list"
                        : "Add to the watch list"
                }
                pressHandler={addMovieToWatchList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default MovieFromApi;
