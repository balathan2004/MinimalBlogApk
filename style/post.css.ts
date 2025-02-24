import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  post_container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  post: {
    width: "100%",
    height: "auto",
    padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  profile_image: {
    borderRadius: 100,
    height: 55,
    width: 55,
    resizeMode: "cover",
  },
  header_left: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  img_container: {},
  content_image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1, // Adjust to maintain ratio dynamically
    resizeMode: "contain",
    borderRadius: 4,
  },
  footer: {
    paddingTop: 10,
  },
  footer_icons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    cursor: "pointer",
  },
  footer_icons_left: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  footer_caption: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  captionContainer: {
    flexShrink: 1,
    marginVertical:5
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  time_show: { fontSize: 14 },
});
