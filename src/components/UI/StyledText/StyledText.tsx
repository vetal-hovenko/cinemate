import React from "react";
import { Text, TextStyle } from "react-native";
import { HIGHLIGHT, TEXT_MAIN } from "../../../utils/colors";

export enum TextSize {
    EXTRA_SMALL = 12,
    SMALL = 14,
    REGULAR = 16,
    MEDIUM = 20,
    LARGE = 28,
    EXTRA_LARGE = 40,
}

export enum FontFamily {
    BenguiatStdBook = "BenguiatStd-Book",
    AmaranthRegular = "Amaranth-Regular",
    BenguiatStdBold = "BenguiatStd-Bold",
}

interface StyledTextProps {
    children: React.ReactNode;
    size?: number;
    style?: TextStyle;
    fontFamily?: FontFamily;
}

const StyledText = (props: StyledTextProps) => {
    const { children, size, style, fontFamily } = props;
    return (
        <Text
            style={{
                fontFamily: fontFamily || FontFamily.BenguiatStdBook,
                fontSize: size || 20,
                color: TEXT_MAIN,
                ...style,
            }}
        >
            {children}
        </Text>
    );
};

export default StyledText;
