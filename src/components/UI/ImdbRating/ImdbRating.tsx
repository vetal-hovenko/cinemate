import React from "react";

import { Image, View } from "react-native";
import StyledText from "../StyledText/StyledText";
import { iconsMap } from "../../../utils/images/icons";

const ImdbRating = ({ imdbRating }: { imdbRating: string }) => {
    return (
        <View style={{ gap: 8 }} className="flex-row items-center">
            <Image className="h-6 w-6" source={iconsMap.imdbIcon} />
            <StyledText>{imdbRating}</StyledText>
        </View>
    );
};

export default ImdbRating;
