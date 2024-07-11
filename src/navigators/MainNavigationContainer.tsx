import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabsNavigator from "./TabsNavigator";
import { MovieScreen } from "../screens/MovieScreen";
import { BACKGROUND, BACKGROUND_DARKER, BORDER, HIGHLIGHT } from "../utils/colors";
import { Movie } from "../utils/types/Movie";
import { FontFamily, TextSize } from "../components/UI/StyledText/StyledText";

const Stack = createNativeStackNavigator();

export interface RootStackParamList {
    MainTabs: undefined;
    MovieScreen: {
        movie: Movie;
    };
}

const MainNavigationContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: BACKGROUND },
                }}
            >
                <Stack.Screen name="MainTabs" component={TabsNavigator} />
                <Stack.Screen
                    name="MovieScreen"
                    component={MovieScreen}
                    options={({ route }) => {
                        return {
                            headerShown: true,
                            headerTitleStyle: {
                                color: HIGHLIGHT,
                                fontFamily: FontFamily.BenguiatStdBook,
                                fontSize: TextSize.LARGE
                            },
                            headerStyle: {
                                backgroundColor: BACKGROUND_DARKER,
                            },
                            headerTitle: route.params.movie.title,
                            headerTintColor: BORDER,
                            animation: "none",
                        };
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigationContainer;
