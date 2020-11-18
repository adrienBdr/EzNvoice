import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../consts/spacing';

function BgLeft() {

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
          data-name="Trace 3"
          d="M195.433 895.007h218.07V666.789S188.562 801.407 183.214 805.707s-10.3 9.443-13.4 20.239-2.13 20.012 0 25.88 25.619 43.181 25.619 43.181z"
        />
        <Path
          data-name="Trace 2"
          d="M0 422.233L-.5-.994h127.17l134.623 200.058s7.926 16.29 6.377 31.037-12.577 27.952-12.577 27.952z"
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

export default BgLeft;
