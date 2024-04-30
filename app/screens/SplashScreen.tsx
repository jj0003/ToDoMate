import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import colors from '../../assets/colors';

const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <ActivityIndicator size="large" color={colors.primary}/>
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
