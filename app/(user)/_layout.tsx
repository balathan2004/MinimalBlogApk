import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function Layout() {
  const colors = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => {
        console.log("Current Route:", route); // Log the route object

        return {
          headerShown: true,
          headerTitle: "User Profile",
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
        };
      }}
    />
  );
}
