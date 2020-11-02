import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../consts/spacing';
import { COLOR_WHITE } from '../../consts/colors';

const styles = StyleSheet.create({
  default: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: COLOR_WHITE,
    opacity: 0.9
  }
});

const KeyboardBlurOverlay = () => {
  const [isKeyboard, setIsKeyboard] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboard(false));
  });

  if (isKeyboard) {
    return (
      <View style={styles.default} />
    );
  }
  return null;
};

export default KeyboardBlurOverlay;
