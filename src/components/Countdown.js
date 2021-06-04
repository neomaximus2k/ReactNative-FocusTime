import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSizes, SpacingSizes } from '../utils/sizes';

import { Colours } from '../utils/colors';

const MinutesToMS = function (min) {
  return min * 1000 * 60;
};
const FormatTime = function (Minutes, Seconds) {
  return (
    (Minutes < 10 ? `0${Minutes}` : Minutes) +
    ':' +
    (Seconds < 10 ? `0${Seconds}` : Seconds)
  );
};

// export const CountDown = function({Minutes = 20, isPaused}){

// }

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(MinutesToMS(minutes));
  const interval = React.useRef(null);

  useEffect(() => {
    setMillis(MinutesToMS(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / MinutesToMS(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(CountTimerDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const CountTimerDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return <Text style={styles.text}>{FormatTime(minute, seconds)}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colours.White,
    padding: SpacingSizes.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
    borderRadius: 25,
  },
});
