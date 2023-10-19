import {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import TouchableBtn from '../components/TouchableBtn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const OtpLogin = ({navigation}) => {
  const [phone, setPhone] = useState('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const sendOTP = () => {
    console.log(phone);
    if (phone === '' || phone.length < 10) {
      Alert.alert('Enter valid phone number');
      return;
    } else {
      navigation.navigate('verifyOtp', {phone});
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1, paddingHorizontal: 30, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../../assets/mobilelogin.png')} />
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <View style={{}}>
            <Text style={{fontSize: 20, fontWeight: '400', color: '#282828'}}>
              Enter your mobile number
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#282828'}}>
              This number will be used for all your ride related services
            </Text>
          </View>
          <View
            style={{
              height: 61,
              // width: 360,
              backgroundColor: 'white',
              justifyContent: 'space-between',
              borderRadius: 10,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#064347',
              flexDirection: 'row',
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 30,
            }}>
            <Image source={require('../../assets/frame.png')} />
            <TextInput
              style={{
                fontSize: 20,
                fontWeight: '400',
                width: '100%',
                paddingLeft: 20,
                paddingRight: 20,
                color: 'black',
              }}
              placeholder="10 digit mobile number"
              placeholderTextColor={'black'}
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={setPhone}
              value={phone}
            />
          </View>
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <TouchableBtn text={'Get OTP'} onPress={sendOTP} />
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}></View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    // backgroundColor: 'white',
    marginTop: 12,
  },
});

export default OtpLogin;
