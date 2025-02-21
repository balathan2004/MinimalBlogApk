import React, { useEffect } from "react";
import { useUserContext } from "@/components/context/userContext";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoadingContext } from "@/components/context/loadingContext";
import { UserDataInterface } from "@/components/interfaces";
const image = require("../assets/images/logo.png");
import { Image, StyleSheet, View } from "react-native";
import { style } from "@/style/global.css";
export default function Index() {
  const { setUserCred } = useUserContext();
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        setLoading(true);
        const userCredString = await AsyncStorage.getItem("USERCRED");
        const parsedUserCred = userCredString
          ? (JSON.parse(userCredString) as UserDataInterface)
          : null;

        if (parsedUserCred) {
          setUserCred(parsedUserCred);
          router.replace("/(tabs)/feeds"); // Navigate to tabs if logged in
        } else {
          router.replace("/(auth)/"); // Navigate to auth if not logged in
        }
      } catch (error) {
        console.error("Error checking user login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLogin();
  }, []);

  return (
    <View style={style.container}>
      <View style={styles.home_container}>
        <Image style={styles.image} source={image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    maxWidth: 400,
    maxHeight: 400,
    height: "100%",
    width: "100%",
    aspectRatio: 1 / 1,
    objectFit: "fill",
  },
});
