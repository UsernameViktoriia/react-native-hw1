import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

import Home from "./Screens/main/Home";
import CommentsScreen from "./Screens/nested/CommentsScreen";
import MapScreen from "./Screens/nested/MapScreen";

import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "./redux/auth/authOperations";

const Stack = createStackNavigator();
const NestedStack = createNativeStackNavigator();

export const useRoute = () => {
  const { state } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [state]);

  if (!state) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <NestedStack.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedStack.Screen name="MapScreen" component={MapScreen} />
    </NestedStack.Navigator>
  );
};
