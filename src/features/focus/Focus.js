import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { FontSizes, SpacingSizes } from '../../utils/sizes';
import { Colours } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  const [Subject, SetSubject] = useState(null);
  const [FocusTextValue, onChangeText] = React.useState('');

  let OnSubmitEditing = function (TheText) {
    SetSubject(TheText);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: SpacingSizes.md }}
            onChangeText={onChangeText}
            onSubmitEditing={({ nativeEvent }) =>
              OnSubmitEditing(nativeEvent.text)
            }
          />
          <RoundedButton
            isIconButton={true}
            IconButton={{ ButtonStyle: 'AntDesign', Name: 'plus', Size: 25 }}
            size={50}
            onPress={() => {
              addSubject(FocusTextValue);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
  },
  innerContainer: {
    flex: 0.75,
    padding: SpacingSizes.md,
    justifyContent: 'center',
  },
  title: {
    color: Colours.White,
    fontWeight: 'bold',
    fontSize: FontSizes.lg,
    textAlign: 'center',
  },
  inputContainer: {
    paddingTop: SpacingSizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
