import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

export default function Home({ navigation }) {
  console.log("navigation", navigation);
  const dispatch = useDispatch();

  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return focused ? (
              <Ionicons name="grid-outline" size={size} color="#FF6C00" />
            ) : (
              <Ionicons name="grid-outline" size={size} color={color} />
            );
          },
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#212121"
              style={{ marginRight: 20 }}
              onPress={() => dispatch(authSignOutUser())}
            />
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return focused ? (
              <AntDesign name="plus" size={size} color="#FF6C00" />
            ) : (
              <AntDesign name="plus" size={size} color={color} />
            );
          },
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return focused ? (
              <Ionicons name="person-outline" size={size} color="#FF6C00" />
            ) : (
              <Ionicons name="person-outline" size={size} color={color} />
            );
          },
        }}
        name="Profile"
        component={ProfileScreen}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
}
