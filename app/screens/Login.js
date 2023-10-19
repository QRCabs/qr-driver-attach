import {Text, View, Image, StyleSheet} from 'react-native';
import Logo from '../components/Logo';
import TouchableBtn from '../components/TouchableBtn';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Logo />

      <View style={{flex: 0.7}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center',
            color: '#282828',
          }}>
          Welcome to QRCabs
        </Text>
        <TouchableBtn
          onPress={() => navigation.navigate('optLogin')}
          containerStyle={{marginVertical: 40}}
          text={'Continue with phone number'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#282828'}}>____________</Text>
          <Text
            style={{
              fontSize: 20,
              color: '#282828',
              fontWeight: '400',
              paddingTop: 14,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            OR
          </Text>
          <Text style={{fontSize: 20, color: '#282828'}}>____________</Text>
        </View>
      </View>
      {/* Confirm Buton */}
      <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableBtn
          containerStyle={{
            width: '40%',
            height: 50,
            backgroundColor: '#ffffff',
            marginBottom: 20,
          }}
          image={
            'https://www.freepnglogos.com/uploads/new-google-logo-transparent--14.png'
          }
          text={'Google'}
          onPress={() => navigation.navigate('login')}
        />

        <TouchableBtn
          containerStyle={{
            width: '40%',
            height: 50,
            backgroundColor: '#ffffff',
          }}
          image={
            'https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-0.png'
          }
          text={'FaceBook'}
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
});

export default Login;
