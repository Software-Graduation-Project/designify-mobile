import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av'; // Import Video component and ResizeMode type
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App'; // Adjust path if necessary

export const WelcomPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigate = () => {
    navigation.navigate('Home');
  };
  const handleNavigate2 = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../../assets/welcome.mp4')} // Replace with your video file path
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping
      />
      {/** <Text style={styles.title}>Welcome to Our App!</Text>
      <Text style={styles.description}>
        Discover the amazing features and enjoy a seamless experience.
      </Text>*/}
      <View style={styles.buttonContainer}>
        <View style={{ borderRadius: 15, overflow: 'hidden' , width: '50%' , alignSelf: 'center' , borderColor: '#242124', borderWidth: 2}}>
        <Button title="Go to Home" onPress={handleNavigate} color="#eebde9" />
      </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ borderRadius: 15, overflow: 'hidden' , width: '50%' ,alignSelf: 'center' , borderColor: '#242124', borderWidth: 2}}>
          <Button title="Login" onPress={handleNavigate2} color="#eebde9" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: '#ffffff',
  },
  video: {
    width: '100%',
    height: 880, // Adjust the height to fit your design
    //marginBottom: 5,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    top: -200,
    alignSelf: 'center',
    width: '80%',
    
    //zIndex: 1000,
  },
});
