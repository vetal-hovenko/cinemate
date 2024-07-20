import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../store";
import { SET_MOVIES, SetMoviesAction } from "../../../types/moviesTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUpdatedMoviesFromWatchList } from "./getUpdatedMoviesFromWatchList";

export const initWatchList = (): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    SetMoviesAction
> => {
    return async (dispatch) => {
        const isWatchListInitialized = await AsyncStorage.getItem(
            "are-movies-initialized"
        );

        if (isWatchListInitialized) {
            dispatch(getUpdatedMoviesFromWatchList());
        } else {
            dispatch({
                type: SET_MOVIES,
                payload: {
                    movies: [],
                },
            });
            await AsyncStorage.setItem("are-movies-initialized", "true");
        }
    };
};
