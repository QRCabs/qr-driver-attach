import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

const AccordionItem = ({itemTitle, completed, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Text style={{color: 'black'}}>{itemTitle}</Text>
      {!completed?.driving && !completed?.driving && (
        <FontAwesome name="long-arrow-right" size={20} color={'black'} />
      )}
      {completed?.driving && completed?.driving && (
        <FontAwesome name="check" size={20} style={{color: '#20BB20'}} />
      )}
    </TouchableOpacity>
  );
};

export default AccordionItem;
