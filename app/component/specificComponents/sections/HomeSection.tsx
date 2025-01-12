import React from 'react';
import { View, Text, StyleSheet ,Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

////////////for shop accessories hero section
export const HomeSection = () => {
  return (
    <View style={styles.content}>
      <View style={styles.textSection}>
        <Text style={styles.header}>
          Welcome <Text style={styles.highlight}>Shop Accessories</Text> Zone
        </Text>
        <Text style={styles.paragraph}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis
          inventore iste ratione ex alias quis magni at optio.
        </Text>
      </View>

      <View style={styles.videoSection}>
        <LottieView
          source={{ uri: 'https://lottie.host/a3fa31fe-eda4-41d0-8e86-e40326692d5d/x0bd0RmZeI.lottie' }}
          autoPlay
          loop
          style={styles.lottie}
          
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlight: {
    color: '#e66ea2', // You can change this to any color you like
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
  videoSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 300,
    height: Dimensions.get('window').height,
    position: 'absolute',
    bottom: -120,
    left: -150,
  },
});
