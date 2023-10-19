import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import InputField from '../components/InputField';
import {Checkbox, RadioButton} from 'react-native-paper';
import {selectPhoto} from '../utils/imageHelpers';
import SelectImage from '../components/SelectImage';
import TouchableBtn from '../components/TouchableBtn';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const RegFirst = ({navigation}) => {
  const [gender, setGender] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [refferal, setRefferal] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [knownLanguages, setKnownLanguages] = useState([]);
  const bottomSheetRef = useRef(null);

  // const fall = new Animated.value(1);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDob(date.toLocaleDateString());
    hideDatePicker();
  };

  const mngLang = lng => {
    knownLanguages.includes(lng)
      ? setKnownLanguages(knownLanguages.filter(lg => lg !== lng))
      : setKnownLanguages([...knownLanguages, lng]);
  };

  const submitProfileDetails = () => {
    navigation.navigate('vehicle');
  };

  const renderInner = () => {
    return (
      <View>
        <View>
          <Text>Upload Photo</Text>
          <Text>Choose your photo</Text>
        </View>
        <TouchableOpacity>
          <Text>Take Picture</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          shadowColor: '#333333',
          shadowOffset: {width: -1, height: -3},
          shadowRadius: 2,
          shadowOpacity: 0.4,
          elevation: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: 40,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#00000040',
              marginBottom: 10,
            }}></View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
        <View style={{paddingTop: 20}}>
          <Text style={{fontSize: 24, fontWeight: '400', color: '#282828'}}>
            Welcome to QR Cabs
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#282828',
              paddingTop: 10,
            }}>
            Enter your details
          </Text>
        </View>

        <InputField
          label={'Full Name'}
          placeholder={'Enter your full name'}
          inputValue={name}
          setInputValue={setName}
        />

        <View style={{paddingVertical: 10}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
            Date of birth
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            style={{paddingTop: 8}}
            onPress={() => showDatePicker()}>
            <View
              style={{
                height: 40,
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 5,
                borderWidth: 2,
                borderColor: '#064347',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>
                {dob ? dob : 'Enter Your DOB'}
              </Text>
              <View>
                <Image
                  style={{height: 17.25, width: 15.81}}
                  source={require('../../assets/calendar.png')}
                />
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Gender */}
        <View style={{paddingTop: 15}}>
          <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>
            Gender{' '}
          </Text>

          <View style={{marginLeft: -20}}>
            <RadioButton.Group
              onValueChange={gend => setGender(gend)}
              value={gender}>
              <RadioButton.Item
                label="Male"
                value="male"
                position="leading"
                color="#D6F22C"
                labelStyle={{textAlign: 'left'}}
              />
              <RadioButton.Item
                label="Female"
                value="female"
                position="leading"
                color="#D6F22C"
                labelStyle={{textAlign: 'left'}}
              />
            </RadioButton.Group>
          </View>
        </View>

        {/* Referral */}
        <InputField
          label={'Referral code'}
          placeholder={'Enter your referral code'}
          inputValue={refferal}
          setInputValue={setRefferal}
        />

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: 'black',
              paddingVertical: 10,
            }}>
            Upload profile picture
          </Text>
          {/* <TouchableOpacity
            style={{
              alignItems: 'flex-start',
              paddingTop: 10,
              marginHorizontal: 10,
            }}
            onPress={() => {
              selectPhoto(profileImage, setProfileImage);
            }}>
            {!profileImage && (
              <View
                style={{
                  height: 200,
                  width: '100%',
                  borderWidth: 2,
                  borderColor: '#064347',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 20,
                  borderStyle: 'dashed',
                }}>
                <Image
                  style={{height: 55.41, width: 55.41}}
                  source={require('../../assets/uplaod.png')}
                />
                <View style={{paddingTop: 20}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                      padding: 10,
                    }}
                    numberOfLines={2}>
                    Click anywhere in this box to upload your profile picture
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity> */}
          <SelectImage
            image={profileImage}
            setImage={setProfileImage}
            caption={
              'Click anywhere in this box to upload your profile picture'
            }
          />
          {profileImage && (
            <View>
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setProfileImage(null)}>
                <Text>X</Text>
              </TouchableOpacity>
              <Image
                style={{height: 200}}
                source={{uri: profileImage}}
                resizeMode="cover"
              />
            </View>
          )}
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: 'black',
              paddingVertical: 20,
            }}>
            *Please make sure that the photo clearly shows your eyes and face
          </Text>
        </View>
        {/* Known languages */}
        <View style={{paddingVertical: 15}}>
          <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>
            Known Languages
          </Text>
          <View style={{marginVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                color="#D6F22C"
                status={
                  knownLanguages.includes('eng') ? 'checked' : 'unchecked'
                }
                onPress={() => mngLang('eng')}
              />
              <Text style={{fontSize: 16, marginLeft: 10, color: 'black'}}>
                English
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                color="#D6F22C"
                status={knownLanguages.includes('tg') ? 'checked' : 'unchecked'}
                onPress={() => mngLang('tg')}
              />

              <Text style={{fontSize: 16, marginLeft: 10, color: 'black'}}>
                Telugu
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                color="#D6F22C"
                status={knownLanguages.includes('hn') ? 'checked' : 'unchecked'}
                onPress={() => mngLang('hn')}
              />
              <Text style={{fontSize: 16, marginLeft: 10, color: 'black'}}>
                Hindi
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 30}}>
          <TouchableBtn text={'Submit'} onPress={submitProfileDetails} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  removeImageBtn: {
    position: 'absolute',
    right: -5,
    top: -7,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 15,
  },
});

export default RegFirst;
