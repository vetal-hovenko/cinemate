import React, { useMemo } from "react";
import { Image, TouchableOpacity, ViewStyle } from "react-native";
import StyledText, { TextSize } from "../StyledText/StyledText";
import { BORDER, HIGHLIGHT, TEXT_MAIN } from "../../../utils/colors";

interface CustomButtonProps {
    style?: ViewStyle;
    text: string;
    pressHandler: () => Promise<void>;
    icon?: number;
    textSize?: TextSize
}

const CustomButton = (props: CustomButtonProps) => {
    const { style, text, pressHandler, icon, textSize } = props;
    return (
        <TouchableOpacity
            className="h-12 justify-center px-2 py-2 rounded-lg items-center flex-row"
            onPress={pressHandler}
            style={{
                backgroundColor: HIGHLIGHT,
                gap: 8,
                ...style,
            }}
        >
            {icon && <Image tintColor={TEXT_MAIN} className="w-5 h-5" source={icon} />}
            <StyledText
                style={{ color: "white", textAlign: "center" }}
                size={textSize || TextSize.SMALL}
            >
                {text}
            </StyledText>
        </TouchableOpacity>
    );
};

export default CustomButton;
