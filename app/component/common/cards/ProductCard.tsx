import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  isFavorite: boolean;
  isCustomizable: boolean;
  isCake3D?: boolean;
  rating: number; // Add this line
  onAddToCart: () => void;
  onToggleFavorite: () => void;
}

export const HeartToggle: React.FC<{ isFavorite: boolean;onToggleFavorite: () => void }> = ({
  isFavorite,
  
  onToggleFavorite,
}) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => onToggleFavorite());
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.Text
        style={[
          styles.heart,
          isFavorite && styles.heartActive,
        ]}
      >
        {isFavorite ? "❤" : "🩶"}
      </Animated.Text>
    </TouchableOpacity>
  );
};


const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  image,
  isFavorite,
  rating,
  onAddToCart,
  onToggleFavorite,
  isCustomizable,
  isCake3D,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={image} style={styles.image} />
        <HeartToggle isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= rating ? "star" : "star-outline"}
              size={24}
              color={star <= rating ? "#FFD700" : "#ccc"}
            />
          ))}
        </View>
        {isCustomizable && (
          <Text style={styles.customTag}>Custom</Text>
        )}
        {isCake3D && (
          <Text style={styles.cakeTag}>3D</Text>
        )}
      </View>
      <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
        <Image source={require("../../../../assets/Icons/cart1.png")} style={styles.cartButtonImage} />
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  heart: {
    fontSize: 28,
    width: 32,
    color: "#ccc",
    textAlign: "center",
    marginLeft: 8,
    marginBottom: 68,
  },
  heartActive: {
    fontSize: 28,
    width: 32,
    color: "#ff4081",
    textAlign: "center",
    marginLeft: 8,
    marginBottom: 68,
  },
  body: {
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#474799",
  },
  cartButton: {
    marginTop: 8,
    backgroundColor: "#c6ccd9",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row", // Align cart icon and text horizontally
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  cartButtonImage: {
    width: 34,
    height: 30,
    marginRight: 8, // Add spacing between icon and text
  },
  customTag: {
    marginBottom: 25,
    position: "absolute",
    top: -128,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#D77F8F",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  cakeTag: {
    marginBottom: 25,
    position: "absolute",
    top: -105,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#9e7fd7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
});

export default ProductCard;
