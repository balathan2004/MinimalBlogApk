import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  Alert,
} from "react-native";
import { styles } from "@/style/post.css";
import { style as globaleStyles } from "@/style/global.css";
import { formatDistanceToNow } from "date-fns";
import { useTheme } from "@react-navigation/native";
import { PostDataInterface, ResponseConfig } from "../interfaces";
import { TextInput } from "react-native-paper";
import { serverUrl } from "@/constants/env";

import { useLoadingContext } from "../context/loadingContext";
import { useReplyContext } from "../context/replyContext";
import { router } from "expo-router";

interface Props {
  data: PostDataInterface;
}
export const timeConvert = (message: string, time: number | string) => {
  return `${message} ${formatDistanceToNow(new Date(time), {
    addSuffix: true,
  })}`;
};
const EditPost: FC<Props> = ({ data }: Props) => {
  const [postData, setPostData] = useState(data);
  const { colors } = useTheme();
  const { setLoading } = useLoadingContext();
  const { setReply } = useReplyContext();
  const [isEdited, setIsEditted] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1); // Default square
  const [inputHeight, setInputHeight] = useState(50);
  const [caption, setCaption] = useState(postData.post_caption);

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = event.nativeEvent;
    if (text.length <= 500) {
      setCaption(text);
    }
  };

  const updatePost = async () => {
    if (!isEdited) {
      console.log("post not editted");
      return;
    }

    const updateData = {
      post_name: postData.post_name,
      post_user_id: postData.post_user_id,
      post_caption: caption.trim(),
    };

    const response = await fetch(`${serverUrl}/api/posts/update_post`, {
      method: "POST",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJson = (await response.json()) as ResponseConfig;

    setLoading(false);

    if (resJson) {
      setReply(resJson.message);
      if (resJson.status == 200) {
        setPostData((prev) => ({ ...prev, post_caption: caption.trim() }));
        setIsEditted(false);
      }
    }
  };

  const deletePost = async () => {
    const body = {
      post_user_id: postData.post_user_id,
      post_name: postData.post_name,
    };

    const response = await fetch(`${serverUrl}/api/posts/delete_post`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = (await response.json()) as ResponseConfig;
    alert(res.message)
    setReply(res.message);
    router.push("/(tabs)/profile")
  };

  const showConfirmationDialog = () => {
    Alert.alert(
      "Confirmation", // Title
      "Are you sure you want to proceed?", // Message
      [
        {
          text: "Cancel", // Button label
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel", // Makes the button a "cancel" button (bolded on iOS)
        },
        {
          text: "OK", // Button label
          onPress: () => deletePost(),
        },
      ],
      { cancelable: false } // Prevent dismissing by tapping outside the alert
    );
  };

  useEffect(() => {
    setIsEditted(caption.trim() !== postData.post_caption.trim());
  }, [caption, postData.post_caption]);

  useEffect(() => {
    if (postData.post_image_url) {
      Image.getSize(postData.post_image_url, (width, height) => {
        setAspectRatio(width / height); // Calculate aspect ratio
      });
    }
  }, [postData.post_image_url]);

  return (
    <View style={globaleStyles.container}>
      <View style={styles.post}>
        <View style={styles.header}>
          <View style={styles.header_left}>
            <View>
              <Image
                style={[styles.profile_image, { borderColor: colors.text }]}
                source={{
                  uri: `https://ui-avatars.com/api/?name=${postData.post_user_name}&format=png`,
                }}
              ></Image>
            </View>
            <View>
              <Text style={[styles.username, { color: colors.text }]}>
                {postData.post_user_name}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Image
            alt="image"
            style={[styles.content_image, { aspectRatio }]} // Only set aspect ratio
            source={{ uri: postData.post_image_url }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.input_container}>
          <TextInput
            label="Add Your Quote"
            value={caption}
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
            mode="outlined"
            style={[
              styles.input,
              {
                borderColor: colors.text,
                color: colors.text,
                height: Math.max(50, inputHeight),
              },
            ]}
            onChange={handleInput}
          ></TextInput>

          <View style={styles.button_view}>
            <Button
              onPress={updatePost}
              disabled={!isEdited}
              title="Save"
            ></Button>
          </View>
          <View style={styles.button_view}>
            <Button onPress={showConfirmationDialog} title="Delete"></Button>
          </View>

          <Text style={[styles.time_show, { color: colors.text }]}>
            {timeConvert("Created", postData.post_time)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EditPost;
