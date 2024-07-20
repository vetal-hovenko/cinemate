import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getMovieByName } from "../api/getMovieByName";
import { MovieSearch } from "../types/MovieSearch";
import { MovieEntity } from "../../db/entities/movie.entity";
import { RootStackParamList } from "../../navigators/MainNavigationContainer";

export const useNavigateToMovieScreen = () => {
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

    return async (movie: MovieSearch | MovieEntity) => {
        const movieFromApi = await getMovieByName(movie.title);

        if (!!movieFromApi) {
            navigate("MovieScreen", { movie: movieFromApi });
        }
    };
};
