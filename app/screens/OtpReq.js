import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import img1 from "../../assets/mobilelogin.png";
import img2 from "../../assets/frame.png";

function OtpReq({ phone, setPhone, recaptchaVerifier, sendOtp }) {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", paddingTop: 20, backgroundColor: "white" }}>
        <View style={{ flex: 0.5, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
          <Image source={img1} />
        </View>
        <View style={{ flex: 0.7 }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>Enter your mobile number</Text>
          </View>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>This number will be used for all your ride related services</Text>
          </View>

          <View style={{ paddingTop: 30 }}>
            <View
              style={{
                height: 61,
                width: 360,
                backgroundColor: "white",
                justifyContent: "space-between",
                borderRadius: 10,
                alignItems: "center",
                borderWidth: 2,
                borderColor: "#064347",
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Image source={img2}></Image>
              <TextInput
                style={{ fontSize: 20, fontWeight: "400", width: "100%", paddingLeft: 20, paddingRight: 20 }}
                placeholder="10 digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                onChangeText={setPhone}
                value={phone}
              />
            </View>
          </View>

          <View style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}>
            <TouchableOpacity
              onPress={sendOtp}
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
      </View>
    </>
  );
}

export default OtpReq;
