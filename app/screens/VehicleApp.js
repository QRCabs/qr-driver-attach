import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";

function VehicleApp({ children, style, navigation }) {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imageUri2, setImageUri2] = useState(null);
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("driver_id").then((res) => setDriverId(res));
  }, []);

  const selectPhoto = async (ptype) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
    });
    console.log(result);
    if (!result.canceled) {
      if (ptype === "front") setImage(result.assets[0].uri);
      if (ptype === "right") setImage2(result.assets[0].uri);
      uploadImage(result.assets[0].uri, ptype);
    }
  };

  const uploadImage = async (img, ptype) => {
    if (!img) {
      Alert.alert("No image selected");
      return;
    }
    const response = await fetch(img);
    const blob = await response.blob();
    const storageRef = firebase
      .storage()
      .ref()
      .child("docs/" + driverId + "/" + Date.now() + ".jpg");
    try {
      await storageRef.put(blob);
      const imageUrl = await storageRef.getDownloadURL(); // Get the URL of the uploaded image
      if (ptype === "front") setImageUri(imageUrl);
      if (ptype === "right") setImageUri2(imageUrl);
    } catch (error) {
      Alert.alert("Error uploading image", error.message);
      console.error(error);
    }
  };

  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem("completed", JSON.stringify({ ...store, vehicleApp: true }))
      .then(() => navigation.navigate("details"))
      .catch((err) => console.log(err));
    AsyncStorage.setItem("vehicleApp_url", JSON.stringify({ imageUri, imageUri2 }));
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, paddingHorizontal: 15 },
        style,
      ]}
    >
      {children}
      <View style={{ width: "100%", height: 45, backgroundColor: "white", marginTop: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Appearance</Text>
      </View>
      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>Upload clear vehicles pictures from all sides (i.e.font,back and sideways)</Text>
        <Text style={{ fontSize: 14, fontWeight: "400", color: "#C6BEC3", paddingTop: 10 }}>
          Click anywhere in this box to upload 2 pictures of vehicle
        </Text>
      </View>
      <View style={{ height: 340, width: "100%", paddingTop: 50 }}>
        <View style={{ height: 140, width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => selectPhoto()}>
            {!image && (
              <View
                style={{
                  padding: 50,
                  borderWidth: 2,
                  borderColor: "#064347",
                  alignItems: "center",
                  borderStyle: "dashed",
                }}
              >
                <Image style={{ height: 32.9, width: 32.9 }} source={require("../../assets/uplaod.png")}></Image>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>Front side</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {image && <Image style={{ width: 132, height: 114 }} source={{ uri: image }}></Image>}

          <TouchableOpacity onPress={() => selectPhoto()}>
            {!image2 && (
              <View
                style={{
                  padding: 50,
                  borderWidth: 2,
                  borderColor: "#064347",
                  alignItems: "center",
                  borderStyle: "dashed",
                }}
              >
                <Image style={{ height: 32.9, width: 32.9 }} source={require("../../assets/uplaod.png")}></Image>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>Right side</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {image2 && <Image style={{ width: 132, height: 114 }} source={{ uri: image2 }}></Image>}
        </View>
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

export default VehicleApp;
