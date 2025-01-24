import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Alert,
} from "react-native";
/////////////This profile for user ////////////////////
export default function ProfilePage() {
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleToggleActive = () => setIsActive((prevState) => !prevState);

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "This feature is under development.");
  };

  const handleAccountOrders = () => {
    Alert.alert("Account Orders", "This feature is under development.");
  };
  const handleAccountSettings = () => {
    Alert.alert("Account Settings", "This feature is under development.");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "You have been logged out.");
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://placekitten.com/200/200",
          }}
        />
        <Text style={styles.name}>Andrea Davis</Text>
        <Text style={styles.email}>andrea@domainname.com</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <View style={styles.actionRow}>
          <Text style={styles.actionText}>Active</Text>
          <Switch
            value={isActive}
            onValueChange={handleToggleActive}
            thumbColor={isActive ? "#fff" : "#fff"}
            trackColor={{ false: "#ddd", true: "#28a745" }}
          />
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
          <Text style={styles.actionButtonText}>Profile</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAccountOrders}
        >
          <Text style={styles.actionButtonText}>My Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleAccountSettings}>
          <Text style={styles.actionButtonText}>Setting</Text>
        </TouchableOpacity>  
         
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#aaa",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#007BFF",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#007BFF",
  },
  actions: {
    width: "100%",
    marginTop: 20,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  actionText: {
    fontSize: 16,
    color: "#000",
  },
  actionButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    color: "#000",
  },
  logoutButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#000",
  },
});
