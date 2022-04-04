import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";
import { setLocation as setLocationStorage } from "../services/location-storage";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  const markLocation = async () => {
    setLoading(true);

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.Highest,
    });
    await setLocationStorage(location);
    setLoading(false);
    setErrorMsg(null);
    console.log("location ", location);
    //@ts-ignore
    navigation.navigate("history");
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 100 }}>
        {loading ? <ActivityIndicator size="large" /> : null}
        {errorMsg ? <Text>{errorMsg}</Text> : null}
      </View>
      <Button
        title="Mark your location"
        onPress={markLocation}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
