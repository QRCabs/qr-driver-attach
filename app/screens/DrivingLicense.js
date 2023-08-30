import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Text, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DrivingLicense({ children, style, navigation }) {
  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);

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
      topImage ? setBottomImage(result.assets[0].uri) : setTopImage(result.assets[0].uri);
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
    AsyncStorage.setItem("completed", JSON.stringify({ ...store, driving: true }))
      .then(() => navigation.navigate("details"))
      .catch((err) => console.log(err));
    AsyncStorage.setItem("drivingL_url", JSON.stringify({ imageUri, imageUri2 }));
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
            <Text style={{ fontSize: 20, fontWeight: "400" }}>Driving License</Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>1. Upload clear picture of document</Text>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>2. Photocopies and printouts are not accepted</Text>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>
              3. Uploaded files shouldn't be more than 5mb and it should be belong to JPG,JPEG,PNG,PDF,type only
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
            <TouchableOpacity onPress={() => selectPhoto("top")}>
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
                  <Image style={{ height: 32.9, width: 32.9 }} source={require("../../assets/uplaod.png")}></Image>
                ) : (
                  <Image style={{ height: 114, width: 132 }} source={{ uri: topImage }}></Image>
                )}

                <Text style={{ paddingTop: 12, fontWeight: "400" }}>Upload top</Text>
              </View>
            </TouchableOpacity>
            {topImage && <Image style={{ width: 132, height: 114 }} source={{ uri: topImage }}></Image>}
            <TouchableOpacity onPress={() => selectPhoto()}>
              {!bottomImage && (
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
                  <Image style={{ height: 32.9, width: 32.9 }} source={require("../../assets/uplaod.png")}></Image>
                  <Text style={{ paddingTop: 12, fontWeight: "400" }}>Upload back</Text>
                </View>
              )}
            </TouchableOpacity>
            {bottomImage && <Image style={{ width: 132, height: 114 }} source={{ uri: bottomImage }}></Image>}
          </View>
          <View
            style={{
              width: "100%",
              height: 45,
              backgroundColor: "white",
              paddingTop: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "400" }}>Driving License number</Text>
          </View>
          <View style={{}}>
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
              <TextInput style={{ fontSize: 14, fontWeight: "400" }} placeholder={"Enter your license number here"} />
            </View>
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
      </View>
    </SafeAreaView>
  );
}

export default DrivingLicense;
