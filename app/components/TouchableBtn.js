import {Image, Text, TouchableOpacity, View} from 'react-native';

const TouchableBtn = ({containerStyle, onPress, text, image, isDisabled}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={[
        {
          width: '100%',
          height: 57,
          backgroundColor: isDisabled ? 'lightgrey' : '#D6F22C',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
          elevation: 5,
        },
        containerStyle,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {image && (
          <Image
            source={{uri: image}}
            style={{height: 30, width: 30}}
            resizeMode="cover"
          />
        )}
        <Text style={{fontSize: 14, color: '#282828', fontWeight: '600'}}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TouchableBtn;
