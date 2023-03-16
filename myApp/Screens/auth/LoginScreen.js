import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [active, setIsActive] = useState({
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
            style={{ ...styles.form, paddingBottom: isShowKeyboard ? 16 : 144 }}
          >
            <Text style={styles.formTitle}>Увійти</Text>
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
              placeholder={"Адреса електронної пошти"}
              placeholderTextColor={"#bdbdbd"}
              style={{
                ...styles.input,
                borderColor: active.email ? "#FF6C00" : "#E8E8E8",
              }}
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
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              placeholder={"Пароль"}
              placeholderTextColor={"#bdbdbd"}
              secureTextEntry={hidePass}
              style={{
                ...styles.input,
                borderColor: active.password ? "#FF6C00" : "#E8E8E8",
              }}
            />
            <Text style={styles.show} onPress={() => setHidePass(!hidePass)}>
              {!hidePass ? "Сховати" : "Показати"}
            </Text>

            <View style={{ display: isShowKeyboard ? "none" : "flex" }}>
              <TouchableOpacity
                style={{
                  ...styles.btnSubmit,
                }}
                activeOpacity={0.8}
                onPress={() => {
                  console.log(state);
                  setState(initialState);
                  navigation.navigate("Home");
                }}
              >
                <Text style={{ ...styles.btnTitle }}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8}>
                <Text
                  style={styles.linkToRegistration}
                  onPress={() => navigation.navigate("Register")}
                >
                  Не маєте акаунт? Зареєструватись
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
    paddingTop: 32,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
  },
  input: {
    height: 50,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  show: {
    position: "absolute",
    right: 32,
    top: 182,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btnSubmit: {
    marginTop: 27,
    marginBottom: 16,
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  linkToRegistration: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
