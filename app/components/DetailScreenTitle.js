import {View, Text} from 'react-native';
import React from 'react';

const DetailScreenTitle = ({containerStyle, title, subTitle, options}) => {
  return (
    <View style={containerStyle}>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '400',
          marginTop: 30,
          marginBottom: 15,
        }}>
        {title}
      </Text>

      {subTitle && (
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: '400',
            marginTop: 30,
            marginBottom: 15,
          }}>
          {subTitle}
        </Text>
      )}

      {options && (
        <>
          <Text style={{fontSize: 12, fontWeight: '400', color: 'black'}}>
            1. Upload clear picture of document
          </Text>
          <Text style={{fontSize: 12, fontWeight: '400', color: 'black'}}>
            2. Uploaded files shouldn't be more than 5mb and it should be belong
            to JPG,JPEG,PNG,PDF,type only
          </Text>
        </>
      )}
    </View>
  );
};

export default DetailScreenTitle;
