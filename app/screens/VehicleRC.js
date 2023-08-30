import React, { useState } from "react";
import { View, Text, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

function VehicleRC({ children, style, navigation }) {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    console.log(result);
    if (!image) {
      setImage(result.assets[0].uri);
    } else {
      setImage2(result.assets[0].uri);
    }
  };

  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem("completed", JSON.stringify({ ...store, vehicleRC: true }))
      .then(() => navigation.navigate("details"))
      .catch((err) => console.log(err));
    AsyncStorage.setItem("vehicleRC_url", JSON.stringify({ imageUri, image2Uri }));
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
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Upload Vehicle Fitness & Pollution</Text>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>1. Upload clear picture of document</Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>2. Photocopies and printouts are not accepted</Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>3. Both sides of RC is compulsory</Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          4. Uploaded files shouldn't be more than 5mb and it should be belong to JPG,JPEG,PNG,PDF,type only
        </Text>
      </View>
      <View style={{ paddingTop: 15, justifyContent: "center", alignItems: "center" }}>
        {!image && (
          <TouchableOpacity onPress={() => selectPhoto()} style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
            <View
              style={{
                padding: 100,
                borderWidth: 2,
                borderColor: "#064347",
                alignItems: "center",
                borderStyle: "dashed",
                justifyContent: "center",
              }}
            >
              <Image style={{ height: 64, width: 64 }} source={require("../../assets/uplaod.png")}></Image>
              <View style={{ paddingTop: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: "400" }}>Click anywhere in this box to upload insurance document</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: "100%", height: 150, backgroundColor: "white", paddingTop: 20, flexDirection: "row" }}>
        {image && (
          <View style={{ height: 100, width: 80, paddingRight: 10 }}>
            <Image style={{ height: 83, width: 65 }} source={{ uri: image }}></Image>
          </View>
        )}
        {image2 && (
          <View>
            <Image style={{ height: 83, width: 65 }} source={{ uri: image2 }}></Image>
          </View>
        )}
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
    </SafeAreaView>
  );
}

export default VehicleRC;
