import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const InputField = ({
  label,
  placeholder,
  inputValue,
  setInputValue,
  secureText,
}) => {
  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '400',
          color: '#282828',
          paddingVertical: 10,
        }}>
        {label}
      </Text>
      <TextInput
        style={styles.inpuField}
        placeholderTextColor={'black'}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder={placeholder}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inpuField: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#064347',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default InputField;
