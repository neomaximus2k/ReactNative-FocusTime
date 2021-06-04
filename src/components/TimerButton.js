import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { SpacingSizes } from '../utils/sizes';
import { RoundedButton } from './RoundedButton';

export const TimerButton = ({
  Value = 1,
  Label = null,
  onChangeTime = () => {},
  ...props
}) => {
  if (Label === null) Label = Value;
  return (
    <View style={styles.ButtonTimes}>
      <RoundedButton
        isIconButton={true}
        IconButton={{
          ButtonStyle: 'AntDesign',
          Name: 'caretup',
          Size: SpacingSizes.md,
        }}
        size={SpacingSizes.xxl}
        onPress={() => {
          onChangeTime(Value);
        }}
      />
      <Text style={styles.Title}>{Label}</Text>
      <RoundedButton
        isIconButton={true}
        IconButton={{
          ButtonStyle: 'AntDesign',
          Name: 'caretdown',
          Size: SpacingSizes.md,
        }}
        size={SpacingSizes.xxl}
        onPress={() => {
          onChangeTime(Value * -1);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ButtonTimes: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
  },
  Title: {
    color: '#fff',
    fontSize: SpacingSizes.md,
    padding: 5,
  },
});
