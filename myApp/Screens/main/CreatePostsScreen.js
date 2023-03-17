import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  View,
} from "react-native";
import { storage, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import { MaterialIcons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      console.log("locationUse", location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Camera.getCameraPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    } catch (err) {
      console.log(err.message);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const postId = uuid.v4().split("-").join("");

      const response = await fetch(photo);
      const file = await response.blob();

      const storageRef = await ref(storage, `posts/${postId}`);

      await uploadBytesResumable(storageRef, file);

      const photo = await getDownloadURL(storageRef);

      const location = await Location.getCurrentPositionAsync({});

      return { photo, location };
    } catch (err) {
      console.log(err);
    }
  };

  const createPost = async () => {
    try {
      const { photo, location } = await uploadPhotoToServer();
      await addDoc(collection(db, "posts"), {
        photo,
        name: title,
        place,
        location,
        userId,
        login,
        comments: 0,
        likes: [],
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const uploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const reset = () => {
    setPhoto("");
    setTitle("");
    setPlace("");
  };

  const onSubmit = async () => {
    try {
      reset();
      await createPost();
      reset();
      setLoading(false);
      navigation.navigate("Публікації");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsKeyboardShown(false);
      }}
    >
      <View style={styles.container}>
        <Camera
          style={{
            ...styles.camera,
            display: isKeyboardShown ? "none" : "flex",
          }}
          ref={setCamera}
        >
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <MaterialIcons
              name="photo-camera"
              size={20}
              style={styles.takePhotoOut}
            />
          </TouchableOpacity>
          {photo && (
            <View style={styles.newImg}>
              <Image source={{ uri: photo }} style={styles.newImg} />
            </View>
          )}
        </Camera>
        {photo ? (
          <Text style={styles.textInPhoto} onPress={() => console.log("ok")}>
            Редагувати фото
          </Text>
        ) : (
          <TouchableOpacity onPress={() => uploadPhoto()}>
            <Text style={styles.textInPhoto}>Завантажте фото</Text>
          </TouchableOpacity>
        )}
        <View style={styles.place}>
          <TextInput
            style={styles.text}
            onFocus={() => setIsKeyboardShown(true)}
            onBlur={() => setIsKeyboardShown(false)}
            onChangeText={(text) => setTitle(text)}
            placeholder="Назва..."
            value={title}
          />
        </View>

        <View style={styles.place}>
          <FontAwesome5
            name="map-marker-alt"
            size={24}
            color="#BDBDBD"
            style={styles.mapIcon}
          />

          <TextInput
            style={styles.text}
            onFocus={() => setIsKeyboardShown(true)}
            onBlur={() => setIsKeyboardShown(false)}
            onChangeText={(text) => setPlace(text)}
            placeholder="Місцевість..."
            value={place}
          />
        </View>

        <View style={styles.wrapBottom}>
          <TouchableOpacity
            title="Go to Posts"
            disabled={!(photo && title && place)}
            onPress={onSubmit}
            style={{
              ...styles.buttonReg,
              backgroundColor: !(photo && title && place)
                ? "#F6F6F6"
                : "#FF6C00",
              color: !(photo && title && place) ? "#BDBDBD" : "#FFFFFF",
            }}
          >
            <Text
              style={{
                ...styles.textBtn,

                color: !(photo && title && place) ? "#BDBDBD" : "#FFFFFF",
              }}
            >
              ОПУБЛІКУВАТИ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footer} onPress={reset}>
            <AntDesign name="delete" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  camera: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    //   borderRadius: 8,
    marginTop: 32,
  },
  button: {
    padding: 20,
    position: "absolute",
    left: 150,
    top: 110,
    height: 60,
    width: 60,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
  },

  takePhotoOut: {
    color: "#BDBDBD",
  },
  newImg: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  place: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  mapIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  text: {
    width: 300,
    color: "#212121",
    paddingBottom: 15,
    fontSize: 16,
  },
  textInPhoto: {
    color: "#BDBDBD",
    paddingBottom: 30,
    paddingTop: 8,
    fontSize: 16,
  },
  wrapBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonReg: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,

    width: "100%",
    height: 51,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  footer: {
    height: 40,
    width: 70,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 16,
  },
});
