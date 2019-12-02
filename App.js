import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Board from './app/components/Board'

export default class App extends Component {
  
  componentDidMount() {
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Board/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
