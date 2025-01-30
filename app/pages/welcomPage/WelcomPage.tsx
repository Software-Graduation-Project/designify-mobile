import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

const SLIDER_DATA = [
  {
    id: '1',
    image: require('../../../assets/image/Bear.png'), // Replace with your image paths
    text: 'Welcome to Craftopia! Customize and order with ease.',
  },
  {
    id: '2',
    image: require('../../../assets/image/Bunny.png'),
    text: 'Explore premium 3D products and make them your own.',
  },
  {
    id: '3',
    image: require('../../../assets/image/cat.png'),
    text: 'Join our community and bring your designs to life!',
  },
];

export const WelcomPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === SLIDER_DATA.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval
  }, []);

  const handleNavigate = () => {
    navigation.navigate('Home');
  };

  const handleNavigate2 = () => {
    navigation.navigate('Login');
  };

  const renderItem = ({ item }: { item: { image: any; text: string } }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.slideText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logo and App Name */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/Icons/logo2.png')} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.appName}>Craftopia</Text>
      </View>

      {/* Slider */}
      <FlatList
        data={SLIDER_DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable manual scrolling for auto-slide
        contentOffset={{
          x: Dimensions.get('window').width * currentIndex,
          y: 0,
        }}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {SLIDER_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} onPress={handleNavigate2}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 380,
    height: 150,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  slide: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '170%',
    height: 300,
    resizeMode: 'contain',
  },
  slideText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fd86b1',
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#eebde9',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'center',
    width: '80%',
  },
  customButton: {
    backgroundColor: '#fd86b2bd',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    borderColor: '#615e6182',
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default WelcomPage;
