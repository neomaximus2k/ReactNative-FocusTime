import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  isIconButton = false,
  IconButton = {},
  ...props
}) => {
  let TheIconButton = function () {
    if (isIconButton) {
      /*ButtonStyle: 'AntDesign', Name: 'leftcircle'*/
      if (IconButton.ButtonStyle === 'AntDesign') {
        return (
          <AntDesign
            name={IconButton.Name}
            size={IconButton.Size ?? size}
            color="white"
          />
        );
      }
    }
    return '';
  };
  return (
    <>
      <TouchableOpacity
        style={[styles(size).radius, style]}
        onPress={props.onPress}>
        {isIconButton && <TheIconButton />}
        {!isIconButton && (
          <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
      borderWidth: 2,
    },
    text: {
      color: '#fff',
      fontSize: size / 3,
    },
  });
