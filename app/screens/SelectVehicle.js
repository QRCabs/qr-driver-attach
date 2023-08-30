import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, Platform, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, TouchableOpacity } from "react-native";

function SelectVehicle({ children, style, navigation }) {
  const [mode, setMode] = useState("");
  const selectMode = () => {
    if (mode !== "") navigation.push("details", { mode });
    else Alert.alert("Fields Missing", "Select Vehicle / Driver");
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }, style]}>
      {children}
      <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "400" }}>Select your vehicle</Text>
        </View>
        <View style={{ paddingTop: 25, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
          <View>
            <TouchableOpacity
              onPress={() => setMode("Car")}
              style={{
                backgroundColor: mode === "Car" ? "#D6F22C" : "white",
                height: 150,
                width: 150,
                borderRadius: 8,
                borderColor: "#064347",
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image style={{ width: 24, height: 24 }} source={require("../../assets/car.png")} />
              <View style={{ alignItems: "center", paddingTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "400" }}>Car</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setMode("Auto")}
              style={{
                backgroundColor: mode === "Auto" ? "#D6F22C" : "white",
                height: 150,
                width: 150,
                borderRadius: 8,
                borderColor: "#064347",
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image style={{ width: 24, height: 18 }} source={require("../../assets/auto.png")} />
              <View style={{ alignItems: "center", paddingTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "400" }}>Auto</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingTop: 50, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setMode("Bike")}
            style={{
              backgroundColor: mode === "Bike" ? "#D6F22C" : "white",
              height: 150,
              width: 150,
              borderRadius: 8,
              borderColor: "#064347",
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image style={{ width: 24, height: 18 }} source={require("../../assets/motorcycle.png")} />
            <View style={{ alignItems: "center", paddingTop: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>Bike</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 20 }}>
          <View style={{ flexDirection: "row", height: 50, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>_____________</Text>
            <View style={{ paddingTop: 14, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: 400 }}>OR</Text>
            </View>
            <Text style={{ fontSize: 20 }}>_____________</Text>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center", height: 40, width: "100%", paddingBottom: 20 }}>
            <Text style={{ fontSize: 14 }}>Register as a</Text>
          </View>

          <View style={{ width: "100%", alignItems: "center", paddingVertical: 20 }}>
            <TouchableOpacity
              onPress={() => setMode("Driver")}
              style={{
                backgroundColor: mode === "Driver" ? "#D6F22C" : "white",
                height: 150,
                width: 150,
                borderRadius: 8,
                borderColor: "#064347",
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image style={{ width: 21, height: 24 }} source={require("../../assets/Vector4x.png")} />
              <View style={{ alignItems: "center", paddingTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "400" }}>Driver</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}>
            <TouchableOpacity
              onPress={selectMode}
              style={{
                width: "85%",
                height: 57,
                backgroundColor: "#D6F22C",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 5,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SelectVehicle;
