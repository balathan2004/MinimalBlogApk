import React, { useState, useEffect, FC } from "react";
import { styles } from "@/style/create_post.css";
import { style as globalStyle } from "@/style/global.css";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
  TouchableOpacity,
} from "react-native";
import SendFile from "@/components/fetching/sendFile";
import { useRouter } from "expo-router";
import { useReplyContext } from "@/components/context/replyContext";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useUserContext } from "@/components/context/userContext";
import { useTheme } from "@react-navigation/native";
import { useLoadingContext } from "@/components/context/loadingContext";

const CreatePost: FC = () => {
  const { userCred } = useUserContext();

  const [caption, setCaption] = useState("");
  const { setReply } = useReplyContext();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [showImage, SetShowImage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { colors } = useTheme();
  const { loading, setLoading } = useLoadingContext();

  useEffect(() => {
    // Check for permissions on component mount
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Grant gallery access to select media."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // Use the updated MediaType enum
      allowsMultipleSelection: false, // Restrict to selecting only one file
      quality: 1, // Full-quality image
    });

    if (!result.canceled) {
      // Convert the image to a Blob
      SetShowImage(result.assets[0].uri);

      setImage(result.assets[0]);
    }
  };

  const handleRequestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(status === "granted");

    if (status === "granted") {
      // Alert.alert("Permission Granted", "Gallery access granted.");
      openImagePicker();
      // imagePicker();
    } else {
      Alert.alert("Permission Denied", "Gallery access is restricted.");
    }
  };

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setCaption(event.nativeEvent.text);
  };

  const handleSubmit = async () => {
    if (image && userCred && caption) {
      try {
        setLoading(true);
        const formData = new FormData();

        const file = {
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        };

        formData.append("file", file as any);
        formData.append("caption", caption);
        formData.append("userId", userCred.uid);
        formData.append("username", userCred.display_name);

        const res = await SendFile({
          data: formData,
          route:
            "https://file-handler-server-production.up.railway.app/minimal_blog/create_post",
        });
        setLoading(false);
        if (res.status === 200) {
          setReply(res.message);
          setMessage("post created successfully");
          router.push("/(tabs)/feeds");
          // Handle successful post submission, e.g., navigate to a different screen
        } else {
          setReply(res.message); // Handle error message from server
          setMessage(res.message);
        }
      } catch (error) {
        console.error(error);
        setReply("An error occurred. Please try again."); // Display a generic error message to the user
      } finally {
        // setIsLoading(false); // Hide loading indicator
      }
    } else {
      setReply("Please Fill All Fields");
      setMessage("Please Fill All Fields");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <View style={globalStyle.container}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            Create post
          </Text>
          <Text style={[styles.label, { color: colors.text }]}>
            {message ? message : ""}
          </Text>
        </View>

        <View style={styles.input_container}>
          <TouchableOpacity
            style={styles.select_btn}
            onPress={handleRequestPermission}
          >
            <MaterialIcons name="cloud-upload" size={24} color="black" />
            <Text style={[styles.select_txt, { color: colors.text }]}>
              Select image
            </Text>
          </TouchableOpacity>

          {showImage ? (
            <Image style={styles.image} source={{ uri: showImage }}></Image>
          ) : (
            <Text style={[styles.label, { color: colors.text }]}>
              No image selected
            </Text>
          )}
        </View>

        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Type something
          </Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.text, color: colors.text },
            ]}
            onChange={handleInput}
          ></TextInput>
          <Button
            title="Post"
            disabled={loading ? true : false}
            onPress={handleSubmit}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default CreatePost;
