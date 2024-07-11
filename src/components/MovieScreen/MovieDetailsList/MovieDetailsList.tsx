import React from "react";
import MovieDetailsItem from "../MovieDetailsItem/MovieDetailsItem";
import { View } from "react-native";

interface MovieDetailsListProps {
    detailsMap: Record<string, string>;
}

const MovieDetailsList = (props: MovieDetailsListProps) => {
    const { detailsMap } = props;
    return (
        <View style={{gap: 4}}>
            {Object.entries(detailsMap).map(([title, value]) => (
                <MovieDetailsItem
                    key={title}
                    detailTitle={title}
                    detailValue={value}
                />
            ))}
        </View>
    );
};

export default MovieDetailsList;
