import React from "react";
import { View, Text, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity, BackHandler, ExpoUpdates } from "react-native";
import congo from "../../assets/Congrats.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Congrats({ children, style }) {
  const handleReload = () => {
    AsyncStorage.setItem("isRegistered", "true");

    if (Platform.OS === "ios") {
      ExpoUpdates.reloadAsync();
    } else {
      // For Android, use `BackHandler.exitApp()` to exit the app
      BackHandler.exitApp();
    }
  };

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          alignItems: "center",
        },
        style,
      ]}
    >
      {children}

      <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 80 }}>
        <Image source={congo} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 20 }}>
        <View style={{ width: "85%", height: 120, backgroundColor: "white" }}>
          <Text style={{ fontSize: 14, color: "#282828" }}>
            "Lorem ipsum dolor sit amet, consecteturb adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquat enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 200 }}>
        <View>
          <Text style={{ fontSize: 14, color: "#282828", fontWeight: "600" }}>*Kindly check within 24 hours after submission</Text>
        </View>
      </View>

      <View style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}>
        <TouchableOpacity
          onPress={handleReload}
          style={{
            width: 360,
            height: 57,
            backgroundColor: "#D6F22C",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 5,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Congrats;
