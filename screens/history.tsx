import { LocationObject } from "expo-location";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Button } from "react-native";
import * as LocationStorage from "../services/location-storage";
import * as Linking from "expo-linking";
import { useIsFocused } from "@react-navigation/core";
import format from "date-fns/format";

export function History() {
  const [locations, setLocations] = useState<LocationObject[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      (async () => {
        const temp = await LocationStorage.getLocations();
        setLocations(temp);
      })();
    }
  }, [isFocused]);

  const clearLocations = () => {
    setLocations([]);
    LocationStorage.clearLocations();
  };

  const openGeoURI = (location: LocationObject) => {
    Linking.openURL(
      `http://maps.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`
    );
  };

  return (
    <ScrollView style={{ paddingHorizontal: 20 }}>
      {locations.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text>No locations found</Text>
        </View>
      ) : null}
      {locations.map((l) => {
        return (
          <View
            key={l.timestamp}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <View>
              <Text>
                <Text style={{ fontWeight: "800" }}>Lat:</Text>{" "}
                {l.coords.latitude.toFixed(6)}{" "}
                <Text style={{ fontWeight: "800" }}>Lon:</Text>{" "}
                {l.coords.longitude.toFixed(6)}
              </Text>
              <Text>
                {format(new Date(l.timestamp), "do MMM yyyy hh:mm a")}
              </Text>
            </View>
            <Button title="Open in maps" onPress={() => openGeoURI(l)} />
          </View>
        );
      })}
      {locations.length > 0 ? (
        <View style={{ marginTop: 10 }}>
          <Button title="Clear history" onPress={clearLocations} />
        </View>
      ) : null}
    </ScrollView>
  );
}
