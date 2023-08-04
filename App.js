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

const Stack = createNativeStackNavigator();

export default function App() {
  const [isRegistered, setIsRegistered] = useState(true);

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
      <Stack.Navigator>
        <Stack.Screen name="first" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="loginOpt" component={LoginScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="otpLogin" component={Otp} options={{ headerShown: false }} /> */}
        <Stack.Screen name="regfirst" component={RegFirst} options={{ headerShown: false }} />
        <Stack.Screen name="terms" component={Terms} options={{ headerShown: false }} />
        <Stack.Screen name="vehicle" component={SelectVehicle} options={{ headerShown: false }} />
        <Stack.Screen name="details" component={MoreDetails} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };

  return <NavigationContainer>{isRegistered && <Register />}</NavigationContainer>;
}
