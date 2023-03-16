import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ navigation }) {
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("CommentsScreen");
        }}
      >
        <Feather name="message-circle" size={24} color="black" />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("MapScreen");
        }}
      >
        <Feather name="map-pin" size={24} color="black" />
      </TouchableWithoutFeedback>
    </View>
  );
}

// const styles = StyleSheet.create({
//   text: {
//     textAlign: "center",
//     fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     lineHeight: 19,
//     color: "#1B4371",
//   },
// });
