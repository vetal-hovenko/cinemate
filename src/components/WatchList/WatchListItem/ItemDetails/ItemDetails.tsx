import React, { SetStateAction } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import StyledText, { TextSize } from "../../../UI/StyledText/StyledText";
import { HIGHLIGHT } from "../../../../utils/colors";
import ImdbRating from "../../../UI/ImdbRating/ImdbRating";
import { iconsMap } from "../../../../utils/images/icons";
import { MovieEntity } from "../../../../db/entities/movie.entity";
import { useNavigateToMovieScreen } from "../../../../utils/hooks/useNavigateToMovieScreen";

interface ItemDetailsProps {
    movie: MovieEntity;
    setIsRatingModalVisible: React.Dispatch<SetStateAction<boolean>>;
}

const ItemDetails = (props: ItemDetailsProps) => {
    const { movie, setIsRatingModalVisible } = props;

    const { title, genre, plot, imdbRating, userRating } = movie;

    const navigateToMovieScreen = useNavigateToMovieScreen();
    return (
        <View className="flex-1" style={{ gap: 8 }}>
            <TouchableOpacity onPress={() => navigateToMovieScreen(movie)}>
                <StyledText style={{ color: HIGHLIGHT }} size={TextSize.MEDIUM}>
                    {title}
                </StyledText>
            </TouchableOpacity>

            <StyledText size={TextSize.SMALL}>{genre}</StyledText>

            <StyledText style={{ opacity: 0.8 }} size={TextSize.SMALL}>
                {plot}
            </StyledText>

            <ImdbRating imdbRating={imdbRating} />

            <TouchableOpacity
                style={{ gap: 8 }}
                className="flex-row items-center"
                onPress={() => setIsRatingModalVisible(true)}
            >
                <Image className="h-6 w-6" source={iconsMap.starIcon} />
                <StyledText>{userRating || "N/A"}</StyledText>
            </TouchableOpacity>
        </View>
    );
};

export default ItemDetails;
