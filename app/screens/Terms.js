import React, { useState } from "react";
import { View, Text, SafeAreaView, Platform, StatusBar, Image, Linking, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from "react-native";

function Terms({ children, style, navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  const submitTC = () => {
    if (isChecked && isChecked2) navigation.navigate("vehicle");
    else Alert.alert("Please Select the checkboxes!");
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }, style]}>
      {children}
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ width: "100%", height: 120, backgroundColor: "white", alignItems: "center", justifyContent: "center", paddingTop: 30 }}>
          <Image style={{ height: 32.52, width: 51.58 }} source={require("../../assets/Vector2.png")}></Image>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "400" }}>Terms and conditions</Text>
        </View>
        <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu."
          </Text>
        </View>
        <TouchableOpacity
          style={{ paddingVertical: 25, alignItems: "center" }}
          onPress={() => {
            Linking.openURL("https://google.com");
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#064347", textDecorationLine: "underline" }}>Read full terms & condition</Text>
        </TouchableOpacity>
        <View style={{ width: "100%", height: 50, backgroundColor: "white", flexDirection: "row", paddingTop: 15, paddingLeft: 20 }}>
          <View style={{ width: 22, height: 22, backgroundColor: "white" }}>
            <Checkbox value={isChecked} onValueChange={setChecked} color={isChecked ? "#D6F22C" : undefined} />
          </View>
          <Text style={{ paddingLeft: 4 }}>I agree with Terms and condition</Text>
        </View>
        <View style={{ width: "100%", height: 50, backgroundColor: "white", flexDirection: "row", paddingTop: 15, paddingLeft: 20 }}>
          <View style={{ width: 22, height: 22 }}>
            <Checkbox value={isChecked2} onValueChange={setChecked2} color={isChecked2 ? "#D6F22C" : undefined} />
          </View>
          <Text style={{ paddingLeft: 4, fontSize: 14 }}>I agree with </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: "#064347", textDecorationLine: "underline" }}>Privacy policy</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", height: 100, paddingTop: 200 }}>
          <View style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}>
            <TouchableOpacity
              onPress={submitTC}
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
      </View>
    </SafeAreaView>
  );
}

export default Terms;
