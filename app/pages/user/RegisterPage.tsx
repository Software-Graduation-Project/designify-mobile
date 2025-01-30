import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import RegisterForm from '../../features/authentication/RegisterForm'; // Adjust the path as needed

const RegisterPage = () => {
  return (
    <View style={styles.pageContainer}>
      {/* Background Image */}
      {/* <View style={styles.animatedBackground}>
        <Image
          source={require('../../../assets/store/register.png')} // Replace with a relevant image
          style={styles.image}
        />
      </View> */}

      {/* Centered Register Form */}
      <View style={styles.centeredContainer}>
        <View style={styles.registerContainer}>
          <RegisterForm />
        </View>
      </View>
    </View>
  );
};

export default RegisterPage;

// Styles
const { width } = Dimensions.get('window'); // Get screen width for responsive design

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  animatedBackground: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
  },
  image: {
    width: width * 2.2,
    height: 330,
    resizeMode: 'contain',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  registerContainer: {
    width: '95%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
