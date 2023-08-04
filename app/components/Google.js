import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";

function Google({ imag, text, paddingLeft }) {
  return (
    <TouchableOpacity style={{ height: 60, width: "100%", paddingLeft: 10, alignItems: "center" }}>
      <View style={{ height: 48, width: 151, backgroundColor: "white", paddingLeft: paddingLeft, elevation: 5, justifyContent: "center" }}>
        <View style={{ height: 22, width: "60%", flexDirection: "row", justifyContent: "center" }}>
          <Image style={{ height: 24, width: 24 }} source={{ uri: imag }}></Image>

          <View style={{ paddingLeft: 10, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "black" }}>{text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Google;
