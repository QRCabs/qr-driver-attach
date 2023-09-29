import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Accordion from "../components/Accordion";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MoreDetails({ children, style, navigation, route }) {
  // console.log(route.params);

  const [completed, setCompleted] = useState({});
  const [mode, setMode] = useState(false);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [objLength, setObjLength] = useState(0);

  useEffect(() => {
    if (route.params.mode === "Driver") setMode(true);
    AsyncStorage.getItem("details")
      .then((res) => {
        const nm = JSON.parse(res);
        setName(nm.name);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchLocal = () => {
      AsyncStorage.getItem("completed")
        .then((res) => {
          setCompleted(JSON.parse(res));
          console.log(res);
          setObjLength(Object.keys(JSON.parse(res)).length);
          console.log(Object.keys(JSON.parse(res)).length);
          console.log(mode);
        })
        .catch((err) => console.log(err));
    };
    const unsubscribe = navigation.addListener("focus", fetchLocal);
    return () => unsubscribe();
  }, [navigation]);

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        style,
      ]}
    >
      {children}
      {/* <View style={{ width: "100%", height: 50, justifyContent: "space-between", flexDirection: "row", paddingLeft: 5 }}>
        <View style={{ paddingLeft: 10 }}>
          <Image style={{ height: 20, width: 24 }} source={require("../../assets/lines.png")} />
        </View>

        <View style={{ paddingLeft: 10 }}>
          <Image style={{ height: 36, width: 36 }} source={require("../../assets/QR-Cabs-Logo-Black.png")} />
        </View>

        <View style={{ paddingRight: 10 }}>
          <Image style={{ height: 36, width: 36 }} source={require("../../assets/notification.png")} />
        </View>
      </View> */}

      <View
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "white",
          marginVertical: 40,
        }}
      >
        <Text
          style={{ fontSize: 24, fontWeight: "400" }}
          onPress={() => {
            AsyncStorage.removeItem("completed");
          }}
        >
          Welcome {name ? name : "User"},
        </Text>
      </View>
      <Accordion
        title={"Enter Your vehicles details"}
        style={{ marginBottom: 40 }}
        block={!mode}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("vehicleApp")}
        >
          <Text>Appearance</Text>
          {!completed?.vehicleApp && !completed?.vehicleApp && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.vehicleApp && completed?.vehicleApp && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("vehicleRC")}
        >
          <Text>Registration Certificate (RC)</Text>
          {!completed?.vehicleRC && !completed?.vehicleRC && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.vehicleRC && completed?.vehicleRC && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("vehicleIns")}
        >
          <Text>Vehicle Insurance</Text>
          {!completed?.vehicleIns && !completed?.vehicleIns && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.vehicleIns && completed?.vehicleIns && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("vehiclPermit")}
        >
          <Text>Vehicle permit</Text>
          {!completed?.vehiclePermit && !completed?.vehiclePermit && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.vehiclePermit && completed?.vehiclePermit && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("vehiclePoll")}
        >
          <Text>Vehicle Fitness (Optional)</Text>
          {!completed?.vehiclePoll && !completed?.vehiclePoll && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.vehiclePoll && completed?.vehiclePoll && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>
      </Accordion>
      <Accordion title={"Complete Your Profile"} block={mode}>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("drivingL")}
        >
          <Text>Driving License</Text>
          {!completed?.driving && !completed?.driving && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.driving && completed?.driving && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("drivingLNo")}
        >
          <Text>Driving License Number</Text>
          {!completed?.drivingLicenseNo && !completed?.drivingLicenseNo && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.drivingLicenseNo && completed?.drivingLicenseNo && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => console.log("Press")}>
          <Text>Driving License Number</Text>
          <FontAwesome name="long-arrow-right" size={20} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("aadhar")}
        >
          <Text>Aadhar Card</Text>
          {!completed?.aadhar && !completed?.aadhar && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.aadhar && completed?.aadhar && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          onPress={() => navigation.navigate("prevveh")}
        >
          <Text>Previously Driven Vehicle</Text>
          {!completed?.prevVeh && !completed?.prevVeh && (
            <FontAwesome name="long-arrow-right" size={20} />
          )}
          {completed?.prevVeh && completed?.prevVeh && (
            <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
          )}
        </TouchableOpacity>
      </Accordion>
      {/* <Butt Title={"Go to next"} onTouch={() => navigation.navigate("screen9")} backgroundColor={"#D6F22C"} elevation={5} /> */}
      {/* {(mode === "Driver" ? objLength == 3 : objLength == 4) && ( */}
      {mode && objLength === 3 && (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("congo")}
            style={{
              width: "85%",
              height: 57,
              backgroundColor: "#D6F22C",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 5,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!mode && objLength === 4 && (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("congo")}
            style={{
              width: "85%",
              height: 57,
              backgroundColor: "#D6F22C",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 5,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default MoreDetails;
