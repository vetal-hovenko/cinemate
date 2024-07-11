import React from "react";
import { Image } from "react-native";

interface NavBarIconProps {
    iconSource: number;
    tintColor: string
}

const NavBarIcon = (props: NavBarIconProps) => {
    const { iconSource, tintColor } = props;
    return (
        <Image
            style={{ height: 24, width: 24 }}
            source={iconSource}
            tintColor={tintColor}
        />
    );
};

export default NavBarIcon;
