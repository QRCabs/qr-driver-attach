import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Accordion from "./Accordion";

const BikeAttachments = ({ mode, navigation, completed }) => {
  useEffect(() => {
    const fetchLocal = () => {
      AsyncStorage.getItem("Details")
        .then((res) => {
          if (res != null) {
            setCompleted(JSON.parse(res));
            console.log(res);
            setObjLength(Object.keys(JSON.parse(res)).length);
            console.log(Object.keys(JSON.parse(res)).length);
            console.log(mode);
          }
        })
        .catch((err) => console.log(err));
    };
    const unsubscribe = navigation.addListener("focus", fetchLocal);
    return () => unsubscribe();
  }, [navigation]);
  console.log("mode", mode);
  return (
    <Accordion
      title={"Enter Your vehicles details"}
      style={{ marginBottom: 40 }}
      block={true}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", justifyContent: "space-between" }}
        onPress={() => navigation.navigate("selfie", { mode })}
      >
        <Text>Selfie</Text>
        {!completed?.selfie && !completed?.selfie && (
          <FontAwesome name="long-arrow-right" size={20} />
        )}
        {completed?.selfie && completed?.selfie && (
          <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row", justifyContent: "space-between" }}
        onPress={() => navigation.navigate("drivingL", { mode })}
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
        onPress={() => navigation.navigate("vehicleRC")}
      >
        <Text>Registration Certificate (RC) </Text>
        {!completed?.aadhar && !completed?.aadhar && (
          <FontAwesome name="long-arrow-right" size={20} />
        )}
        {completed?.aadhar && completed?.aadhar && (
          <FontAwesome name="check" size={20} style={{ color: "#20BB20" }} />
        )}
      </TouchableOpacity>

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
    </Accordion>
  );
};

export default BikeAttachments;
