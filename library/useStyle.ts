import { useColorScheme } from "react-native";
import darkStyle from "./darkStyle";
import lightStyle from "./lightStyle";

export function useStyle() {
    const colorScheme = useColorScheme();
    const style = !colorScheme || colorScheme === 'light' ? darkStyle : darkStyle;

    return style;
}