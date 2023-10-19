import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

const SelectVehicleCard = ({mode, setMode, modeText, image}) => {
  const handleSelectMode = txt => {
    setMode(txt);
  };
  return (
    <TouchableOpacity
      onPress={() => handleSelectMode(modeText)}
      style={{
        backgroundColor: modeText === mode ? '#D6F22C' : 'white',
        height: 150,
        width: 150,
        borderRadius: 8,
        borderColor: '#064347',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
      }}>
      <Image style={{width: 24, height: 24}} source={image} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '400',
          color: 'black',
          paddingTop: 20,
        }}>
        {modeText}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectVehicleCard;
