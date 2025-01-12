import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Contact from './Contact';

export const HelpCenterSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <Text style={styles.heading}>Contact Us</Text>
      </View>
      <Contact />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 'auto',
    backgroundColor: '#ffffff',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a19b3',
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    margin: 'auto',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
