import React, { useRef, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from "react-native";

function OtpVerify({ setCode, confirmCode, phone }) {
  const [digitFocus, setDigitFocus] = useState([true, false, false, false, false, false]);
  const ref1 = useRef([]);
  const [otpCode, setOtpCode] = useState(0);

  function handleOTPsubmit(fIndex, digit) {
    let digitFocusArr = [...digitFocus]; // Create a new copy of the digitFocus array
    let updatedOTP = otpCode; // Initialize the updatedOTP with the current otpCode

    // Check if the entered digit is empty (user erased the input)
    if (digit === "") {
      // If the user erased a digit, set the focus on the previous input
      if (fIndex > 0) {
        ref1.current[fIndex - 1].focus();
      }
      // Reset the current digit to be focused
      digitFocusArr[fIndex] = true;
      // Remove the last digit from the updatedOTP
      updatedOTP = Math.floor(updatedOTP / 10);
    } else {
      // If the user entered a digit, proceed as before

      if (fIndex === 5) {
        // If the last digit is entered, do not focus on the next input
        ref1.current[5].blur();
        // To dismiss the keyboard after the last digit
      } else {
        ref1.current[fIndex + 1].focus();
      }

      // Update the digit in the digitFocusArr
      digitFocusArr[fIndex] = false;

      // Concatenate the digit with the previous OTP code
      updatedOTP = updatedOTP * 10 + Number(digit);
    }

    // Update the otpCode state with the new OTP
    setOtpCode(updatedOTP);
    setCode(updatedOTP);
    // Set the digit focus array to the state
    setDigitFocus(digitFocusArr);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 0.6, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
        <Image style={{ height: 195, width: 249 }} source={require("../../assets/password.png")} />
      </View>
      <View style={{ backgroundColor: "white", flex: 0.9 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "400" }}> Enter OTP</Text>
        </View>
        <View style={{ paddingTop: 20, paddingLeft: 26 }}>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>OTP has been sent to **{phone.slice(7)}</Text>
        </View>

        <View
          style={{
            paddingTop: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((item, index) => (
            <TextInput
              key={index}
              ref={(element) => (ref1.current[index] = element)}
              style={[{ padding: 10, paddingHorizontal: 15, borderColor: "#064347", borderWidth: 2, fontSize: 30, borderRadius: 6 }]}
              returnKeyType={"next"}
              maxLength={1}
              placeholder=""
              autoFocus={digitFocus[index]}
              ///onChange={() => handleOTPsubmit(index)}
              onChangeText={(text) => handleOTPsubmit(index, text)}
            />
          ))}
        </View>

        <TouchableOpacity style={{ paddingLeft: 26, paddingVertical: 10 }}>
          <Text style={{ fontSize: 14, color: "#064347", fontWeight: "600" }}>Resend OTP</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", justifyContent: "center", flex: 0.7 }}>
          <TouchableOpacity
            onPress={() => confirmCode()}
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
            <Text style={{ fontSize: 16, color: "#282828", fontWeight: "600" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default OtpVerify;
