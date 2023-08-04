import React, { useState } from "react";
import { View, Text, SafeAreaView, Platform, StatusBar, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import Butt from "../components/Butt";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

function RegFirst({ children, style, navigation }) {
  const [gender, setGender] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [refferal, setRefferal] = useState("");
  const [image, setImage] = useState(null);
  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitReg = () => {
    navigation.navigate("terms");
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }, style]}>
      {children}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
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
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <TextInput style={{ fontSize: 14, fontWeight: "400" }} placeholder="Enter your DOB" />
                <View style={{ paddingTop: 7 }}>
                  <Image style={{ height: 17.25, width: 15.81 }} source={require("../../assets/calendar.png")} />
                </View>
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
