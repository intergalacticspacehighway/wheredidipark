import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, History } from "../screens";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={20}
              color={focused ? "#2196f3" : "#b8b3b3"}
            />
          ),
          title: "Home",
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="time"
              size={20}
              color={focused ? "#2196f3" : "#b8b3b3"}
            />
          ),
          title: "History",
        }}
      />
    </Tab.Navigator>
  );
}
