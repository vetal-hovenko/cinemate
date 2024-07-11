import React, { useState } from "react";
import { ScrollView, View, StyleSheet, LogBox } from "react-native";
import { BACKGROUND } from "../utils/colors";
import WatchList from "../components/WatchList/WatchList";
import MoviesSortOrderSelect, {
    SortKey,
} from "../components/UI/MoviesSortOrderSelect/MoviesSortOrderSelect";

const WatchListScreen = () => {
    const [sortKey, setSortKey] = useState<SortKey>("default");
    const [isOrderAscending, setIsOrderAscending] = useState(true);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <MoviesSortOrderSelect
                    isOrderAscending={isOrderAscending}
                    setIsOrderAscending={setIsOrderAscending}
                    setSortKey={setSortKey}
                />
                <WatchList
                    isOrderAscending={isOrderAscending}
                    sortKey={sortKey}
                />
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
