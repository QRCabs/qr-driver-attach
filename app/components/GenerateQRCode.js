import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const GenerateQRCode = ({ data, size }) => {
  const jsonData = JSON.stringify(data);
  return (
    <View style={styles.container}>
      <QRCode value={jsonData} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GenerateQRCode;
