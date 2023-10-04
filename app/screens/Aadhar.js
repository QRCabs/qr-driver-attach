import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import TwoSidedDocs from "../components/TwoSidedDocs";

function Aadhar({ children, style, navigation }) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const selectPhoto = async (ptype) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      ptype === "front"
        ? setFrontImage(result.assets[0].uri)
        : setBackImage(result.assets[0].uri);
    }
  };

  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem(
      "completed",
      JSON.stringify({ ...store, aadhar: true })
    )
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
          paddingHorizontal: 10,
        },
        style,
      ]}
    >
      {children}
      <View style={{ justifyContent: "space-between", flex: 0.7 }}>
        <View
          style={{
            width: "100%",
            height: 45,
            backgroundColor: "white",
            paddingLeft: 15,
            marginTop: 40,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "400" }}>Aadhar Card</Text>
        </View>
        <View style={{ paddingLeft: 15, paddingTop: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>
            1. Upload clear picture of document
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "400" }}>
            2. Uploaded files shouldn't be more than 5mb and it should be belong
            to JPG,JPEG,PNG,PDF,type only
          </Text>
        </View>

        <TwoSidedDocs
          frontImage={frontImage}
          backImage={backImage}
          setFrontImage={setFrontImage}
          setBackImage={setBackImage}
          selectPhoto={selectPhoto}
        />
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Aadhar Card No</Text>
        <View
          style={{
            width: 360,
            height: 37,
            paddingHorizontal: 5,
            backgroundColor: "white",
            flexDirection: "row",
            borderWidth: 2,
            borderRadius: 5,
            borderColor: "#064347",
            marginBottom: 50,
          }}
        >
          <TextInput
            style={{ fontSize: 14, fontWeight: "400" }}
            placeholder={"Enter your aadhar number here"}
            onChangeText={() => {}}
          />
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
            <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  removeImageBtn: {
    position: "absolute",
    right: -5,
    top: -5,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 15,
  },
});

export default Aadhar;
