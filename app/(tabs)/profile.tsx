import { View, Text, ScrollView, RefreshControl } from "react-native";
import {
  ProfileResponseConfig,
  UserDataInterface,
  PostDataInterface,
} from "@/components/interfaces";
import { styles as postStyle } from "@/style/profile.css";
import { style } from "@/style/global.css";
import { Image } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AuthImagePost, {
  timeConvert,
} from "@/components/elements/authImagePost";
import { useUserContext } from "@/components/context/userContext";
import { useTheme } from "@react-navigation/native";
import { useLoadingContext } from "@/components/context/loadingContext";

export default function HomeScreen() {
  const { userCred } = useUserContext();
  const [userData, setUserData] = useState<UserDataInterface | null>(null);
  const [postData, setPostData] = useState<PostDataInterface[] | null>(null);
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { setLoading } = useLoadingContext();

  const fetchFunction = async (isRefreshing = false) => {
    if (!userCred) return;

    if (!isRefreshing) setLoading(true);
    setRefreshing(true); //

    try {
      const response = await fetch(
        `https://minimal-blog-ivory.vercel.app/api/get_profile?userId=${userCred.uid}`,
        { method: "GET" }
      );
      const res = (await response.json()) as ProfileResponseConfig;

      if (res.status == 200) {
        setUserData(res.userData);
        setPostData(res.postData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Hide refresh indicator
    }
  };

  const onRefresh = useCallback(() => {
    fetchFunction(true);
  }, []);

  useEffect(() => {
    fetchFunction();
  }, [userCred]);

  return (
    <View style={style.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={[postStyle.title, { color: colors.text }]}>
          Your Profile
        </Text>

        <View style={postStyle.header}>
          <View style={postStyle.headerLeft}>
            <Image
              style={postStyle.image}
              source={{ uri: `${userData?.profile_url}}&format=png` }}
            ></Image>
          </View>
          <View style={postStyle.headerRight}>
            <Text style={[postStyle.username, { color: colors.text }]}>
              {userData ? userData.display_name : "unknown"}
            </Text>

            <Text style={[postStyle.count, { color: colors.text }]}>
              {postData?.length} posts
            </Text>

            <Text style={[postStyle.joined, { color: colors.text }]}>
              {userData
                ? `${timeConvert("Joined", userData.created_at)} `
                : null}
            </Text>
          </View>
        </View>

        <View>
          {postData?.map((item) => (
            <AuthImagePost data={item} key={item.post_name}></AuthImagePost>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
