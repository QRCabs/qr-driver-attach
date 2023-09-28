import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";

function VehicleIns({ children, style, navigation }) {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imageUri2, setImageUri2] = useState(null);
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("driver_id").then((res) => setDriverId(res));
  }, []);

  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
    });
    console.log(result);
    if (!result.canceled) {
      image ? setImage2(result.assets[0].uri) : setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (img) => {
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
      imageUri ? setImageUri2(imageUrl) : setImageUri(imageUrl);
    } catch (error) {
      Alert.alert("Error uploading image", error.message);
      console.error(error);
    }
  };

  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem(
      "vehicleIns_url",
      JSON.stringify({ imageUri, imageUri2 })
    );
    AsyncStorage.setItem(
      "completed",
      JSON.stringify({ ...store, vehicleIns: true })
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

      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          paddingTop: 40,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "400" }}>
          Upload vehicle insurance
        </Text>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          1. Upload clear picture of document
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          2. Photocopies and printouts are not accepted
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>
          3. Uploaded files shouldn't be more than 5mb and it should be belong
          to JPG,JPEG,PNG,PDF,type only
        </Text>
      </View>
      <View
        style={{
          paddingTop: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {(!image || !image2) && (
          <TouchableOpacity
            onPress={() => selectPhoto()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <View
              style={{
                padding: 80,
                borderWidth: 2,
                borderColor: "#064347",
                alignItems: "center",
                borderStyle: "dashed",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ height: 64, width: 64 }}
                source={require("../../assets/uplaod.png")}
              ></Image>
              <View style={{ paddingTop: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: "400" }}>
                  Click anywhere in this box to upload insurance document
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          width: "100%",
          height: 150,
          backgroundColor: "white",
          paddingTop: 20,
          flexDirection: "row",
          marginHorizontal: 15,
        }}
      >
        {image && (
          <View style={{ height: 100, width: 80, paddingRight: 10 }}>
            <TouchableOpacity
              style={styles.removeImageBtn}
              onPress={() => setImage(null)}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <Image
              style={{ height: 83, width: 65 }}
              source={{ uri: image }}
            ></Image>
          </View>
        )}
        {image2 && (
          <View style={{ height: 100, width: 80, paddingRight: 10 }}>
            <TouchableOpacity
              style={styles.removeImageBtn}
              onPress={() => setImage2(null)}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <Image
              style={{ height: 83, width: 65 }}
              source={{ uri: image2 }}
            ></Image>
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
    right: 10,
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

export default VehicleIns;
