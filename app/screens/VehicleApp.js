import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";

function VehicleApp({ children, style, navigation }) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);
  const [leftImage, setLeftImage] = useState(null);
  const [frontImageUri, setFrontImageUri] = useState(null);
  const [backImageUri, setBackImageUri] = useState(null);
  const [rightImageUri, setRightImageUri] = useState(null);
  const [leftImageUri, setLeftImageUri] = useState(null);
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("driver_id").then((res) => setDriverId(res));
    AsyncStorage.getItem("vehicleApp_url").then((appearanceUrl) => {
      console.log(appearanceUrl);
      if (appearanceUrl != null) {
        const jsonData = JSON.parse(appearanceUrl);
        setFrontImage(jsonData.frontImageUri);
        setFrontImageUri(jsonData.frontImageUri);
        setBackImage(jsonData.backImageUri);
        setBackImageUri(jsonData.backImageUri);
        setRightImage(jsonData.rightImageUri);
        setRightImageUri(jsonData.rightImageUri);
        setLeftImage(jsonData.leftImageUri);
        setLeftImageUri(jsonData.leftImageUri);
      }
    });
  }, []);

  const selectPhoto = async (ptype) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.7,
      });
      console.log(result);
      if (!result.canceled) {
        if (ptype === "front") setFrontImage(result.assets[0].uri);
        if (ptype === "back") setBackImage(result.assets[0].uri);
        if (ptype === "right") setRightImage(result.assets[0].uri);
        if (ptype === "left") setLeftImage(result.assets[0].uri);
        uploadImage(result.assets[0].uri, ptype);
      }
    } catch (error) {
      return false;
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
      if (ptype === "front") setFrontImageUri(imageUrl);
      if (ptype === "back") setBackImageUri(imageUrl);
      if (ptype === "right") setRightImageUri(imageUrl);
      if (ptype === "left") setLeftImageUri(imageUrl);
    } catch (error) {
      Alert.alert("Error uploading image", error.message);
      console.error(error);
    }
  };

  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem(
      "vehicleApp_url",
      JSON.stringify({
        frontImageUri,
        backImageUri,
        rightImageUri,
        leftImageUri,
      })
    );
    AsyncStorage.setItem(
      "completed",
      JSON.stringify({ ...store, vehicleApp: true })
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
          paddingHorizontal: 15,
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
          marginTop: 40,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "400" }}>Appearance</Text>
      </View>
      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>
          Upload clear vehicles pictures from all sides (i.e.font,back and
          sideways)
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: "#C6BEC3",
            paddingTop: 10,
          }}
        >
          Click anywhere in this box to upload 4 pictures of vehicle
        </Text>
      </View>
      <View style={{ height: 500, width: "100%", paddingTop: 50 }}>
        <View
          style={{
            height: 140,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 70,
          }}
        >
          <TouchableOpacity onPress={() => selectPhoto("front")}>
            {!frontImage && (
              <View
                style={{
                  padding: 50,
                  borderWidth: 2,
                  borderColor: "#064347",
                  alignItems: "center",
                  borderStyle: "dashed",
                }}
              >
                <Image
                  style={{ height: 32.9, width: 32.9 }}
                  source={require("../../assets/uplaod.png")}
                ></Image>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    Front side
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {frontImage && (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setFrontImage(null)}
              >
                <Text>X</Text>
              </TouchableOpacity>
              <Image
                style={{ width: 132, height: 114, borderRadius: 7 }}
                source={{ uri: frontImage }}
              ></Image>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#C6BEC3",
                  paddingTop: 10,
                }}
              >
                Front side
              </Text>
            </View>
          )}

          <TouchableOpacity onPress={() => selectPhoto("back")}>
            {!backImage && (
              <View
                style={{
                  padding: 50,
                  borderWidth: 2,
                  borderColor: "#064347",
                  alignItems: "center",
                  borderStyle: "dashed",
                }}
              >
                <Image
                  style={{ height: 32.9, width: 32.9 }}
                  source={require("../../assets/uplaod.png")}
                ></Image>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    Back side
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {backImage && (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setBackImage(null)}
              >
                <Text>X</Text>
              </TouchableOpacity>
              <Image
                style={{ width: 132, height: 114, borderRadius: 7 }}
                source={{ uri: backImage }}
              ></Image>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#C6BEC3",
                  paddingTop: 10,
                }}
              >
                Back side
              </Text>
            </View>
          )}
        </View>
        {/* second row */}
        <View
          style={{
            height: 140,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => selectPhoto("right")}>
            {!rightImage && (
              <View
                style={{
                  padding: 50,
                  borderWidth: 2,
                  borderColor: "#064347",
                  alignItems: "center",
                  borderStyle: "dashed",
                }}
              >
                <Image
                  style={{ height: 32.9, width: 32.9 }}
                  source={require("../../assets/uplaod.png")}
                ></Image>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    Right side
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {rightImage && (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setRightImage(null)}
              >
                <Text>X</Text>
              </TouchableOpacity>
              <Image
                style={{ width: 132, height: 114, borderRadius: 7 }}
                source={{ uri: rightImage }}
              ></Image>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#C6BEC3",
                  paddingTop: 10,
                }}
              >
                Right side
              </Text>
            </View>
          )}

          <TouchableOpacity onPress={() => selectPhoto("left")}>
            {!leftImage && (
              <View
                style={{
                  padding: 50,
                  borderWidth: 2,
                  borderColor: "#064347",
                  alignItems: "center",
                  borderStyle: "dashed",
                }}
              >
                <Image
                  style={{ height: 32.9, width: 32.9 }}
                  source={require("../../assets/uplaod.png")}
                ></Image>
                <View style={{ paddingTop: 20 }}>
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    Left side
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {leftImage && (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setLeftImage(null)}
              >
                <Text>X</Text>
              </TouchableOpacity>
              <Image
                style={{ width: 132, height: 114, borderRadius: 7 }}
                source={{ uri: leftImage }}
              ></Image>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#C6BEC3",
                  paddingTop: 10,
                }}
              >
                Left side
              </Text>
            </View>
          )}
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
          <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  removeImageBtn: {
    position: "absolute",
    right: -5,
    top: -10,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 15,
  },
});

export default VehicleApp;
