import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrivingLicenseNo = ({ children, style, navigation, route }) => {
  console.log(route);
  const [licenseNo, setLicenseNo] = useState("");

  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem(
      "completed",
      JSON.stringify({ ...store, drivingLicenseNo: true })
    )
      .then(() => navigation.navigate("details", { mode: "Driver" }))
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        style,
      ]}
    >
      {children}
      <View
        style={{
          width: "100%",
          height: 45,
          backgroundColor: "white",
          paddingTop: 10,
          marginTop: 40,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "400" }}>
          Driving License number
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View
          style={{
            width: 360,
            height: 37,
            paddingLeft: 5,
            backgroundColor: "white",
            flexDirection: "row",
            borderWidth: 2,
            borderRadius: 5,
            borderColor: "#064347",
          }}
        >
          <TextInput
            style={{ fontSize: 14, fontWeight: "400" }}
            placeholder={"Enter your license number here"}
            value={licenseNo}
            onChangeText={setLicenseNo}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 100,
          }}
        >
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
            <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrivingLicenseNo;
