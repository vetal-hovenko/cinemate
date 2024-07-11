import React from "react";
import { TouchableOpacity, View, TextInput } from "react-native";

import { BORDER, TEXT_MAIN } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface MovieSearchProps {
    handleUserInput: (input: string) => void;
    movieName: string;
    handleMovieSearch: () => void;
}

const MovieSearch = (props: MovieSearchProps) => {
    const { handleUserInput, movieName, handleMovieSearch } = props;

    return (
        <View style={{gap: 16}} className="flex-row w-full mt-4">
            <TextInput
                onChangeText={handleUserInput}
                className="p-3 border-[1px] flex-1 text-xl rounded-xl"
                value={movieName}
                placeholder="Truman Show..."
                style={{color: TEXT_MAIN, borderColor: BORDER}}
                placeholderTextColor={BORDER}
            />

            <TouchableOpacity
                onPress={handleMovieSearch}
                className="justify-center items-center border-[1px] p-3 rounded-xl"
                style={{borderColor: BORDER}}
            >
                <FontAwesomeIcon
                    color={TEXT_MAIN}
                    size={32}
                    icon={faSearch}
                />
            </TouchableOpacity>
        </View>
    );
};

export default MovieSearch;
