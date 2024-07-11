import React from "react";
import StyledText, { TextSize } from "../../UI/StyledText/StyledText";

interface MovieDetailsItemProps {
    detailTitle: string;
    detailValue: string;
}

const MovieDetailsItem = (props: MovieDetailsItemProps) => {
    const { detailTitle, detailValue } = props;

    return (
        <StyledText size={TextSize.REGULAR} style={{ color: "white", lineHeight: 20 }}>
            <StyledText style={{ color: "gray"}} size={TextSize.REGULAR}>{detailTitle}: </StyledText>
            {detailValue}
        </StyledText>
    );
};

export default MovieDetailsItem;
