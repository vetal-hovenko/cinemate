import React, { useCallback } from "react";
import "reflect-metadata";

import { Provider } from "react-redux";
import store from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import MainNavigationContainer from "./src/navigators/MainNavigationContainer";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        "Oswald-VariableFont_wght": require("./assets/fonts/Oswald-VariableFont_wght.ttf"),
        "Cinzel-VariableFont_wght": require("./assets/fonts/Cinzel-VariableFont_wght.ttf"),
        "Amaranth-Regular": require("./assets/fonts/Amaranth-Regular.ttf"),
        "BenguiatStd-Book": require("./assets/fonts/BenguiatStd-Book.ttf"),
        "BenguiatStd-Bold": require("./assets/fonts/BenguiatStd-Bold.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <NativeBaseProvider>
            <SafeAreaProvider
                onLayout={onLayoutRootView}
            >
                <Provider store={store}>
                    <MainNavigationContainer />
                </Provider>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
}
