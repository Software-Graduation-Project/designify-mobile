import React from "react";
import { View, Text, StyleSheet, FlatList, Image, ImageSourcePropType } from "react-native";

interface Review {
  id: string;
  user: string;
  comment: string;
  avatar: any; // URL or local path to the user's avatar
}

export const Reviews = () => {
  const reviews: Review[] = [
    {
      id: "1",
      user: "Alice",
      comment: "Amazing store! Great offers and fast delivery.",
      avatar: require("../../../../assets/store/riham.png"), // Replace with a real avatar URL
    },
    {
      id: "2",
      user: "John",
      comment: "Loved the discounts. Will shop again for sure!",
      avatar: require("../../../../assets/Icons/cart1.png"), // Replace with a real avatar URL
    },
    {
        id: "3",
        user: "John",
        comment: "Loved the discounts. Will shop again for sure!",
        avatar: require("../../../../assets/store/riham.png"), // Replace with a real avatar URL
      },
      {
        id: "4",
        user: "John",
        comment: "Loved the discounts. Will shop again for sure!",
        avatar: require("../../../../assets/store/riham.png"), // Replace with a real avatar URL
      },
      {
        id: "5",
        user: "John",
        comment: "Loved the discounts. Will shop again for sure!",
        avatar: require("../../../../assets/store/riham.png"), // Replace with a real avatar URL
      },
  ];

  return (
    <View style={styles.container}>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.user}>{item.user}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noReviewsText}>No reviews yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  user: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  comment: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  noReviewsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
});
