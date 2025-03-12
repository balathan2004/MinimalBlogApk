import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function Layout() {
  const colors = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: "Your Posts",
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "none",
        },
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.colors.text}
            onPress={() => router.back()} // Handle back action
            style={{ marginLeft: 10, marginRight: 20 }}
          />
        ),
      }}
    ></Tabs>
  );
}
