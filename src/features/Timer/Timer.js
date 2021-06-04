import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Colours } from '../../utils/colors';
import { SpacingSizes } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { TimerButton } from '../../components/TimerButton';
import { AntDesign } from '@expo/vector-icons';

const DEFAULT_TIME = 0.1;
export const Timer = ({ FocusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [Progress, setProgress] = useState(1);

  const onProgress = function (Progress) {
    setProgress(Progress);
  };

  const vibrate = function () {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate([0, 500, 500, 1000, 500, 2000]);
    }
  };
  const onEnd = function () {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };
  const ChangeTime = function (min) {
    let NewVal = minutes + min;
    if (NewVal < 1) NewVal = 0;
    setMinutes(NewVal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: SpacingSizes.xxl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{FocusSubject}</Text>
      </View>
      <View style={{ marginTop: SpacingSizes.sm }}>
        <ProgressBar
          progress={Progress}
          color="#5e84e2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonwrapper}>
        {!isStarted && (
          <>
            <TimerButton Value={1} onChangeTime={ChangeTime} />
            <TimerButton Value={2} onChangeTime={ChangeTime} />
            <TimerButton Value={5} onChangeTime={ChangeTime} />
            <TimerButton Value={10} onChangeTime={ChangeTime} />
          </>
        )}
      </View>
      <View style={styles.buttonwrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          isIconButton={true}
          IconButton={{ ButtonStyle: 'AntDesign', Name: 'back', Size: 25 }}
          size={50}
          onPress={() => clearSubject()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: Colours.White,
    textAlign: 'center',
  },
  task: {
    color: Colours.White,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonwrapper: {
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
