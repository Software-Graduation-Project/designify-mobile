import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput, // Import TextInput for price input fields
  Alert,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import ProductCard from "../../component/common/cards/ProductCard";

const products: {
  [key: string]: { id: string; name: string; description: string; price: number; image: any; rating: number;cake3D?: boolean; message?: string; customizations?: { [key: string]: string[] }; }[];
} = {
  Cake: [
    {
      id: "1",
      name: "Cupcakes",
      description: "Delicious mini cakes",
      price: 5.99,
      rating: 3.5,
      image: require("../../../assets/image/cupCake.png"),// /images/chocoCake.png
      customizations: {
        Color:["🟣", "🟤", "🔵" ,"🟠"],
        Filling: ["Caramel", "Chocolate"],
      //  Size: ["S", "L", "XL"],
        Topping: ["Fruits", "Nuts"],
      },
      message: "No message !!",
    },
    {
      id: "2",
      name: "Chocolate Cake",
      description: "Rich chocolate flavor",
      price: 10.99,
      rating: 4.5,
      image: require("../../../assets/image/chocoCake.png"),
      cake3D: true,
      customizations: {
        Filling: ["Caramel", "Chocolate"],
        Size: ["S", "L", "XL"],
        Topping: ["Fruits", "Nuts"],
      },
      message: "No message !!",
    },
    {
      id: "3",
      name: "Caramel Cake",
      description: "Classic Caramel cake",
      price: 8.99,
      rating: 3.5,
      image: require("../../../assets/image/cramelCake.png"),
      cake3D: true,
      customizations: {
        Filling: ["Caramel", "Chocolate"],
        Size: ["S", "L", "XL"],
        Topping: ["Fruits", "Nuts"],
      },
      message: "No message !!",
    },
    {
      id: "4",
      name: "Vanilla Cake",
      description: "Classic vanilla cake",
      price: 8.99,
      rating: 5,
      image: require("../../../assets/image/WhiteCake.png"),
      cake3D: true,
      customizations: {
        Filling: ["Caramel", "Chocolate"],
        Size: ["S", "L", "XL"],
        Topping: ["Fruits", "Nuts"],
      },
      message: "No message !!",
    },
    {
      id: "5",
      name: "Strawberry Cake",
      description: "Classic vanilla cake",
      price: 8.99,
      rating: 5,
      image: require("../../../assets/image/strawberryCake.png"),
      cake3D: true,
      customizations: {
        Filling: ["Caramel", "Chocolate"],
        Size: ["S", "L", "XL"],
        Topping: ["Fruits", "Nuts"],
      },
      message: "No message !!",
    },
  ],
  Cookies: [
    {
      id: "4",
      name: "Vanilla Cookies",
      description: "Crunchy and chocolatey",
      price: 3.5,
      rating: 4.0,
      image: require("../../../assets/image/ChocoCookies.png"),//darkCookies
      customizations: {
        Filling: ["Caramel", "Chocolate"],
        Colors: ["White", "Cream"],
      },
    },
    {
      id: "5",
      name: "Chocolate Cookies",
      description: "Soft vanilla cookies",
      price: 3.5,
      rating: 4.5,
      image: require("../../../assets/image/darkCookies.png"),
      customizations: {
        Filling: ["Caramel", "Chocolate"],
        Colors: ["White", "Cream"],
      },
    },
    {
      id: "6",
      name: "Red Velvet Cookies",
      description: "Soft vanilla cookies",
      price: 3.99,
      rating: 4.5,
      image: require("../../../assets/image/RedCookies.png"),
      customizations: {
        Filling: ["Caramel", "Chocolate"],
        Colors: ["White", "Cream"],
      },
    },
  ],
  Chocolate: [
    {
      id: "6",
      name: "Milk Chocolate",
      description: "Intense dark chocolate",
      price: 2.99,
      rating: 3.0,
      image:  require("../../../assets/image/darkChocoBar.png"),
      customizations: {
        Filling: ["Caramel", "Chocolate"],
        Colors: ["White", "Cream"],
      }
    },
    {
      id: "7",
      name: "Dark Chocolate",
      description: "Smooth and creamy",
      price: 2.49,
      rating: 3.5,
      image: require("../../../assets/image/chocoBar.png"),
    },
  ],
};

export default function ShowcasePage({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Cake");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20);
  const [sortByRating, setSortByRating] = useState<boolean>(false);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorite();

  const categories = ["All", ...Object.keys(products)];
  const items =
    selectedCategory === "All"
      ? Object.values(products).flat()
      : products[selectedCategory] || [];

  const filteredItems = items.filter(
    (item) => item.price >= minPrice && item.price <= maxPrice
  );

  // Sort items by rating if sortByRating is true
  const sortedItems = sortByRating
    ? [...filteredItems].sort((a, b) => b.rating - a.rating)
    : filteredItems;

  const handleAddToCart = (item: { id: string; name: string; price: number; image: any }) => {
    addToCart({ ...item, quantity: 1 });
    Alert.alert("Added to Cart", `${item.name} has been added to your cart.`);
  };

  const handleFavoriteToggle = (itemId: string) => {
    if (isFavorite(itemId)) {
      removeFromFavorites(itemId);
    } else {
      const item = items.find((product) => product.id === itemId);
      if (item) {
        addToFavorites(item);
      }
    }
  };

  const renderProduct = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      description: string;
      price: number;
      image: any;
      rating: number;
      cake3D?: boolean;
      customizations?: { [key: string]: string[] };
    };
  }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <ProductCard
        id={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
        image={item.image}
        rating={item.rating}
        isFavorite={isFavorite(item.id)}
        isCustomizable={!!item.customizations} // Check if customizations exist
        isCake3D={!!item.cake3D} // Check if cake3D exists
        onAddToCart={() => handleAddToCart(item)}
        onToggleFavorite={() => handleFavoriteToggle(item.id)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(category) => category}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                item === selectedCategory ? styles.categoryButtonActive : null,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  item === selectedCategory ? styles.categoryButtonTextActive : null,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.filterText}>Price Range:</Text>
        <View style={styles.priceAndSortContainer}>
          
          <TextInput
            style={styles.input}
            placeholder="Min Price"
            keyboardType="numeric"
            value={minPrice.toString()}
            onChangeText={(text) => setMinPrice(Number(text))}
          />
          <Text>--</Text>
          <TextInput
            style={styles.input}
            placeholder="Max Price"
            keyboardType="numeric"
            value={maxPrice.toString()}
            onChangeText={(text) => setMaxPrice(Number(text))}
          />
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortByRating((prev) => !prev)}
          >
            <Text style={styles.sortButtonText}>
              Rating {sortByRating ? "(Desc)" : "(Asc)"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        style={styles.productList}
        contentContainerStyle={styles.productListContent}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  filtersContainer: {
    marginBottom: 15,
  },
  priceAndSortContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
   // marginVertical: 5,
  },
  filterText: {
    fontSize: 16,
    //marginRight: 10,
  },
  input: {
    height: 40,
    width: 70,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 15,
  },
  sortButton: {
    padding: 7,
    backgroundColor: "#D77F8F",
    borderRadius: 8,
    alignItems: "center",
    width: 100,
  },
  sortButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginVertical: 5,
  },
  categoryButtonActive: {
    backgroundColor: "#D77F8F",
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#333",
  },
  categoryButtonTextActive: {
    color: "#fff",
  },
  productList: {
    marginTop: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productListContent: {
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
});
