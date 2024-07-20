import React, { useEffect, useState } from "react";
import "reflect-metadata";
import { useDispatch } from "../redux/hooks";
import { DatabaseService } from "../db/database-service";
import { initWatchList } from "../redux/reducers/moviesReducer/actions/initWatchList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BACKGROUND_DARKER, BORDER, HIGHLIGHT } from "../utils/colors";
import { StyleSheet } from "react-native";
import NavBarIcon from "../components/UI/NavBarIcon/NavBarIcon";
import { Icon, iconsMap } from "../utils/images/icons";
import { FontFamily } from "../components/UI/StyledText/StyledText";
import HomeScreen from "../screens/HomeScreen";
import WatchListScreen from "../screens/WatchListScreen";

const Tab = createBottomTabNavigator();

export type ScreenRoute = "HomeScreen" | "Watch List";

type Screen = {
    name: ScreenRoute;
    component: () => JSX.Element;
    icon: Icon;
};

const screens: Screen[] = [
    {
        name: "HomeScreen",
        component: HomeScreen,
        icon: "home",
    },
    {
        name: "Watch List",
        component: WatchListScreen,
        icon: "filmRoll",
    },
];

const TabsNavigator = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                if (!DatabaseService.getInstance().isInitialized) {
                    await DatabaseService.getInstance().initialize();

                    setLoading(false);
                }
            } catch (error) {
                console.log("error with initialization");
                console.log(error);
            }
            
            await dispatch(initWatchList());
        })();
    }, []);

    return loading ? (
        <></>
    ) : (
        <Tab.Navigator>
            {screens.slice(0, 2).map(({ name, icon, component }) => (
                <Tab.Screen
                    options={{
                        tabBarStyle: { ...styles.navigation },
                        headerStyle: { ...styles.header },
                        headerTintColor: HIGHLIGHT,
                        headerTitleStyle: {
                            fontFamily: FontFamily.BenguiatStdBook,
                            fontSize: 28,
                        },
                        headerShown: name === "Watch List",
                        tabBarLabel: () => null,
                        tabBarIcon: ({ focused }) => {
                            const iconSource = iconsMap[icon];

                            const tintColor = focused ? HIGHLIGHT : BORDER;

                            return (
                                <NavBarIcon
                                    tintColor={tintColor}
                                    iconSource={iconSource}
                                />
                            );
                        },
                    }}
                    key={name}
                    name={name}
                    component={component}
                />
            ))}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: BACKGROUND_DARKER,
        borderTopWidth: 0,
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 12,
        elevation: 0.5,
        shadowColor: BORDER,
    },
    header: {
        backgroundColor: BACKGROUND_DARKER,
        borderBottomWidth: 0,
        shadowColor: HIGHLIGHT,
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: "white",
    },
});

export default TabsNavigator;
