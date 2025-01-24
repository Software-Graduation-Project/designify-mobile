import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, totalAmount, removeFromCart, clearCart, updateQuantity } =
    useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  interface CartItem {
    id: string;
    name: string;
    image: any;
    quantity: number;
    price: number;
    description: string;
    customizations?: { [key: string]: string };
    message?: string;
  }

  const [previewItem, setPreviewItem] = useState<CartItem | null>(null);

  const trashImagePath = require("../../../assets/Icons/trash1.png"); // Replace with your actual path

  const handleToggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handlePreview = (item: any) => {
    setPreviewItem(item);
    setIsPreviewVisible(true);
  };

  const selectedTotal = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                {/* Checkbox to select items */}
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => handleToggleItem(item.id)}
                >
                  <View
                    style={[
                      styles.checkboxInner,
                      selectedItems.includes(item.id) &&
                        styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
                {/* Item Image */}
                <Image source={item.image} style={styles.cartItemImage} />
                {/* Item Details */}
                <View style={styles.cartItemDetails}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>
                  <Text style={styles.cartItemText}>
                    Price: ${item.price}
                  </Text>
                  {/* Quantity controls */}
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity === 1}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                {/* Preview Button */}
                <TouchableOpacity
                  style={styles.previewButton}
                  onPress={() => handlePreview(item)}
                > 
                  <Text style={styles.previewButtonText}>Preview</Text>
                </TouchableOpacity>

                {/* Remove Button */}
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Image source={trashImagePath} style={styles.trashIcon} />
                </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.selectedTotal}>
              Selected Total: ${selectedTotal.toFixed(2)}
            </Text>
            <Text style={styles.totalAmount}>
              Total with Discount: ${selectedTotal.toFixed(2)}
            </Text>
            <View style={styles.footerButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  Alert.alert(
                    "Pay",
                    "Are you sure you want to pay?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Pay", style: "destructive" },
                    ]
                  )
                }
              >
                <Text style={styles.actionButtonText}>Pay</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={() =>
                  Alert.alert(
                    "Clear Cart",
                    "Are you sure you want to clear the cart?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Clear", style: "destructive", onPress: clearCart },
                    ]
                  )
                }
              >
                <Text style={styles.actionButtonText}>Clear Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {/* Preview Modal */}
      {previewItem && (
        <Modal
          visible={isPreviewVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsPreviewVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Product Details</Text>
              <ScrollView>
                <Image source={previewItem.image} style={styles.modalImage} />
                <Text style={styles.modalText}>Name: {previewItem.name}</Text>
                <Text style={styles.modalText}>Description: {previewItem.description}</Text>
                <Text style={styles.modalText}>
                  Quantity: {previewItem.quantity}
                </Text>
                <Text style={styles.modalText}>
                  Price: ${previewItem.price}
                </Text>
                <Text style={styles.modalText}>
                 Message:
                </Text>
                
                <ScrollView style={styles.messageScrollView}>
                  {/* <Text style={styles.modalText}>Message:</Text> */}
                  <Text style={styles.messageContent}>
                    {previewItem.message || "No message provided."}
                  </Text>
                 </ScrollView>
                
                {previewItem.customizations && Object.keys(previewItem.customizations).length > 0 ? (
                <View style={styles.customizations}>
               <Text style={styles.customizationsHeader}>Customizations:</Text>
                 {Object.entries(previewItem.customizations).map(([key, value], index) =>
                   value ? ( // Ensure only non-empty customizations are shown
                <Text key={index} style={styles.customizationItem}>
                 {`${key}: ${value}`}
                </Text>
                ) : null
                  )}
              </View>
                ) : (
                  <Text style={styles.customizationItem}>No customizations selected.</Text>
                )}

              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsPreviewVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginTop: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 1,
  },
  cartItemImage: {
    width: 60,
    height: 70,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  cartItemText: {
    fontSize: 14,
    color: "#555",
  },
  quantityControls: {
    flexDirection: "row",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 4,
    marginHorizontal: 5,
    width: 30,
  },
  quantityButtonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: "#D77F8F",
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 5,
  },
  trashIcon: {
    width: 30,
    height: 30,
  },
  buttonContainer: {
    flexDirection: "column", // Stack buttons vertically
    alignItems: "center",   // Center the buttons horizontally
    //justifyContent: "space-between", // Add spacing between buttons
    height: 70, // Adjust the height for spacing (optional)
  },
  
  footer: {
    //marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 16,
    marginBottom: 65,
  },
  selectedTotal: {
    fontSize: 16,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#D77F8F",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
  },
  checkboxSelected: {
    backgroundColor: "#D77F8F",
  },
  customizations: {
    marginTop: 8,
  },
  customizationsHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },
  customizationItem: {
    fontSize: 14,
    color: "#777",
  },
  previewButton: {
    marginLeft: 10,
    backgroundColor: "#D77F8F",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  previewButtonText: {
    color: "#fff",
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
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
    fontWeight:"bold",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#D77F8F",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  messageScrollView: {
    maxHeight: 130, // Limit height for the scrollable box
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  messageContent: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom:20,
  },
});
