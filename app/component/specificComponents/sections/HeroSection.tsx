import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import { AntDesign } from '@expo/vector-icons'; // For icons

export const HeroSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.paddingContainer}>
      <View style={styles.flexContainer}>
        {/* Left content */}
        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            WELCOME TO{' '}
            <Text style={styles.blueText}>DESIGNFY!</Text>
          </Text>

          <Text style={styles.subHeading}>
            It's about{' '}
            <Text style={styles.blueText}>design and customize</Text> your order as you like
          </Text>

        </View>

        {/* Right content - Lottie Animation */}
        <View style={styles.showcaseContainer}>
          <Image
              source={require('../../../../assets/store/room.png')}
              style={{ width: 350, height: 180 }}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paddingContainer: {
    paddingVertical: '10%',
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
  },
  flexContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'DynaPuff', // Use a custom font if available
    color: '#1e1c1c',
    marginBottom: 10,
  },
  blueText: {
    color: 'pink',
    fontWeight: '400',
    fontSize: 28,
  },
  subHeading: {
    fontSize: 18,
    color: '#1e1c1c',
    marginBottom: 20,
  },
  paraText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    width: '60%',
  },
  showcaseContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lottie: {
    top: -40,
    width: 200,
    height: 200,
  },
});
