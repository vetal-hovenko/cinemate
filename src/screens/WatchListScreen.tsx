import React, { useState } from "react";
import { ScrollView, View, StyleSheet, LogBox } from "react-native";
import { BACKGROUND } from "../utils/colors";
import WatchList from "../components/WatchList/WatchList";
import MoviesSortOrderSelect, {
    SortKey,
} from "../components/UI/MoviesSortOrderSelect/MoviesSortOrderSelect";
import { useSelector } from "../redux/hooks";
import StyledText, { TextSize } from "../components/UI/StyledText/StyledText";

const WatchListScreen = () => {
    const movies = useSelector((store) => store.movies.movies);

    const [sortKey, setSortKey] = useState<SortKey>("default");
    const [isOrderAscending, setIsOrderAscending] = useState(true);

    return (
        <ScrollView
            style={styles.scrollView}
        >
            <View style={styles.container}>
                {!movies.length ? (
                    <View className="flex-1 justify-center items-center mt-56">
                        <StyledText
                            style={{ opacity: 0.5 }}
                            size={TextSize.LARGE}
                        >
                            No movies yet
                        </StyledText>
                    </View>
                ) : (
                    <>
                        <MoviesSortOrderSelect
                            isOrderAscending={isOrderAscending}
                            setIsOrderAscending={setIsOrderAscending}
                            setSortKey={setSortKey}
                        />
                        <WatchList
                            isOrderAscending={isOrderAscending}
                            sortKey={sortKey}
                        />
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: BACKGROUND,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
    },
});

export default WatchListScreen;
