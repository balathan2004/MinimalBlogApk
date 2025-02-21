import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { styles } from "@/style/auth.module";
import { AuthResponseConfig } from "@/components/interfaces";
import { storeData } from "@/components/cred/cred_functions";
import { useRouter } from "expo-router";
import { useReplyContext } from "@/components/context/replyContext";
import { useTheme } from "@react-navigation/native";

const SignUp: FC = () => {
  const router = useRouter();
  const { setReply } = useReplyContext();
  const { colors } = useTheme();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleInput =
    (key: string) =>
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const inputValue = event.nativeEvent.text;

      setUserData((prevData) => ({
        ...prevData,
        [key]: inputValue,
      }));
    };

  const submitForm = async () => {
    if (!userData.email || !userData.password) {
      setReply("Please fill all fields");
      return;
    }

    const response = await fetch(
      "https://minimal-blog-ivory.vercel.app/api/auth/signUp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      }
    );
    const res = (await response.json()) as AuthResponseConfig;
    if (res) {
      setReply(res.message);
      if (res.status == 200) {
        storeData("USERCRED", res.credentials);
        router.push("/feeds");
      }
    }
  };

  return (
    <View style={styles.auth_container}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>Minimal Blog</Text>
        <Text style={[styles.title, { color: colors.text }]}>SignUp</Text>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter Email
          </Text>
          <TextInput
            onChange={handleInput("email")}
            style={[styles.input, { borderColor: colors.border,color:colors.text }]}
            keyboardType="email-address"
            autoCapitalize="none" // To prevent auto-capitalization
            autoComplete="email"
          />
        </View>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter Password
          </Text>
          <TextInput
            onChange={handleInput("password")}
            style={[styles.input, { borderColor: colors.border ,color:colors.text}]}
            keyboardType="visible-password"
            autoCapitalize="none" // To prevent auto-capitalization
            autoComplete="password"
          />
        </View>

        <View style={styles.button}>
          <Button title="SignUp" onPress={submitForm}></Button>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
