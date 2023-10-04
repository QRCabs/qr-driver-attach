import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";

const Selfie = ({ children, style, navigation, route }) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        style,
      ]}
    >
      {children}
      <Text>Selfie</Text>
    </SafeAreaView>
  );
};

export default Selfie;
