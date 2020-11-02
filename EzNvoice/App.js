import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import NavigationTree from './src/navigator';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationTree />
    </ThemeProvider>
  );
}
