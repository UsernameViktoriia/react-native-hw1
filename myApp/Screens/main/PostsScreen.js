import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import {
  collection,
  getDocs,
  getDoc,
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { pathSlice } from "../../redux/auth/pathReducer";
import { db } from "../../firebase/config";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const { email, login, avatar, userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };

  const addLike = async (id) => {
    const result = await getDoc(doc(db, "posts", `${id}`));
    if (result.data().likes.includes(`${userId}`)) {
      await updateDoc(doc(db, "posts", `${id}`), {
        likes: arrayRemove(`${userId}`),
      });
    } else {
      await updateDoc(doc(db, "posts", `${id}`), {
        likes: arrayUnion(`${userId}`),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        getAllPosts();
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.userBox}
          onPress={() => navigation.navigate("Profile")}
        >
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{
                height: 60,
                width: 60,
                borderRadius: 16,
              }}
            ></Image>
          ) : (
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 16,
                backgroundColor: "#515151",
              }}
            ></View>
          )}
          <View style={{ marginLeft: 8 }}>
            <Text
              style={{
                color: "#212121",
                fontFamily: "Roboto-Regular",
                fontSize: 20,
              }}
            >
              {login}
            </Text>
            <Text style={{ color: "#515151", fontSize: 11 }}>{email}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 30 }}>
              <Image
                source={{ uri: item.photo }}
                style={{ height: 240, borderRadius: 8 }}
              />
              <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 18, marginBottom: 11 }}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.postInfoBox}>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate("CommentsScreen", {
                        photo: item.photo,
                        id: item.id,
                      });
                    }}
                  >
                    <Feather name="message-circle" size={24} color="#FF6C00" />
                  </TouchableWithoutFeedback>

                  <Text style={{ ...styles.textPost, marginRight: 27 }}>
                    {item.comments || 0}
                  </Text>

                  <TouchableOpacity onPress={() => addLike(item.id)}>
                    {item.likes.includes(`${userId}`) ? (
                      <SimpleLineIcons name="like" size={24} color="#FF6C00" />
                    ) : (
                      <SimpleLineIcons name="like" size={24} color="#212121" />
                    )}
                  </TouchableOpacity>

                  <Text style={{ ...styles.textPost }}>
                    {item.likes?.length || 0}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "baseline" }}
                  onPress={() => {
                    navigation.navigate("MapScreen", {
                      location: item.location,
                      title: item.place,
                    });
                    dispatch(pathSlice.actions.setPath({ path: route.name }));
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
  userBox: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
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
