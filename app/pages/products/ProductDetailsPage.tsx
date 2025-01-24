import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Reviews } from "../../component/common/product-details/Reviews";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from '../../../App'; // Adjust the path as needed
import CardWriting from "../../component/common/product-details/CardWriting";

export function ProductDetailsPage({ route }: any) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorite();
  const [favorite, setFavorite] = useState(isFavorite(product.id));
  const [selectedCustomizations, setSelectedCustomizations] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("No message"); // State to hold the message

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1, customizations: selectedCustomizations , message });
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart with customizations.`
    );
  };
  

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
    setFavorite(!favorite);
  };
  
  const handleCustomizationSelect = (option: string, value: string) => {
    setSelectedCustomizations((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  const handleSaveMessage = (cardId: string, message1: string) => {
    console.log(`Message saved for card ID ${cardId}: ${message}`);
    setMessage(message1);
    setModalVisible(false);
    Alert.alert("Message Saved", `Message for card ID ${cardId} has been saved.`);
  };

  
  // Tabs setup
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "custom", title: "Customize" },
    { key: "reviews", title: "Reviews" },
    { key: "stores", title: "Stores" }, // Add this
  ]);

  // Tab scenes
  const ReviewsRoute = () => (
    <View style={styles.tabContainer}>
      <Reviews />
    </View>
  );
  const StoresRoute = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const handleVisitStore = () => {
      navigation.navigate('Store'); // Make sure "Store" is defined in your navigation stack
    };
  
    return (
      <View style={styles.tabContainer}>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/store/sweet.jpg")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Sweet Touches</Text>
          <Text style={styles.cardDescription}>
            They have the best cookies ever
          </Text>
          <TouchableOpacity style={styles.visitButton} onPress={handleVisitStore}>
            <Text style={styles.visitButtonText}>Visit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const CustomRoute = () => (
    <ScrollView contentContainerStyle={styles.customizationContainer}>
      {product.customizations &&
        Object.keys(product.customizations).map((option) => (
          <View key={option} style={styles.customizationOption}>
            <Text style={styles.customizationLabel}>{option}</Text>
            <FlatList
              horizontal
              data={product.customizations[option]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.customizationButton,
                    selectedCustomizations[option] === item && {
                      backgroundColor: "#5946e8",
                    },
                  ]}
                  onPress={() => handleCustomizationSelect(option, item)}
                >
                  <Text
                    style={[
                      styles.customizationButtonText,
                      selectedCustomizations[option] === item && {
                        color: "#fff",
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
    </ScrollView>
  );
  const trashImagePath = require("../../../assets/Icons/message.png");
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleFavorite}>
        <Text style={favorite ? styles.redHeart : styles.grayHeart}>
            {favorite ? "❤" : "🩶"}
          </Text>
        </TouchableOpacity>
      </View>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= product.rating ? "star" : "star-outline"}
            size={24}
            color={star <= product.rating ? "#FFD700" : "#ccc"}
          />
        ))}
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      {/* <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.messageButton}
        onPress={() => setModalVisible(true)}
      >
       <Image source={trashImagePath} style={styles.messageIcon} />
      </TouchableOpacity>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          reviews: ReviewsRoute,
          custom: CustomRoute,
          stores: StoresRoute, // Add this
        })}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#5946e8" }}
            style={{ backgroundColor: "#f8f8f8" }}
            activeColor="#5946e8" // Active tab label color
            inactiveColor="gray" // Inactive tab label color
          />
        )}
      />
       <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
         <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
         <CardWriting
          cardId={product.id}
          onSaveMessage={handleSaveMessage}
         /> 
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>X Close</Text>
        </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    alignItems: "flex-end",
  },
  image: {
    width: "90%",
    height: 160,
    borderRadius: 10,
   // marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#D77F8F",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 5,

  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabContainer: {
    padding: 5,
    
  },
  customizationContainer: {
    padding: 10,
  },
  customizationOption: {
    marginBottom: 15,
  },
  customizationLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  customizationButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  customizationButtonText: {
    fontSize: 14,
    color: "#333",
  },
  starContainer: { flexDirection: "row", marginBottom: 0 },
  redHeart: {
    fontSize: 32,
    color: "red",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  grayHeart: {
    fontSize: 32,
    width: 40,
    color: "#ccc",
    textAlign: "center",
    marginLeft: 8,
    marginBottom: 68,// Make it slightly transparent
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    //marginVertical: 10,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  messageIcon: {
    width: 40,
    height: 40,
  },
  visitButton: {
    backgroundColor: "#D77F8F",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  visitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageButton: {
    position:"absolute",
    left:330,
    bottom:410,
    padding: 0,
  },
  messageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 40,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#D77F8F",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
