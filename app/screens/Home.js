import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";

function Home({ children, style, navigation }) {
  const [lang, setLang] = useState("en");

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 30,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        style,
      ]}
    >
      {children}
      <View style={{ flex: 1, backgroundColor: "lightblue" }}>
        <View style={{ flex: 0.6, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../../assets/qrcabs-logo.png")} style={{ height: 100, width: 300 }} />
        </View>

        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ height: "100%", width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ height: 40 }}>
                <Text style={{ fontSize: 24, fontWeight: "400", color: "#282828" }}>Select Language</Text>
              </View>
              <View>
                <Image source={require("../../assets/Vector.png")}></Image>
              </View>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <RadioButton.Group>
                <RadioButton.Item
                  label="English"
                  value="en"
                  position="leading"
                  color="#064347"
                  labelStyle={{ textAlign: "left" }}
                  status={lang === "en" ? "checked" : "unchecked"}
                  onPress={() => setLang("en")}
                />
                <RadioButton.Item
                  label="Telugu"
                  value="tg"
                  position="leading"
                  color="#064347"
                  labelStyle={{ textAlign: "left" }}
                  status={lang === "tg" ? "checked" : "unchecked"}
                  onPress={() => setLang("tg")}
                />
                <RadioButton.Item
                  label="Hindi"
                  value="hn"
                  position="leading"
                  color="#064347"
                  labelStyle={{ textAlign: "left" }}
                  status={lang === "hn" ? "checked" : "unchecked"}
                  onPress={() => setLang("hn")}
                />
              </RadioButton.Group>
            </View>
            <View style={{ paddingTop: "30%" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("loginOpt")}
                style={{
                  width: "100%",
                  height: 57,
                  backgroundColor: "#D6F22C",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 5,
                  elevation: 5,
                }}
              >
                <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>{"Confirm"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;
