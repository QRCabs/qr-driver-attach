import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { View, Text, SafeAreaView, Platform, StatusBar, TextInput, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton, Checkbox } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";

function RegFirst({ children, style, navigation }) {
  const [gender, setGender] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [date, setDate] = useState(new Date());
  const [refferal, setRefferal] = useState("");
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [knownLanguages, setKnownLanguages] = useState([]);
  const [phone_no, setPhone] = useState(0);
  const [uuid, setUUID] = useState("");

  firebase.initializeApp(firebaseConfig);

  useEffect(() => {
    setPhone(AsyncStorage.getItem("phone_no"));
    setUUID(AsyncStorage.getItem("uuid"));
  }, []);

  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    console.log(result);
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
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
      .child("images/" + Date.now() + ".jpg");
    try {
      await storageRef.put(blob);
      const imageUrl = await storageRef.getDownloadURL(); // Get the URL of the uploaded image
      setImageUri(imageUrl);
      console.log(imageUrl);
    } catch (error) {
      Alert.alert("Error uploading image", error.message);
      console.error(error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
    setDob(currentDate.toLocaleDateString());
  };

  const showDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const submitReg = () => {
    const details = {
      fullName: name,
      dob,
      gender,
      img: imageUri,
      refferal,
      langs: knownLanguages,
      phone_no: phone_no._j,
      firebaseUID: uuid._j,
    };
    console.log(details);
    if (name !== "" && imageUri !== null && dob !== "" && gender !== "" && knownLanguages.length !== 0) {
      axios
        .post(`${API_URL}/driver/create`, details)
        .then((res) => {
          AsyncStorage.setItem("driver_id", res.data.driver_id);
          AsyncStorage.setItem("details", JSON.stringify(details)).then(() => navigation.navigate("terms"));
        })
        .catch((err) => console.error(err));
    } else Alert.alert("Fields Missing", "Fill All the Fields");
  };

  const mngLang = (lng) => {
    knownLanguages.includes(lng) ? setKnownLanguages(knownLanguages.filter((lg) => lg !== lng)) : setKnownLanguages([...knownLanguages, lng]);
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }, style]}>
      {children}
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "400" }}>Welcome to QR Cabs</Text>
          </View>
          <View style={{ paddingTop: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>Enter your details</Text>
          </View>

          <View style={{ paddingTop: 8 }}>
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>Full Name</Text>
            </View>
            <View
              style={{
                height: 40,
                width: "100%",
                backgroundColor: "white",
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#064347",
                flexDirection: "row",
                paddingHorizontal: 10,
              }}
            >
              <TextInput style={{ fontSize: 14, fontWeight: "400" }} onChangeText={setName} placeholder="Enter your full name" />
            </View>

            <View style={{ paddingTop: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>Date of birth</Text>
            </View>
            <View style={{ paddingTop: 8 }} onPress={() => showDatepicker()}>
              <View
                onPress={() => showDatepicker()}
                style={{
                  height: 40,
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "#064347",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <Text onPress={() => showDatepicker()}>{dob ? dob : "Enter Your DOB"}</Text>
                <View>
                  <Image onPress={() => showDatepicker()} style={{ height: 17.25, width: 15.81 }} source={require("../../assets/calendar.png")} />
                </View>
                {showDatePicker && <DateTimePicker testID="dateTimePicker" value={date} mode="date" display="default" onChange={onChange} />}
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "400" }}>Gender </Text>
          </View>
          <View style={{ marginLeft: -20 }}>
            <RadioButton.Group onValueChange={(gend) => setGender(gend)} value={gender}>
              <RadioButton.Item label="Male" value="male" position="leading" color="#D6F22C" labelStyle={{ textAlign: "left" }} />
              <RadioButton.Item label="Female" value="female" position="leading" color="#D6F22C" labelStyle={{ textAlign: "left" }} />
            </RadioButton.Group>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <View style={{ paddingTop: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>Refferal code</Text>
            </View>
            <View style={{ paddingTop: 8 }}>
              <View
                style={{
                  height: 40,
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "#064347",
                  flexDirection: "row",
                  padding: 10,
                }}
              >
                <TextInput style={{ fontSize: 14, fontWeight: "400" }} onChangeText={setRefferal} placeholder="Enter your refferal code" />
              </View>
            </View>
          </View>
          <View>
            <View style={{ paddingTop: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>Upload profile picture</Text>
            </View>
            <TouchableOpacity onPress={selectPhoto} style={{ alignItems: "flex-start", paddingTop: 10 }}>
              {!image && (
                <View
                  style={{
                    height: 176,
                    width: "100%",
                    borderWidth: 2,
                    borderColor: "#064347",
                    alignItems: "center",
                    paddingTop: 20,
                    borderStyle: "dashed",
                  }}
                >
                  <Image style={{ height: 55.41, width: 55.41 }} source={require("../../assets/uplaod.png")}></Image>
                  <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: "400" }} numberOfLines={2}>
                      Click anywhere in this box to upload your profile picture
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
            {image && <Image style={{ width: 296, height: 160 }} source={{ uri: image }}></Image>}
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>*Please make sure that the photo clearly shows your eyes and face</Text>
          </View>

          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 17, fontWeight: "400" }}>Known Languages</Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox color="#D6F22C" status={knownLanguages.includes("eng") ? "checked" : "unchecked"} onPress={() => mngLang("eng")} />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>English</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox color="#D6F22C" status={knownLanguages.includes("tg") ? "checked" : "unchecked"} onPress={() => mngLang("tg")} />

              <Text style={{ fontSize: 16, marginLeft: 10 }}>Telugu</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox color="#D6F22C" status={knownLanguages.includes("hn/ur") ? "checked" : "unchecked"} onPress={() => mngLang("hn/ur")} />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Hindi/Urdu</Text>
            </View>
          </View>

          {/* <Butt Title={"Submit"} onTouch={() => navigation.navigate("screen6")} backgroundColor={"#D6F22C"} elevation={5} /> */}
          <View style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}>
            <TouchableOpacity
              onPress={submitReg}
              style={{
                width: "100%",
                height: 57,
                backgroundColor: "#D6F22C",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 5,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegFirst;
