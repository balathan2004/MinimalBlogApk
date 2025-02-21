import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 10,
    color: "white",
    marginBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 16,
  },

  title: {
    color: "black",
    textAlign: "center",
    lineHeight:50,
    fontSize: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginVertical: 20,
    padding:10
  },
  username: {
    color: "black",
    fontSize: 18,
    lineHeight: 35,
  },
  joined: {
    color: "black",
    fontSize: 16,
    lineHeight: 35,
  },
  count: {
    color: "black",
    fontSize: 16,
    lineHeight: 35,
  },

  headerLeft: {},
  headerRight: {},

  image: {
    borderRadius: 100,
    height: 65,
    width: 65,
    objectFit: "fill",
  },
});
