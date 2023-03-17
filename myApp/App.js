import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useRoute } from "./router";
import { store } from "./redux/store";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute();

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        });
        SplashScreen.hideAsync();
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, []);

  if (!isReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });
