import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import GenerateQRCode from "../components/GenerateQRCode";

function Main({ children, style }) {
  const [name, setName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("details")
      .then((res) => {
        const nm = JSON.parse(res).name;
        setName(nm);
      })
      .catch((err) => console.log(err));
  }, []);

  const qrData = { driver_id: "lskdjdksld353asd51dsa3d1d6a1d1as" };

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

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 100,
        }}
      >
        <Image
          source={require("../../assets/qrcabs-logo.png")}
          style={{ height: 70, width: 270 }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 20, color: "#282828" }}>
          Welcome, {name ? name : "User"}!
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 90,
        }}
      >
        <GenerateQRCode data={qrData} size={300} />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50,
        }}
      >
        <Text style={{ fontSize: 20, color: "#282828" }}>
          Scan This QR Code From Customer App
        </Text>
      </View>

      <View
        style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}
      >
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("isRegistered");
            AsyncStorage.removeItem("completed");
          }}
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
          <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Main;
