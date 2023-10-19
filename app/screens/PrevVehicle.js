import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import SelectImage from '../components/SelectImage';
import TouchableBtn from '../components/TouchableBtn';
import DetailScreenTitle from '../components/DetailScreenTitle';
import InputField from '../components/InputField';
import {RadioButton} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PrevVehicle = ({navigation, route}) => {
  const [transmissionType, setTransmissionType] = useState('');

  const selectedMode = route.params.mode;

  const handleSubmit = () => {
    navigation.navigate('details', {mode: selectedMode});
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} bounces={false}>
      <ScrollView
        bounces={false}
        style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
        <View style={{flex: 0.4}}>
          <DetailScreenTitle
            title="Previous Vehicle"
            subTitle="Please enter the details of your most driven vehicle."
            options={false}
          />
        </View>
        <View style={{flex: 0.9}}>
          <InputField
            label="Manufacturer"
            placeholder="Enter your Manufacturer here"
          />

          <InputField
            label="Vehicle Model"
            placeholder="Enter your Vehicle Model here"
          />

          <InputField
            label="Total Driven Duration"
            placeholder="Enter Total Driven Duration here"
          />

          <View style={{paddingTop: 15}}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>
              Transmission Type
            </Text>

            <View style={{marginLeft: -20}}>
              <RadioButton.Group
                onValueChange={transmission =>
                  setTransmissionType(transmission)
                }
                value={transmissionType}>
                <RadioButton.Item
                  label="Manual"
                  value="Manual"
                  position="leading"
                  color="#D6F22C"
                  labelStyle={{textAlign: 'left'}}
                />
                <RadioButton.Item
                  label="Automatic"
                  value="Automatic"
                  position="leading"
                  color="#D6F22C"
                  labelStyle={{textAlign: 'left'}}
                />
              </RadioButton.Group>
            </View>
          </View>
        </View>
        <View style={{flex: 0.1}}>
          <TouchableBtn text="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  removeImageBtn: {
    position: 'absolute',
    right: 5,
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

export default PrevVehicle;
