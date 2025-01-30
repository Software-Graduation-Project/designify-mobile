import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Button,
    TouchableOpacity,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import ShowcasePage from "../products/ShowcasePage";
import { OffersSection } from "../../features/offers/OffersSection";
import { Offers } from "../../features/offers/Offers";
import { Reviews } from "../../component/common/product-details/Reviews";

const StorePage = ({ navigation }: any) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "ourProducts", title: "Our Products" },
        { key: "offers", title: "Offers & Reviews" },
    ]);

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case "ourProducts":
                return <ShowcasePage navigation={navigation} />;
            case "offers":
                return (
                    <ScrollView style={styles.tabContent}>
                        <Text style={styles.sectionTitle}>Offers</Text>
                        <Offers />
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        <ScrollView style={styles.tabContent}>
                            <Reviews />
                        </ScrollView>
                    </ScrollView>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../../../assets/store/sweet.jpg")}
                    style={styles.logo}
                />
                <Text style={styles.headerTitle}>Sweet Touches</Text>
                <Text style={styles.headerSubtitle}>
                    They have the best cookies ever
                </Text>
                <View style={styles.reviewContainer}>
                    <Text style={styles.starRating}>★★★★☆</Text>
                    <Text style={styles.reviewText}>4 reviews</Text>
                </View>
                {/* Add Cake Button */}
                <Button
                    title="3D Cakes"
                    color="#D77F8F"
                    
                    onPress={() => navigation.navigate("Cake")}
                />
            </View>

            {/* Tab View */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={styles.indicatorStyle}
                        style={styles.tabBar}
                        activeColor="#5946e8"
                        inactiveColor="gray"
                    />
                )}
            />
            <TouchableOpacity
                    style={styles.chatButton}
                    onPress={() => navigation.navigate("ChatScreenStore")} // Replace with your chat screen name in the navigator//message (2)
                  >
                    <Text style={styles.chatButtonText}><Image source={require('../../../assets/Icons/message (2).png')} style={{width: 45, height: 40}}/></Text>
            </TouchableOpacity>

        </View>
    );
};

export default StorePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    header: {
        backgroundColor: "#f8f8f8",
        padding: 10,
        alignItems: "center",
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 34,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        color: "#D77F8F",
        fontWeight: "bold",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "c",
        marginTop: 5,
    },
    reviewContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    starRating: {
        fontSize: 18,
        color: "#FFD700",
        marginRight: 5,
    },
    reviewText: {
        fontSize: 14,
        color: "#D77F8F",
    },
    tabBar: {
        backgroundColor: "#fff",
        elevation: 3,
    },
    indicatorStyle: {
        backgroundColor: "#D77F8F",
        height: 3,
    },
    tabContent: {
        flex: 1,
        backgroundColor: "#fff",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: "#333",
    },
    chatButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 70,
        height: 70,
        borderRadius: 34, // Makes the button circular
        backgroundColor: "#d77f8faf", // Customizable color
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Adds shadow for Android
      },
      chatButtonText: {
        fontSize: 30, // Adjust icon/text size
        color: "#FFF",
      },
});
