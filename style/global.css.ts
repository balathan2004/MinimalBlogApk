import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
  safearea: {
    margin: 0,
    flex: 1,
    position: "relative",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },
  snackbarContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it's on top
  },
  snackbar: {
    backgroundColor: "#333", // Snackbar background color
    color: "white",
    width: "95%",
    alignSelf: "center",
  },
  snackbar_text: {
    textTransform: "capitalize",
  },
  loader: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  centerText: {
    fontSize: 24,
    textAlign: "center",
  },
});
