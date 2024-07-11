import React from "react";
import { TouchableOpacity, View } from "react-native";
import StyledText, { TextSize } from "../../../UI/StyledText/StyledText";
import { formatDate } from "../../../../utils/helpers/formatDate";
import { MovieEntity } from "../../../../db/entities/movie.entity";

interface ItemUserInfo {
    movie: MovieEntity;
    toggleDatePicker: () => void;
}

const ItemUserInfo = (props: ItemUserInfo) => {
    const { movie, toggleDatePicker } = props;
    const { dateAdded, dateWatched, isWatched } = movie;
    return (
        <View style={{ gap: 4 }} className="items-end mt-4">
            <StyledText size={TextSize.SMALL}>
                Added {formatDate(dateAdded)}
            </StyledText>

            {isWatched && dateWatched && (
                <TouchableOpacity onPress={toggleDatePicker}>
                    <StyledText size={TextSize.SMALL}>
                        Watched {formatDate(dateWatched)}
                    </StyledText>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ItemUserInfo;
