import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import Login from './src/views/login';

export default function App() {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
}
