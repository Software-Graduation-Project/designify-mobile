import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";

const categories = [
 // { name: "General", image: require('../../../../assets/categories/cake3.png') },
  { name: "Sweets", image: require('../../../../assets/categories/Cake (2).png') }, 
  { name: "Jewelry", image: require('../../../../assets/categories/Ring (2).png') },
  { name: "Toys", image: require('../../../../assets/categories/toy.png') }, // Example image
  { name: "Home Decor", image:require('../../../../assets/categories/decor.png') },
];

export function CategoriesSection() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
              console.log("Navigating to ShowcasePage with category:", item.name);
              navigation.navigate("ShowcasePage", { category: item.name });
            }}
            activeOpacity={1} // Removes the fading effect
          >
            {/* Image container ensures consistent layout */}
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  row: {
    justifyContent: "space-between",
  },
  categoryItem: {
    width: 110,
    height: 140,
    backgroundColor: "rgba(237, 230, 230, 0.298)",
    borderRadius: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imageContainer: {
    width: 120, // Fixed container width
    height: 80, // Fixed container height
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Ensures images don't overflow the container
  },
  categoryImage: {
    width: "210%",
    height: "150%",
    resizeMode: "contain", // Ensures the image maintains its aspect ratio
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
