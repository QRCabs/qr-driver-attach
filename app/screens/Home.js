import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Logo from '../components/Logo';
import {RadioButton} from 'react-native-paper';
import {useState} from 'react';
import TouchableBtn from '../components/TouchableBtn';

const Home = ({navigation}) => {
  const [lang, setLang] = useState('en');
  return (
    <View style={styles.container}>
      <Logo />

      {/* Select Language */}
      <View style={{flex: 0.7}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 24, fontWeight: '400', color: '#282828'}}>
            Select Language
          </Text>
          <Image source={require('../../assets/language-select-logo.png')} />
        </View>

        <View style={styles.langRadioBtns}>
          <RadioButton.Group>
            <RadioButton.Item
              label="English"
              value="en"
              position="leading"
              color="#064347"
              labelStyle={{textAlign: 'left'}}
              status={lang === 'en' ? 'checked' : 'unchecked'}
              onPress={() => setLang('en')}
            />
            <RadioButton.Item
              label="Telugu"
              value="tg"
              position="leading"
              color="#064347"
              labelStyle={{textAlign: 'left'}}
              status={lang === 'tg' ? 'checked' : 'unchecked'}
              onPress={() => setLang('tg')}
            />
            <RadioButton.Item
              label="Hindi"
              value="hn"
              position="leading"
              color="#064347"
              labelStyle={{textAlign: 'left'}}
              status={lang === 'hn' ? 'checked' : 'unchecked'}
              onPress={() => setLang('hn')}
            />
          </RadioButton.Group>
        </View>
      </View>
      {/* Confirm Buton */}
      <View style={{flex: 0.8}}>
        <TouchableBtn
          containerStyle={{marginTop: '30%'}}
          text={'Confirm'}
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
  langRadioBtns: {paddingVertical: 20, marginLeft: -20},
});

export default Home;
