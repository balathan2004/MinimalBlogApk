import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Colors from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        // Dynamically hide the tab bar for specific screens
        // tabBarStyle: route.name === "wait_verify" ? { display: "none" } : {},
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <AntDesign name="login" size={24} color={colors.text} />
          ),
        }}
      />

      <Tabs.Screen
        name="signup"
        options={{
          title: "Register",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-edit" size={24} color={colors.text} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="wait_verify"
        options={{
          href: null,
        }}
      /> */}
    </Tabs>
  );
}
