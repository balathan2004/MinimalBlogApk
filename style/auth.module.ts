import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  safearea: {
    marginTop: 50,
    backgroundColor: "inherit",
    position: "relative",
    width: "100%",
    display: "flex",
    height: "100%",
  },
  auth_container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 20,
    paddingBottom: 100,
  },
  input_container: {
    display: "flex",
    width: "80%",
    gap: 5,
    margin: "auto",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderBlockColor: "black",
    borderRadius: 4,
    paddingLeft: 5,
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 50,
    fontSize: 22,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
  },
  forget_password: {
    textAlign: "center",
    lineHeight: 50,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    width: "80%",
    margin: "auto",
  },
});
