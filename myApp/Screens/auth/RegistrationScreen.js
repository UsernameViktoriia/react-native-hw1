import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  console.log("navigation", navigation);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [active, setIsActive] = useState({
    login: false,
    email: false,
    password: false,
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        source={require("../../assets/images/photo_BG.jpg")}
        style={styles.image}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <View
            style={{ ...styles.form, paddingBottom: isShowKeyboard ? 16 : 78 }}
          >
            <View style={styles.avatar}>
              <TouchableOpacity style={styles.btnAddAvatar} activeOpacity={0.8}>
                <Image
                  style={styles.addAvatarIcon}
                  source={require("../../assets/images/addAvatarIcon.png")}
                ></Image>
              </TouchableOpacity>
            </View>
            <Text style={styles.formTitle}>Реєстрація</Text>
            <TextInput
              onFocus={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  login: true,
                }));
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  login: false,
                }));
                setIsShowKeyboard(false);
              }}
              value={state.login}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
              style={{
                ...styles.input,
                borderColor: active.login ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Логін"
              placeholderTextColor={"#bdbdbd"}
            />
            <TextInput
              onFocus={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  email: true,
                }));
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  email: false,
                }));
                setIsShowKeyboard(false);
              }}
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              style={{
                ...styles.input,
                borderColor: active.email ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Адреса електронної пошти"
              placeholderTextColor={"#bdbdbd"}
            />
            <TextInput
              onFocus={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  password: true,
                }));
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  password: false,
                }));
                setIsShowKeyboard(false);
              }}
              secureTextEntry={hidePass}
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              style={{
                ...styles.input,
                borderColor: active.password ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Пароль"
              placeholderTextColor={"#bdbdbd"}
            />
            <Text style={styles.show} onPress={() => setHidePass(!hidePass)}>
              {!hidePass ? "Сховати" : "Показати"}
            </Text>
            <View style={{ display: isShowKeyboard ? "none" : "flex" }}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => {
                  console.log(state);
                  setState(initialState);
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Text
                  style={styles.linkToLogin}
                  onPress={() => navigation.navigate("Login")}
                >
                  Вже маєте акаунт? Увійти
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
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
    transform: [{ translateX: -50 }],
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btnAddAvatar: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 14,
    transform: [{ translateX: 12 }],
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
    fontFamily: "Roboto-Medium",
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  show: {
    position: "absolute",
    right: 32,
    top: 308,
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  linkToLogin: {
    textAlign: "center",
    // fontWeight: 400,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
