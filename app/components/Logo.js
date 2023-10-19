import {Image, View} from 'react-native';

const Logo = () => {
  return (
    <View
      style={{
        flex: 1.3,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/qrcabs-logo.png')}
        style={{height: 220, width: 200}}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;
