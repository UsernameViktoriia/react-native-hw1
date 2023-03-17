import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  console.log("route", route);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => {
          console.log("item", item);
          return (
            <View style={{ marginBottom: 30 }}>
              <Image
                source={{ uri: item.photo }}
                style={{ height: 240, borderRadius: 8 }}
              />
              <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 18, marginBottom: 11 }}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.postInfoBox}>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate("CommentsScreen", {
                        photo: item.photo,
                      });
                    }}
                  >
                    <Feather name="message-circle" size={24} color="#FF6C00" />
                  </TouchableWithoutFeedback>

                  <Text style={{ ...styles.textPost, marginRight: 27 }}>
                    {item.comments || 0}
                  </Text>

                  <TouchableOpacity>
                    <SimpleLineIcons name="like" size={24} color="#FF6C00" />
                  </TouchableOpacity>

                  <Text style={{ ...styles.textPost }}>0</Text>
                </View>

                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "baseline" }}
                  onPress={() => {
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    });
                  }}
                >
                  <Feather name="map-pin" size={24} color="black" />
                  <Text style={styles.textLocation}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    color: "#212121",
  },
  textPost: {
    fontSize: 16,
    marginLeft: 9,
  },
  textLocation: {
    marginLeft: 8,

    fontSize: 16,
    textDecorationLine: "underline",
  },
  postInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 11,
  },
});
