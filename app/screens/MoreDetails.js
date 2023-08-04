import React from "react";
import { Entypo } from "@expo/vector-icons";
import { View, Text, SafeAreaView, Platform, StatusBar, Image, TextInput, TouchableOpacity } from "react-native";
import Accordion from "../components/Accordion";

function MoreDetails({ children, style, navigation, route }) {
  console.log(route.params);
  return (
    <SafeAreaView
      style={[
        { flex: 1, paddingHorizontal: 10, backgroundColor: "white", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
        style,
      ]}
    >
      {children}
      {/* <View style={{ width: "100%", height: 50, justifyContent: "space-between", flexDirection: "row", paddingLeft: 5 }}>
        <View style={{ paddingLeft: 10 }}>
          <Image style={{ height: 20, width: 24 }} source={require("../../assets/lines.png")} />
        </View>

        <View style={{ paddingLeft: 10 }}>
          <Image style={{ height: 36, width: 36 }} source={require("../../assets/QR-Cabs-Logo-Black.png")} />
        </View>

        <View style={{ paddingRight: 10 }}>
          <Image style={{ height: 36, width: 36 }} source={require("../../assets/notification.png")} />
        </View>
      </View> */}

      <View style={{ width: "100%", height: 40, backgroundColor: "white", paddingLeft: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "400" }}>Welcome John,</Text>
      </View>
      <View style={{ paddingLeft: 15, paddingTop: 20 }}>
        <View
          style={{ width: 336, height: 64, backgroundColor: "white", flexDirection: "row", borderWidth: 2, borderRadius: 10, borderColor: "#064347" }}
        >
          <View style={{ paddingLeft: 5, height: 64, width: 300, justifyContent: "center" }}>
            <TextInput style={{ fontSize: 20, fontWeight: "400" }} placeholder="Enter your vehicles detail" />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Entypo name="chevron-thin-down" size={24} color="black" />
          </View>
        </View>
      </View>

      <View style={{ paddingLeft: 15, paddingTop: 30 }}>
        <View
          style={{ width: 336, height: 64, backgroundColor: "white", flexDirection: "row", borderWidth: 2, borderRadius: 10, borderColor: "#064347" }}
        >
          <View style={{ paddingLeft: 5, height: 64, width: 300, justifyContent: "center" }}>
            <TextInput style={{ fontSize: 20, fontWeight: "400" }} placeholder="Complete your profile" />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Entypo name="chevron-thin-down" size={24} color="black" />
          </View>
        </View>
      </View>
      <Accordion title={"Enter Your vehicles details"}></Accordion>
      {/* <Butt Title={"Go to next"} onTouch={() => navigation.navigate("screen9")} backgroundColor={"#D6F22C"} elevation={5} /> */}
    </SafeAreaView>
  );
}

export default MoreDetails;
