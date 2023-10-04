import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import TwoSidedDocs from "../components/TwoSidedDocs";

function VehicleRC({ children, style, navigation }) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const selectPhoto = async (docSide) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    console.log(result);
    if (docSide === "front") {
      setFrontImage(result.assets[0].uri);
    } else {
      setBackImage(result.assets[0].uri);
    }
  };

  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem(
      "completed",
      JSON.stringify({ ...store, vehicleRC: true })
    )
      .then(() => navigation.navigate("details"))
      .catch((err) => console.log(err));
    AsyncStorage.setItem(
      "vehicleRC_url",
      JSON.stringify({ imageUri, image2Uri })
    );
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

      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          paddingTop: 40,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "400" }}>
          Upload Registration certificate (RC)
        </Text>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          1. Upload clear picture of document
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          2. Both sides of RC is compulsory
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          3. Uploaded files shouldn't be more than 5mb and it should be belong
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
    </SafeAreaView>
  );
}

export default VehicleRC;
