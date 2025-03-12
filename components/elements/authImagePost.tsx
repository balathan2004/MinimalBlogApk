import React, { FC, useEffect, useState } from "react";
import { View, Text, Image, Pressable, Button } from "react-native";
import { styles } from "@/style/post.css";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "@react-navigation/native";

import { PostDataInterface } from "../interfaces";

interface Props {
  data: PostDataInterface;
}
export const timeConvert = (message: string, time: number | string) => {
  return `${message} ${formatDistanceToNow(new Date(time), {
    addSuffix: true,
  })}`;
};
const AuthImagePost: FC<Props> = ({ data }: Props) => {
  const router = useRouter();
  const { colors } = useTheme();
  const [aspectRatio, setAspectRatio] = useState(1); // Default square

  useEffect(() => {
    if (data.post_image_url) {
      Image.getSize(data.post_image_url, (width, height) => {
        setAspectRatio(width / height); // Calculate aspect ratio
      });
    }
  }, [data.post_image_url]);

  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <View style={styles.header_left}>
          <View>
            <Image
              style={[styles.profile_image, { borderColor: colors.text }]}
              source={{
                uri: `https://ui-avatars.com/api/?name=${data.post_user_name}&format=png`,
              }}
            ></Image>
          </View>
          <View>
            <Pressable>
              <Text style={[styles.username, { color: colors.text }]}>
                {data.post_user_name}
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={() => {
            router.push(`/your_posts/${data.post_name}`);
          }}
        >
          <Feather name="edit" size={24} color={colors.text} />
        </Pressable>
      </View>
      <View>
        <Image
          alt="image"
          style={[styles.content_image, { aspectRatio }]} // Only set aspect ratio
          source={{ uri: data.post_image_url }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_caption}>
          <Text style={[styles.captionContainer, { color: colors.text }]}>
            <Text style={[styles.username]}>{data.post_user_name} </Text>
            <Text style={styles.caption}>{data.post_caption}</Text>
          </Text>
        </View>
        <Text style={[styles.time_show, { color: colors.text }]}>
          {timeConvert("Created", data.post_time)}
        </Text>
      </View>
    </View>
  );
};

export default AuthImagePost;
