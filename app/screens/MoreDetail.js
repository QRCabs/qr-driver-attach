import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Accordion from '../components/Accordion';
import AccordionItem from '../components/AccordionItem';

const MoreDetail = ({navigation, route}) => {
  const selectedMode = route.params.mode;
  const [completed, setCompleted] = useState({});

  return (
    <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: 'white'}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '400',
          color: 'black',
          marginVertical: 40,
        }}>
        Welcome User,
      </Text>

      <View>
        {/* Profile accordion */}
        <Accordion
          title={'Complete Your Profile'}
          block={true}
          style={{marginBottom: 30}}>
          <AccordionItem
            itemTitle={'Driving License'}
            completed={completed}
            onPress={() =>
              navigation.navigate('drivingL', {mode: selectedMode})
            }
          />
          <AccordionItem
            itemTitle={'Aadhar Card'}
            completed={completed}
            onPress={() => navigation.navigate('aadhar', {mode: selectedMode})}
          />
          <AccordionItem
            itemTitle={'Police Verification'}
            completed={completed}
            onPress={() =>
              navigation.navigate('policeVerification', {mode: selectedMode})
            }
          />
          <AccordionItem
            itemTitle={'Previously Driven Vehicle'}
            completed={completed}
            onPress={() =>
              navigation.navigate('prevVehicle', {mode: selectedMode})
            }
          />
        </Accordion>
      </View>

      <View>
        {/* Vehicle details accordion */}
        <Accordion title={'Enter Your vehicles details'} block={true}>
          <AccordionItem
            itemTitle={'Registration Certificate (RC)'}
            completed={completed}
            onPress={() =>
              navigation.navigate('vehicleRC', {mode: selectedMode})
            }
          />
          <AccordionItem
            itemTitle={'Vehicle Insurance'}
            completed={completed}
            onPress={() =>
              navigation.navigate('vehicleIns', {mode: selectedMode})
            }
          />
          <AccordionItem
            itemTitle={'Vehicle permit'}
            completed={completed}
            onPress={() =>
              navigation.navigate('vehiclPermit', {mode: selectedMode})
            }
          />
          <AccordionItem
            itemTitle={'Vehicle Fitness (Optional)'}
            completed={completed}
            onPress={() =>
              navigation.navigate('vehicleFitness', {mode: selectedMode})
            }
          />
        </Accordion>
      </View>
    </View>
  );
};

export default MoreDetail;
