import { Select } from "native-base";
import React from "react";
import {
    BACKGROUND,
    BORDER,
    HIGHLIGHT,
    TEXT_MAIN,
} from "../../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { FontFamily } from "../StyledText/StyledText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export type SortKey =
    | "default"
    | "personalRating"
    | "imdbRating"
    | "dateWatched";

interface MoviesSortOrderSelectProps {
    setSortKey: React.Dispatch<React.SetStateAction<SortKey>>;
    setIsOrderAscending: React.Dispatch<React.SetStateAction<boolean>>;
    isOrderAscending: boolean;
}
const MoviesSortOrderSelect = (props: MoviesSortOrderSelectProps) => {
    const { setSortKey, setIsOrderAscending, isOrderAscending } = props;

    const sortKeys: Record<SortKey, string> = {
        default: "Default",
        personalRating: "Personal Rating",
        imdbRating: "IMDB Rating",
        dateWatched: "Date watched",
    };

    return (
        <View style={{ gap: 12 }} className="flex-row items-center">
            <Select
                borderColor={BORDER}
                backgroundColor={BACKGROUND}
                width={200}
                dropdownIcon={
                    <Ionicons name="chevron-down" size={20} color={TEXT_MAIN} />
                }
                placeholder={sortKeys.default}
                onValueChange={(value) => setSortKey(value as SortKey)}
                placeholderTextColor={TEXT_MAIN}
                fontSize="lg"
                fontFamily={FontFamily.BenguiatStdBook}
                color={TEXT_MAIN}
                _actionSheetContent={{ backgroundColor: BACKGROUND }}
            >
                {Object.entries(sortKeys).map(([orderValue, orderLabel]) => (
                    <Select.Item
                        key={orderValue}
                        value={orderValue}
                        label={orderLabel}
                        backgroundColor={BACKGROUND}
                        _text={{
                            color: TEXT_MAIN,
                        }}
                    />
                ))}
            </Select>

            <TouchableOpacity
                style={{ borderColor: BORDER }}
                className="border-[1px] rounded-md items-center justify-center p-2"
                onPress={() => setIsOrderAscending(prevState => !prevState)}
            >
                <FontAwesomeIcon
                    icon={isOrderAscending ? faCaretUp : faCaretDown}
                    color={HIGHLIGHT}
                    size={28}
                />
            </TouchableOpacity>
        </View>
    );
};

export default MoviesSortOrderSelect;
