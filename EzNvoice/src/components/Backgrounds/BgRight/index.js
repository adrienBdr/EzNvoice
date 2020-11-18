import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../consts/spacing';

function BgRight() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={414}
      height={896}
      viewBox="0 0 414 896"
      style={styles.background}
    >
      <G fill="#25a18e">
        <Path
          data-name="Trac\xE9 4"
          d="M414 375.071L413.964-.382H200.745s-91.859 158.921-92.579 160.567a37.577 37.577 0 00-1.626 22.778c2.9 11.272 8.882 18.784 13.317 22.026S414 375.071 414 375.071z"
        />
        <Path
          data-name="Trac\xE9 5"
          d="M0 637.628v257.99h163.828S19.942 654.126 16.274 649.676s-3.518-4.49-7.933-7.566A39.716 39.716 0 000 637.628z"
        />
      </G>
    </Svg>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  }
});

export default BgRight;
