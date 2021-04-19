
import React from 'react';
import { StyleSheet } from 'react-native';
import { Welcome } from './src/pages/Welcome';

export default function App() {
  return (
    <Welcome />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
