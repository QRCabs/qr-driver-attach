import React, { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { SafeAreaView, StatusBar, Platform, Alert, View } from "react-native";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../../config";
import OtpReq from "./OtpReq";
import OtpVerify from "./OtpVerify";

function Otp({ children, style, navigation }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [otp, setOtp] = useState(false);

  let sendOtp = () => {
    console.log(phone);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(`+91${phone}`, recaptchaVerifier.current)
      .then((res) => {
        setVerificationId(res);
        setOtp(true);
      })
      .catch((err) => {
        console.err(err);
      });
  };

  let confirmCode = () => {
    console.log(code);
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
        setPhone("");
        Alert.alert("Login Succesfull");
      })
      .catch((err) => {
        console.err(err);
      });
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }, style]}>
      {children}
      <View style={{ flex: 1, width: "100%" }}>
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
        {!otp && (
          <OtpReq
            phone={phone}
            setPhone={setPhone}
            code={code}
            setCode={setCode}
            recaptchaVerifier={recaptchaVerifier}
            otp={otp}
            sendOtp={sendOtp}
            confirmCode={confirmCode}
          />
        )}
        {otp && <OtpVerify {...{ setCode, confirmCode, phone }} />}
      </View>
    </SafeAreaView>
  );
}

export default Otp;
