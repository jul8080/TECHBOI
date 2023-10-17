import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const local_data = [
  {
    value: '1',
    lable: 'Philippines',
    image: {
      uri: 'https://cdn.britannica.com/73/3473-050-3A33E719/Flag-Philippines.jpg',
    },
  },
  {
    value: '2',
    lable: 'United States of America',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png',
    },
  },
  {
    value: '3',
    lable: 'Kuwait',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/1920px-Flag_of_Kuwait.svg.png',
    },
  },
  {
    value: '4',
    lable: 'Canada',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1920px-Flag_of_the_United_Kingdom.svg.png',
    },
  },
  {
    value: '5',
    lable: 'Korea',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_South_Korea.png',
    },
  },
];

const DropdownBox = ({placeholder, value, onChangeText}) => {
//   const [country, setCountry] = useState('');

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={value}
      data={local_data}
      valueField="value"
      labelField="lable"
      imageField="image"
      placeholder={placeholder}
      onChange={(e) => {
        onChangeText(e.value);
      }}
    />
  );
};


const styles = StyleSheet.create({
  dropdown: {
    height: 64,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  imageStyle: {
    width: 24,
    height: 24,
    resizeMode: 'center'
  },
  placeholderStyle: {
    fontSize: 11,
    color: '#9B9B9B',
    fontFamily: 'Poppins-Regular'
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 15,
    height: 15,
    transform: [{rotate: '-90deg'}]
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default DropdownBox;
