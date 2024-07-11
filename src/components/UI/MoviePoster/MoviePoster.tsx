import React from "react";
import { Image, ImageStyle, StyleProp, TouchableOpacity } from "react-native";
import { MovieEntity } from "../../../db/entities/movie.entity";
import { MovieSearch } from "../../../utils/types/MovieSearch";
import { useNavigateToMovieScreen } from "../../../utils/hooks/useNavigateToMovieScreen";

export type ImageSource =
    | number
    | {
          uri: string;
      };

interface MoviePosterProps {
    movie: MovieEntity | MovieSearch;
    imageStyles?: StyleProp<ImageStyle>;
    source?: ImageSource;
    className?: string
}
const MoviePoster = (props: MoviePosterProps) => {
    const { movie, imageStyles, source, className } = props;
    const navigateToMovieScreen = useNavigateToMovieScreen();

    const imageSource = source || { uri: movie.poster };

    return (
        <TouchableOpacity onPress={() => navigateToMovieScreen(movie)}>
            <Image
                className={`rounded-xl ${className || ""}`}
                source={imageSource}
                style={imageStyles}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );
};

export default MoviePoster;
