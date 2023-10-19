import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import SelectImage from '../components/SelectImage';
import TouchableBtn from '../components/TouchableBtn';
import DetailScreenTitle from '../components/DetailScreenTitle';

const VehicleFitness = ({navigation, route}) => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const selectedMode = route.params.mode;

  const handleSubmit = () => {
    navigation.navigate('details', {mode: selectedMode});
  };
  return (
    <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
      <View style={{flex: 0.3, marginBottom: 15}}>
        <DetailScreenTitle title="Vehicle Fitness" options={true} />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.5}}>
          <SelectImage
            image={frontImage}
            setImage={setFrontImage}
            caption={'Upload Front'}
          />
          {frontImage && (
            <View>
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setFrontImage(null)}>
                <Text>X</Text>
              </TouchableOpacity>
              <Image
                style={{height: 200}}
                source={{uri: frontImage}}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
        <View style={{flex: 0.5}}>
          <SelectImage
            image={backImage}
            setImage={setBackImage}
            caption={'Upload Back'}
          />
          {backImage && (
            <View>
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setBackImage(null)}>
                <Text>X</Text>
              </TouchableOpacity>
              <Image
                style={{height: 200}}
                source={{uri: backImage}}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </View>
      <View style={{flex: 0.4}}>
        <TouchableBtn text={'Submit'} onPress={handleSubmit} />
      </View>
    </View>
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

export default VehicleFitness;
