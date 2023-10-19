import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  selectPhotoFromGallary,
  takePhotoFromCamera,
} from '../utils/imageHelpers';

const SelectImage = ({image, setImage, caption}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'flex-start',
        paddingTop: 10,
        marginHorizontal: 10,
      }}
      onPress={() => {
        selectPhotoFromGallary(image, setImage);
      }}>
      {!image && (
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
              {caption}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SelectImage;
