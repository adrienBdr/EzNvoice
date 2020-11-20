import React from 'react';
import { Root } from 'native-base';
import { ThemeProvider } from 'react-native-elements';
import NavigationTree from './src/navigator';

export default function App() {
  return (
    <Root>
      <ThemeProvider>
        <NavigationTree />
      </ThemeProvider>
    </Root>
  );
}
