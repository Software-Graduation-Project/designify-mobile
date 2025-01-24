import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useFavorite } from "../../context/FavoriteContext";

const FavoriteScreen = () => {
  const { favorites, removeFromFavorites } = useFavorite();

  const handleRemoveFavorite = (id: string, name: string) => {
    removeFromFavorites(id);
    Alert.alert("Removed from Favorites", `${name} has been removed.`);
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet. Start adding some!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Image source={item.image } style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFavorite(item.id, item.name)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  favoriteItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#FF6F61",
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FavoriteScreen;
