import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import Home from "./app/screens/Home";
import LoginScreen from "./app/screens/LoginScreen";
import Otp from "./app/screens/Otp";
import RegFirst from "./app/screens/RegFirst";
import Terms from "./app/screens/Terms";
import SelectVehicle from "./app/screens/SelectVehicle";
import MoreDetails from "./app/screens/MoreDetails";
import DrivingLicense from "./app/screens/DrivingLicense";
import { View } from "react-native";
import Aadhar from "./app/screens/Aadhar";
import PrevVehicle from "./app/screens/PrevVehicle";
import VehicleApp from "./app/screens/VehicleApp";
import VehicleIns from "./app/screens/VehicleIns";
import VehiclePoll from "./app/screens/VehiclePoll";
import VehicleRC from "./app/screens/VehicleRC";
import Congrats from "./app/screens/Congrats";
import Main from "./app/screens/Main";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("isRegistered")
      .then((value) => {
        setIsRegistered(value === "true" ? false : true); // Assuming "isRegistered" is stored as a string
      })
      .catch((error) => {
        console.log("Error reading AsyncStorage:", error);
      });
  }, []);

  const Register = () => {
  return (
    <Stack.Navigator initialRouteName={isRegistered ? "main" : "first"}>
        <Stack.Screen name="first" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="loginOpt" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="otpLogin" component={Otp} options={{ headerShown: false }} />
        <Stack.Screen name="regfirst" component={RegFirst} options={{ headerShown: false }} />
        <Stack.Screen name="terms" component={Terms} options={{ headerShown: false }} />
        <Stack.Screen name="vehicle" component={SelectVehicle} options={{ headerShown: false }} />
        <Stack.Screen name="details" component={MoreDetails} options={{ headerShown: false }} />
        <Stack.Screen name="drivingL" component={DrivingLicense} options={{ headerShown: false }} />
        <Stack.Screen name="aadhar" component={Aadhar} options={{ headerShown: false }} />
        <Stack.Screen name="prevveh" component={PrevVehicle} options={{ headerShown: false }} />
        <Stack.Screen name="vehicleApp" component={VehicleApp} options={{ headerShown: false }} />
        <Stack.Screen name="vehicleIns" component={VehicleIns} options={{ headerShown: false }} />
        <Stack.Screen name="vehiclePoll" component={VehiclePoll} options={{ headerShown: false }} />
        <Stack.Screen name="vehicleRC" component={VehicleRC} options={{ headerShown: false }} />
        <Stack.Screen name="congo" component={Congrats} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  const Registered = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  return <NavigationContainer>{isRegistered ? <Register /> : <Registered />}</NavigationContainer>;
}
