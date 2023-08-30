import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Text, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from "react-native-paper";

function PrevVehicle({ children, style, navigation }) {
  const [tType, setTType] = useState("");
  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem("completed", JSON.stringify({ ...store, prevVeh: true }))
      .then(() => navigation.navigate("details"))
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingHorizontal: 15,
        },
        style,
      ]}
    >
      {children}
      <View style={{ justifyContent: "space-between", flex: 0.8 }}>
        <View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "400", marginBottom: 20 }}>Previously Driven Vehicle</Text>
            <Text style={{ fontSize: 16, fontWeight: "400", marginBottom: 20 }}>Please enter the details of your most driven vehicle.</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>Manufacturer</Text>
            <View
              style={{
                width: "100%",
                padding: 15,
                backgroundColor: "white",
                flexDirection: "row",
                borderWidth: 2,
                borderRadius: 5,
                borderColor: "#064347",
              }}
            >
              <TextInput style={{ fontSize: 14, fontWeight: "400" }} placeholder={"Enter your Manufacturer here"} />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>Vehicle Model</Text>
            <View
              style={{
                width: "100%",
                padding: 15,
                backgroundColor: "white",
                flexDirection: "row",
                borderWidth: 2,
                borderRadius: 5,
                borderColor: "#064347",
              }}
            >
              <TextInput style={{ fontSize: 14, fontWeight: "400" }} placeholder={"Enter your Vehicle Model here"} />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>Driving Duration</Text>
            <View
              style={{
                width: "100%",
                padding: 15,
                backgroundColor: "white",
                flexDirection: "row",
                borderWidth: 2,
                borderRadius: 5,
                borderColor: "#064347",
              }}
            >
              <TextInput style={{ fontSize: 14, fontWeight: "400" }} placeholder={"Enter Driving Duration here"} />
            </View>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Transmission Type</Text>
          </View>
          <View style={{ marginLeft: -20 }}>
            <RadioButton.Group onValueChange={(type) => setTType(type)} value={tType}>
              <RadioButton.Item label="Manual" value="Manual" position="leading" color="#D6F22C" labelStyle={{ textAlign: "left" }} />
              <RadioButton.Item label="Automatic" value="Automatic" position="leading" color="#D6F22C" labelStyle={{ textAlign: "left" }} />
            </RadioButton.Group>
          </View>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={submit}
            style={{
              width: "75%",
              height: 57,
              backgroundColor: "white",
              borderRadius: 10,
              borderColor: "#064347",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 5,
              elevation: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PrevVehicle;
