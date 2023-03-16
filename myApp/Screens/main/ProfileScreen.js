import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function ProfileScreen() {
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
        <Text>ProfileScreen</Text>
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
  //   formTitle: {
  //     textAlign: "center",
  //     color: "#212121",
  //     fontSize: 30,
  //     marginBottom: 33,
  //     fontFamily: "Roboto-Medium",
  //     lineHeight: 35,
  //   },
  //   btnSubmit: {
  //     marginTop: 27,
  //     marginBottom: 16,
  //     padding: 16,
  //     borderRadius: 100,
  //     alignItems: "center",
  //     backgroundColor: "#FF6C00",
  //   },
  //   btnTitle: {
  //     fontFamily: "Roboto-Regular",
  //     fontSize: 16,
  //     lineHeight: 19,
  //     color: "#FFFFFF",
  //   },
  //   linkToRegistration: {
  //     textAlign: "center",
  //     fontFamily: "Roboto-Regular",
  //     fontSize: 16,
  //     lineHeight: 19,
  //     color: "#1B4371",
  //   },
});
