import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Main } from "./main";

const Stack = createNativeStackNavigator();

export function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
