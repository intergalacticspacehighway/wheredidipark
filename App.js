import React from "react";
import { Root } from "./navigators/root";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";

// Check that service workers are supported
if (Platform.OS === "web" && "serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
