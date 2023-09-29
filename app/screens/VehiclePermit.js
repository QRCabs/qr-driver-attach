import { View, Text, SafeAreaView, Platform, StatusBar } from "react-native";

const VehiclePermit = ({ children, style, navigation, route }) => {
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
      <Text>VehiclePermits</Text>
    </SafeAreaView>
  );
};

export default VehiclePermit;
