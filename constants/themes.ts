import { Theme } from "@react-navigation/native"; // Import Theme type
import { fonts } from "./../node_modules/@react-navigation/native/src/theming/fonts"; // Import fonts or define your own fonts object

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)", // Light blue
    background: "rgb(242, 242, 242)", // Light gray
    card: "rgb(255, 255, 255)", // White
    text: "rgb(28, 28, 30)", // Dark text
    border: "rgb(216, 216, 216)", // Light border
    notification: "rgb(255, 59, 48)", // Red notification
  },
  fonts, // Keep consistent font structure
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)", // Dark blue
    background: "rgb(0, 0, 0)", // Black
    card: "rgb(18, 18, 18)", // Dark card
    text: "rgb(229, 229, 231)", // Light text
    border: "rgb(255, 255, 255)", // Dark border
    notification: "rgb(145, 142, 142)", // Red notification
  },
  fonts, // Keep consistent font structure
};