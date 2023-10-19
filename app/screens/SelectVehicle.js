import {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SelectVehicleCard from '../components/SelectVehicleCard';
import TouchableBtn from '../components/TouchableBtn';
import MoreDetail from './MoreDetail';

const SelectVehicle = ({navigation}) => {
  const [mode, setMode] = useState('');
  console.log('mode:', mode);
  const selectMode = () => {
    if (mode !== '') navigation.push('details', {mode});
    else Alert.alert('Fields Missing', 'Select Vehicle / Driver');
  };
  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 24, fontWeight: '400', color: 'black'}}>
        Select your vehicle
      </Text>
      <View
        style={{
          paddingTop: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        <SelectVehicleCard
          mode={mode}
          setMode={setMode}
          modeText="Car"
          image={require('../../assets/car.png')}
        />
        <SelectVehicleCard
          mode={mode}
          setMode={setMode}
          modeText="Auto"
          image={require('../../assets/car.png')}
        />

        <SelectVehicleCard
          mode={mode}
          setMode={setMode}
          modeText="Bike"
          image={require('../../assets/car.png')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, color: '#282828'}}>_______________</Text>
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
        <Text style={{fontSize: 20, color: '#282828'}}>_______________</Text>
      </View>
      <View>
        <Text style={{textAlign: 'center', color: 'black'}}>Register as a</Text>
        <SelectVehicleCard
          mode={mode}
          setMode={setMode}
          modeText="Driver"
          image={require('../../assets/car.png')}
        />
      </View>
      <View style={{marginTop: 20, marginBottom: 100}}>
        <TouchableBtn
          text="Select"
          onPress={selectMode}
          isDisabled={mode == ''}
        />
      </View>
    </ScrollView>
  );
};

export default SelectVehicle;
