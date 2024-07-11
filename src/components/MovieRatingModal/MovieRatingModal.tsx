import React, { useState } from "react";
import {
    View,
    Modal,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import StyledText from "../UI/StyledText/StyledText";
import {
    BACKGROUND,
    BACKGROUND_DARKER,
    BORDER,
    HIGHLIGHT,
    TEXT_MAIN,
} from "../../utils/colors";
import { MovieEntity } from "../../db/entities/movie.entity";
import { useDispatch } from "../../redux/hooks";
import { updateMovie } from "../../redux/reducers/moviesReducer/actions/updateMovie";
import moment from "moment";
import { DATE_FORMAT } from "../../utils/constants";

interface RatingModalProps {
    isVisible: boolean;
    onClose: () => void;
    userRating: number;
    movie: MovieEntity;
}

const RatingModal = (props: RatingModalProps) => {
    const dispatch = useDispatch();

    const { isVisible, onClose, userRating, movie } = props;
    const [rating, setRating] = useState(userRating.toString() || "0");
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const changeRating = (increment: number) => {
        setRating((prev) => {
            let newRating = +prev + increment;
            const isNewRatingValid = newRating <= 10 && newRating >= 0;

            return isNewRatingValid ? newRating.toFixed(1) : prev;
        });
    };

    const handleLongPress = (increment: number) => {
        const id = setInterval(() => {
            changeRating(increment);
        }, 100);
        setIntervalId(id);
    };

    const handlePressOut = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const onRatingUpdate = async (newRating: string) => {
        const updatedDateWatched =
            !movie.isWatched && !movie.dateWatched
                ? null
                : moment().format(DATE_FORMAT);

        await dispatch(
            updateMovie({
                ...movie,
                isWatched: true,
                dateWatched: updatedDateWatched,
                userRating: parseFloat(Number(newRating).toFixed(1)).toString(),
            } as MovieEntity)
        );

        onClose();
    };

    return (
        <Modal visible={isVisible} animationType="fade" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View
                    className="w-4/5 rounded-lg p-5 items-center"
                    style={styles.modalContent}
                >
                    <StyledText style={styles.modalTitle}>
                        Rate the Movie
                    </StyledText>
                    <View className="flex-row items-center mb-10">
                        <TouchableOpacity
                            onPress={() => changeRating(-0.1)}
                            onLongPress={() => handleLongPress(-0.1)}
                            onPressOut={handlePressOut}
                        >
                            <FontAwesomeIcon
                                icon={faCaretLeft}
                                size={32}
                                color={HIGHLIGHT}
                            />
                        </TouchableOpacity>
                        <TextInput
                            className="text-2xl border rounded-lg text-center mx-5 w-16 py-1"
                            style={styles.ratingInput}
                            keyboardType="decimal-pad"
                            value={rating.toString()}
                            onChangeText={(text) => setRating(text)}
                        />
                        <TouchableOpacity
                            onPress={() => changeRating(0.1)}
                            onLongPress={() => handleLongPress(0.1)}
                            onPressOut={handlePressOut}
                        >
                            <FontAwesomeIcon
                                icon={faCaretRight}
                                size={32}
                                color={HIGHLIGHT}
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-between w-full">
                        <TouchableOpacity
                            onPress={onClose}
                            className="flex-1 mr-1 items-center p-2 rounded"
                            style={styles.cancelButton}
                        >
                            <StyledText style={styles.buttonStyledText}>
                                Cancel
                            </StyledText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                onRatingUpdate(rating);
                                onClose();
                            }}
                            className="flex-1 ml-1 items-center p-2 rounded"
                            style={styles.saveButton}
                        >
                            <StyledText style={styles.buttonStyledText}>
                                Save
                            </StyledText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: BACKGROUND_DARKER,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    ratingInput: {
        borderColor: BORDER,
        color: TEXT_MAIN,
    },
    cancelButton: {
        backgroundColor: BACKGROUND,
    },
    saveButton: {
        backgroundColor: HIGHLIGHT,
    },
    buttonStyledText: {
        color: "white",
        fontSize: 16,
    },
});

export default RatingModal;
