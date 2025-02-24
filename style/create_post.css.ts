import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingBottom: 100,
  },
  input_container: {
    display: "flex",
    width: "90%",
    gap: 10,
    marginTop: 20,
    marginHorizontal: "auto",
  },
  image: {
    minHeight: 350,
    height: "auto",
    width: "auto",
    objectFit: "contain",
  },

  title: {
    textAlign: "center",
    fontSize: 22,
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
  },

  button: {},
  select_btn: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    padding: 10,
    borderRadius: 4,
    backgroundColor: "skyblue",
  },
  select_txt: {
    marginLeft: 10,
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderRadius: 4,
    paddingLeft: 5,
  },
});
