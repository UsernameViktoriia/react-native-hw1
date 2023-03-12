import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  return (
    <ImageBackground
      source={require("../assets/images/photo_BG.jpg")}
      style={styles.image}
    >
      <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{ ...styles.form, paddingBottom: isShowKeyboard ? 115 : 66 }}
        >
          <View style={styles.avatar}>
            <TouchableOpacity style={styles.btnAddAvatar} activeOpacity={0.8}>
              <Image
                style={styles.addAvatarIcon}
                source={require("../assets/images/addAvatarIcon.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.formTitle}>Реєстрація</Text>
          <TextInput
            onFocus={() => setIsShowKeyboard(true)}
            style={styles.input}
            placeholder="Логін"
            placeholderTextColor={"#bdbdbd"}
          />
          <TextInput
            onFocus={() => setIsShowKeyboard(true)}
            style={styles.input}
            placeholder="Адреса електронної пошти"
            placeholderTextColor={"#bdbdbd"}
          />
          <TextInput
            onFocus={() => setIsShowKeyboard(true)}
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor={"#bdbdbd"}
          />
          <Text style={styles.show} onPress={() => setHidePass(!hidePass)}>
            {!hidePass ? "Сховати" : "Показати"}
          </Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.btnTitle}>Зареєструватися</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.linkToLogin}>Вже маєте акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    padding: 16,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    left: "50%",
    top: -60,
    // transform: "translate(-50%, 0)",

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btnAddAvatar: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 14,
    // transform: "translate(50%, 0)",
    zIndex: 1000,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  addAvatarIcon: {
    width: 13,
    height: 13,
  },
  formTitle: {
    marginTop: 76,
    marginBottom: 33,
    textAlign: "center",
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    // letterSpacing: "0.01em",
    color: "#212121",
  },
  input: {
    height: 50,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  show: {
    position: "absolute",
    right: 32,
    top: 308,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  button: {
    marginTop: 27,
    marginBottom: 16,
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  linkToLogin: {
    textAlign: "center",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
