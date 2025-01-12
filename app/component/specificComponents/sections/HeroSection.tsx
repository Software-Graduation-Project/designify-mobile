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

          {/* <Text style={styles.paraText}>
            You can order in whatever suits your taste! These features are made just for you.
          </Text> */}

          {/* Dashboard Button */}
          {/* <TouchableOpacity
            style={styles.button}
           // onPress={() => navigation.navigate('Dashboard')} // Replace with your screen name
          >
            <Text style={styles.buttonText}>Dashboard</Text>
          </TouchableOpacity> */}

          {/* Social Icons */}
          {/* <View style={styles.iconContainer}>
            <AntDesign name="linkedin-square" size={24} color="pink" />
            <AntDesign name="twitter" size={24} color="pink" />
            <AntDesign name="youtube" size={24} color="pink" />
            <AntDesign name="instagram" size={24} color="pink" />
          </View> */}
        </View>

        {/* Right content - Lottie Animation */}
        <View style={styles.showcaseContainer}>
          <LottieView
            source={{ uri: 'https://lottie.host/3b41766d-fbf3-4b8d-92c1-52893a6fada6/q9AyrI26gM.lottie' }}
            autoPlay
            loop
            style={styles.lottie}
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
    flexDirection: 'row',
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
