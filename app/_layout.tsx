import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { useColorScheme, SafeAreaView, StatusBar } from "react-native";
import ReplyHolder from "@/components/context/replyContext";
import SnackBarComponent from "@/components/elements/snackbar";
import UserCredHolder from "@/components/context/userContext";
import { style } from "@/style/global.css";
import LoadingHolder from "@/components/context/loadingContext";
import LoadingIndicator from "@/components/elements/loadingComponent";
export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch((error) =>
        console.error("Error hiding splash screen:", error)
      );
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <SafeAreaView style={style.safearea}>
        <UserCredHolder>
          <ReplyHolder>
            <LoadingHolder>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <SnackBarComponent />
                <LoadingIndicator />

                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="(posts)" />
                  <Stack.Screen
                    name="(user)"
                    options={{ headerShown: false }}
                  ></Stack.Screen>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar
                  translucent={true}
                  backgroundColor={
                    colorScheme === "dark" ? "#000000" : "#ffffff"
                  }
                />
              </ThemeProvider>
            </LoadingHolder>
          </ReplyHolder>
        </UserCredHolder>
      </SafeAreaView>
    </PaperProvider>
  );
}
