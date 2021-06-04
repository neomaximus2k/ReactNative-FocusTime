import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistoryList } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colours } from './src/utils/colors';
import { SpacingSizes } from './src/utils/sizes';
import { Timer } from './src/features/Timer/Timer';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [FocusSubject, SetFocusSubject] = useState(null);
  const [FocusHistory, SetFocusHistory] = useState([
    { key: '1', Subject: 'Test 1', Status: 2 },
    { key: '2', Subject: 'Test 2', Status: 2 },
    { key: '3', Subject: 'Test 3', Status: 2 },
    { key: '4', Subject: 'Test 4', Status: 2 },
    { key: '5', Subject: 'Test 5', Status: 2 },
    { key: '6', Subject: 'Test 6', Status: 2 },
    { key: '7', Subject: 'Test 7', Status: 2 },
    { key: '8', Subject: 'Test 8', Status: 2 },
    { key: '9', Subject: 'Test 9', Status: 2 },
    { key: '10', Subject: 'Test 10', Status: 2 },
    { key: '11', Subject: 'Test 11', Status: 2 },
    { key: '12', Subject: 'Test 12', Status: 2 },
    { key: '13', Subject: 'Test 13', Status: 2 },
    { key: '14', Subject: 'Test 14', Status: 2 },
    { key: '15', Subject: 'Test 15', Status: 2 },
  ]);

  const AddfocusHistorySubjectwithState = (Subject, Status) => {
    SetFocusHistory([
      ...FocusHistory,
      { key: String(FocusHistory.length + 1), Subject, Status },
    ]);
  };

  const OnClear = () => {
    if (Platform.OS === 'web') {
      /*fall back the JS code confirm for web */
      if (confirm('Are you sure you wish to clear your focus list?')) {
        SetFocusHistory([]);
      }
    } else {
      Alert.alert(
        'Confirm Clear',
        'Are you sure you wish to clear your focus list?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              SetFocusHistory([]);
            },
          },
        ]
      );
    }
  };

  const AddNewFocusItem = (FocusTextValue) => {
    // check if they have the value already in the items
    if (
      FocusHistory.filter((itm) => {
        return itm.Subject == FocusTextValue;
      }).length > 0
    ) {
      if (Platform.OS === 'web') {
        /*fall back the JS code confirm for web */
        alert('Unable to add entry, entry already exists!');
      } else {
        Alert.alert('Error', 'Unable to add entry, entry already exists!', [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]);
      }
    } else {
      SetFocusSubject(FocusTextValue);
    }
  };

  const SaveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('FocusHistory', JSON.stringify(FocusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const LoadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('FocusHistory');
      if (history && JSON.parse(history).length) {
        SetFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const RemoveFocusItem = (item) => {
    // get the item
    if (Platform.OS === 'web') {
      /*fall back the JS code confirm for web */
      if (confirm('Are you sure you wish to clear your focus list?')) {
        SetFocusHistory([]);
      }
    } else {
      Alert.alert(
        'Confirm Clear',
        'Are you sure you wish to clear your focus list?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              SetFocusHistory(
                FocusHistory.filter((itm) => {
                  return itm.Subject !== item.Subject;
                })
              );
            },
          },
        ]
      );
    }
  };

  const ViewFocusItem = (item) => {
    SetFocusHistory(
      FocusHistory.filter((itm) => {
        return itm.Subject !== item.Subject;
      })
    );
    SetFocusSubject(item.Subject);
  };

  useEffect(() => {
    SaveFocusHistory();
  }, [FocusHistory]);

  useEffect(() => {
    LoadFocusHistory();
  }, []); /*loads only on mount*/

  //array deconstructing
  return (
    <View style={styles.container}>
      {FocusSubject ? (
        <Timer
          FocusSubject={FocusSubject}
          onTimerEnd={() => {
            AddfocusHistorySubjectwithState(FocusSubject, STATUSES.COMPLETE);
            SetFocusSubject(null);
          }}
          clearSubject={() => {
            AddfocusHistorySubjectwithState(FocusSubject, STATUSES.CANCELLED);
            SetFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={AddNewFocusItem} />
          <FocusHistoryList
            focusHistory={FocusHistory}
            onViewFocusItem={ViewFocusItem}
            OnClear={OnClear}
            onRemoveFocusItem={RemoveFocusItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.DarkBlue,
    paddingTop: Platform.OS === 'ios' ? SpacingSizes.md : SpacingSizes.lg,
  },
});
