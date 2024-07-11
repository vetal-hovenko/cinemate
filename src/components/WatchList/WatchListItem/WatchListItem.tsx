import React, { useState } from "react";
import { MovieEntity } from "../../../db/entities/movie.entity";
import { View } from "react-native";
import { useDispatch } from "../../../redux/hooks";
import { updateMovie } from "../../../redux/reducers/moviesReducer/actions/updateMovie";

import { DATE_FORMAT } from "../../../utils/constants";
import moment from "moment";
import { BACKGROUND_DARKER, HIGHLIGHT } from "../../../utils/colors";
import RatingModal from "../../MovieRatingModal/MovieRatingModal";
import MoviePoster from "../../UI/MoviePoster/MoviePoster";
import DateTimePicker from "react-native-modal-datetime-picker";
import ItemButtons from "./ItemButtons/ItemButtons";
import ItemDetails from "./ItemDetails/ItemDetails";
import ItemUserInfo from "./ItemUserInfo/ItemUserInfo";
import DatePicker from "../../UI/DatePicker/DatePicker";

interface WatchListItemProps {
    movie: MovieEntity;
}

const WatchListItem = (props: WatchListItemProps) => {
    const { movie } = props;

    const dispatch = useDispatch();

    const { dateWatched, userRating } = movie;

    const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const onRatingModalClose = () => {
        setIsRatingModalVisible(false);
    };

    const onDateWatchedUpdate = async (date: Date) => {
        const formattedDate = moment(date).format(DATE_FORMAT);

        await dispatch(
            updateMovie({ ...movie, dateWatched: formattedDate } as MovieEntity)
        );

        setIsDatePickerVisible(false);
    };

    const toggleDatePicker = () => {
        setIsDatePickerVisible((prevState) => !prevState);
    };

    return (
        <>
            <View
                style={{
                    backgroundColor: BACKGROUND_DARKER,
                    elevation: 0.5,
                    shadowColor: HIGHLIGHT,
                    gap: 8,
                }}
                className="p-2 mb-2 rounded-lg"
            >
                <View style={{ gap: 16 }} className="flex-row px-1">
                    <MoviePoster
                        imageStyles={{ width: 144, height: 208 }}
                        movie={movie}
                    />

                    <ItemDetails
                        movie={movie}
                        setIsRatingModalVisible={setIsRatingModalVisible}
                    />
                </View>

                <ItemUserInfo
                    movie={movie}
                    toggleDatePicker={toggleDatePicker}
                />

                <ItemButtons movie={movie} />
            </View>

            {isRatingModalVisible && (
                <RatingModal
                    isVisible={isRatingModalVisible}
                    onClose={onRatingModalClose}
                    userRating={Number(userRating)}
                    movie={movie}
                />
            )}

            {isDatePickerVisible && (
                <DatePicker
                    date={
                        new Date(dateWatched ? dateWatched : moment().toDate())
                    }
                    isVisible={isDatePickerVisible}
                    onCancel={toggleDatePicker}
                    onConfirm={onDateWatchedUpdate}
                />
            )}
        </>
    );
};

export default WatchListItem;
