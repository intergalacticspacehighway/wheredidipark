import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationObject } from "expo-location";

const KEY = "locations";

export const setLocation = async (location: LocationObject) => {
  let locations = await getLocations();
  locations.unshift(location);
  AsyncStorage.setItem(KEY, JSON.stringify(locations));
};

export const getLocations = async () => {
  let locations;
  try {
    const temp = await AsyncStorage.getItem(KEY);
    locations = JSON.parse(temp) ?? [];
  } catch (e) {
    locations = [];
  }
  return locations as LocationObject[];
};

export const clearLocations = async () => {
  AsyncStorage.setItem(KEY, null);
};
