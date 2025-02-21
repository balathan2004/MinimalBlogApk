import { View, ActivityIndicator } from "react-native";
import { style } from "@/style/global.css";
import { useLoadingContext } from "../context/loadingContext";
export default function LoadingIndicator() {
  const { loading } = useLoadingContext();

  if (loading) {
    return (
      <View style={style.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }
}
