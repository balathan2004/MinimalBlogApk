// pages/profile/[id].js
import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, Button } from "react-native";
import {
  SinglePostResponseConfig,
  PostDataInterface,
} from "@/components/interfaces";
import { serverUrl } from "@/constants/env";
import { styles } from "@/style/profile.css";
import React, { useState, useEffect } from "react";
import SingleImagePost from "@/components/elements/singleImagePost";
import { style } from "@/style/global.css";
import EditPost from "@/components/elements/edit_post";

export default function UserProfile() {
  const { id } = useLocalSearchParams(); // Get the dynamic `id` from the route
  const [postData, setPostData] = useState<PostDataInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchFunction = async () => {
        const response = await fetch(
          `${serverUrl}/api/get_single_post?post_name=${id}`,
          {
            method: "GET",
          }
        );

        const res = (await response.json()) as SinglePostResponseConfig;
        if (res.status == 200) {
          setIsLoading(false);

          setPostData(res.postData);
        }
      };

      fetchFunction();
    }
  }, [id]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      {postData ? <EditPost data={postData}></EditPost> : null}
    </View>
  );
}
