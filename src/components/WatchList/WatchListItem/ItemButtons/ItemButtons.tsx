import React from "react";
import { View } from "react-native";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import { useDispatch } from "../../../../redux/hooks";
import { removeMovieToWatchList } from "../../../../redux/reducers/moviesReducer/actions/removeMovieFromWatchList";
import { MovieEntity } from "../../../../db/entities/movie.entity";
import moment from "moment";
import { DATE_FORMAT } from "../../../../utils/constants";
import { updateMovie } from "../../../../redux/reducers/moviesReducer/actions/updateMovie";
import { iconsMap } from "../../../../utils/images/icons";
import { BACKGROUND } from "../../../../utils/colors";

const ItemButtons = ({ movie }: { movie: MovieEntity }) => {
    const dispatch = useDispatch();

    const { isWatched, dateWatched } = movie;

    const handleRemoveButton = async () => {
        await dispatch(removeMovieToWatchList(movie.imdbID));
    };

    const handleCheckMovieStatus = async () => {
        await dispatch(
            updateMovie({
                ...movie,
                isWatched: !isWatched,
                dateWatched: isWatched ? null : moment().format(DATE_FORMAT),
            } as MovieEntity)
        );
    };
    return (
        <View style={{ gap: 4 }} className="w-1/2">
            <CustomButton
                style={{
                    height: 36,
                    backgroundColor: "transparent",
                    flex: 2,
                    justifyContent: "flex-start",
                }}
                text="Seen"
                pressHandler={handleCheckMovieStatus}
                icon={
                    isWatched && !!dateWatched
                        ? iconsMap.checkboxChecked
                        : iconsMap.checkbox
                }
            />
            <CustomButton
                style={{
                    height: 36,
                    backgroundColor: BACKGROUND,
                    flex: 2,
                }}
                text="Remove"
                pressHandler={handleRemoveButton}
            />
        </View>
    );
};

export default ItemButtons;
