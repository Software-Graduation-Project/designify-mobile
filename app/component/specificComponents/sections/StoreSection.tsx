import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from '../../../../App'; // Adjust the path as needed
const storesData = [
  { id: 1, image: require('../../../../assets/store/sweet.jpg'), title: 'Sweet Touches', store: 'They have the best cookies ever' },
  { id: 2, image: require('../../../../assets/store/discountChar.png'), title: 'Siwar Store', store: 'You can find everything you need' },
  
];

const screenWidth = Dimensions.get('window').width;

export const StoresSection: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
      
        const handleVisitStore = () => {
          navigation.navigate('Store'); // Make sure "Store" is defined in your navigation stack
        };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stores</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.carousel}
      >
        {storesData.map((store) => (
          <View key={store.id} style={styles.card}>
            <Image source={store.image} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{store.title}</Text>
              <Text style={styles.store}>{store.store}</Text>
              
              <TouchableOpacity style={styles.visitButton} onPress={handleVisitStore}>
                          <Text style={styles.visitButtonText}>Visit</Text>
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
    color: '#161615',
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
    paddingTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    resizeMode: 'cover',
    borderRadius: 40,
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
    color: '#d66374',
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
  visitButton: {
    backgroundColor: "#D77F8F",
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: "50%",
    borderRadius: 8,
    alignSelf: "center",
  },
  visitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center"
  },
});
