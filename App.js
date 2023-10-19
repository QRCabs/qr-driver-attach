import {useState} from 'react';
import Home from './app/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import OtpLogin from './app/screens/OtpLogin';
import VerifyOTP from './app/screens/VerifyOTP';
import RegFirst from './app/screens/RegFirst';
import SelectVehicle from './app/screens/SelectVehicle';
import MoreDetail from './app/screens/MoreDetail';
import DrivingLicense from './app/screens/DrivingLicense';
import AadharCard from './app/screens/AadharCard';
import PoliceVerification from './app/screens/PoliceVerification';
import PrevVehicle from './app/screens/PrevVehicle';
import VehicleRC from './app/screens/VehicleRC';
import VehicleIns from './app/screens/VehicleIns';
import VehiclePermit from './app/screens/VehiclePermit';
import VehicleFitness from './app/screens/VehicleFitness';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="language"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="optLogin"
          component={OtpLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="verifyOtp"
          component={VerifyOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="regFirst"
          component={RegFirst}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="vehicle"
          component={SelectVehicle}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="details"
          component={MoreDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="drivingL"
          component={DrivingLicense}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="aadhar"
          component={AadharCard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="policeVerification"
          component={PoliceVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="prevVehicle"
          component={PrevVehicle}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="vehicleRC"
          component={VehicleRC}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="vehicleIns"
          component={VehicleIns}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="vehiclPermit"
          component={VehiclePermit}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="vehicleFitness"
          component={VehicleFitness}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
