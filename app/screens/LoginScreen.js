import React from "react";
import { View, Text, Image, SafeAreaView, Platform, StatusBar, TouchableOpacity } from "react-native";
import Google from "../components/Google";

function LoginScreen({ children, style, navigation }) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }, style]}>
      {children}
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ flex: 0.4, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../../assets/qrcabs-logo.png")} style={{ height: 100, width: 300 }} />
        </View>

        <View style={{ flex: 0.5, backgroundColor: "white" }}>
          <View style={{ height: 180, width: "100%" }}>
            <View style={{ paddingBottom: 40 }}>
              <Text style={{ fontSize: 24, fontWeight: "700", textAlign: "center" }}>Welcome to QRCabs</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("otpLogin")}
                style={{
                  width: "75%",
                  height: 57,
                  backgroundColor: "#D6F22C",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 5,
                  elevation: 5,
                }}
              >
                <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>Confirm With OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingBottom: 10, height: 90, width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>____________</Text>
              <View style={{ paddingTop: 14, paddingLeft: 20, paddingRight: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "400" }}>OR</Text>
              </View>
              <Text style={{ fontSize: 20 }}>____________</Text>
            </View>
          </View>

          <Google imag={"https://www.freepnglogos.com/uploads/new-google-logo-transparent--14.png"} text={"Google"} paddingLeft={4} />

          <View style={{ paddingTop: 10 }}>
            <Google imag={"https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-0.png"} text={"Facebook"} paddingLeft={20} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
