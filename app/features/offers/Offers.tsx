import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const offersData = [
  { id: 1, image: require('../../../assets/store/discount.png'), title: 'Offer 1', store: 'Sweet Touches', description: 'Get a 30% discount on all items!' },
  { id: 2, image: require('../../../assets/store/discountChar.png'), title: 'Offer 2', store: 'Siwar Store', description: 'Buy one, get one free on selected products!' },
  { id: 3, image: require('../../../assets/store/discount2.png'), title: 'Offer 3', store: 'Sweet Touches', description: 'Free shipping on all orders over $50.' },
];

const screenWidth = Dimensions.get('window').width;

export const Offers: React.FC = () => {
  return (
    <View >
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.carousel}
      >
        {offersData.map((offer) => (
          <View key={offer.id} style={styles.card}>
            <Image source={offer.image} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{offer.title}</Text>
              <Text style={styles.store}>{offer.store}</Text>
              <Text style={styles.description}>{offer.description}</Text>
              <TouchableOpacity style={styles.button} onPress={() => alert(`Details for ${offer.title}`)}>
                <Text style={styles.buttonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginBottom: 20,
    textAlign:'center',
  },
  carousel: {
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10
  },
  card: {
    width: screenWidth * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
    alignContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center'

  },
  store: {
    fontSize: 16,
    color: '#FF6F61',
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E1A0AC',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
