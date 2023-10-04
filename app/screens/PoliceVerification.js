import { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { Platform, SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";

const PoliceVerification = ({ children, style, navigation, route }) => {
  const [topImage, setTopImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("driver_id").then((res) => setDriverId(res));
  }, []);

  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    console.log(result);
    if (!result.canceled) {
      setTopImage(result.assets[0].uri);
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
      if (imageUri) {
        setImageUri(imageUrl);
      }
    } catch (error) {
      Alert.alert("Error uploading image", error.message);
      console.error(error);
    }
  };

  const submit = async () => {
    const exist = await AsyncStorage.getItem("completed");
    const store = exist != null ? JSON.parse(exist) : null;
    AsyncStorage.setItem(
      "completed",
      JSON.stringify({ ...store, policeVerification: true })
    )
      .then(() => navigation.navigate("details"))
      .catch((err) => console.log(err));
    AsyncStorage.setItem("drivingL_url", JSON.stringify({ imageUri }));
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
      <View style={{ justifyContent: "space-between", flex: 0.8 }}>
        <View>
          <View
            style={{
              width: "100%",
              height: 45,
              backgroundColor: "white",
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "400" }}>
              Police Verification
            </Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>
              1. Upload clear picture of document
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>
              2. Uploaded files shouldn't be more than 5mb and it should be
              belong to JPG,JPEG,PNG,PDF,type only
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 250,
              backgroundColor: "white",
              flexDirection: "row",
              paddingTop: 25,
              justifyContent: "space-evenly",
            }}
          >
            {!topImage && (
              <TouchableOpacity onPress={selectPhoto}>
                <View
                  style={{
                    height: 114,
                    width: 132,
                    borderWidth: 2,
                    borderColor: "#064347",
                    alignItems: "center",
                    paddingTop: 17,
                    borderStyle: "dashed",
                  }}
                >
                  {topImage === null ? (
                    <Image
                      style={{ height: 32.9, width: 32.9 }}
                      source={require("../../assets/uplaod.png")}
                    ></Image>
                  ) : (
                    <Image
                      style={{ height: 114, width: 132 }}
                      source={{ uri: topImage }}
                    ></Image>
                  )}

                  <Text style={{ paddingTop: 12, fontWeight: "400" }}>
                    Upload image
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {topImage && (
              <View>
                <TouchableOpacity
                  style={styles.removeImageBtn}
                  onPress={() => setTopImage(null)}
                >
                  <Text>X</Text>
                </TouchableOpacity>
                <Image
                  style={{ width: 132, height: 114 }}
                  source={{ uri: topImage }}
                ></Image>
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
      </View>
    </SafeAreaView>
  );
};

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

export default PoliceVerification;
