import home from "./home.png";
import filmRoll from "./film-roll.png";
import imdbIcon from "./imdb.png";
import checkbox from "./checkbox.png";
import checkboxChecked from "./checkbox-checked.png";
import starIcon from "./star.png";

export type Icon =
    | "imdbIcon"
    | "checkbox"
    | "checkboxChecked"
    | "starIcon"
    | "home"
    | "filmRoll";

export type IconsMap = Record<Icon, number>;

export const iconsMap: IconsMap = {
    imdbIcon,
    checkbox,
    checkboxChecked,
    starIcon,
    home,
    filmRoll,
};
