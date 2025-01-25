import React from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, Text , Image } from "react-native";
import { HelpCenterSection } from "../component/specificComponents/sections/HelpCenterSection";
import { HeroSection } from "../component/specificComponents/sections/HeroSection";
import { SectionIdEnum } from "../types/enums/SectionIdEnum";
import { OffersSection } from "../features/offers/OffersSection";
import { CategoriesSection } from "../component/specificComponents/sections/CategoriesSection";
import { StoresSection } from "../component/specificComponents/sections/StoreSection";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // Adjust path if necessary
const sections = [
  {
    sectionId: SectionIdEnum.home,
    component: <HeroSection />,
  },
  {
    sectionId: SectionIdEnum.offer,
    component: <OffersSection />,
  },
  {
    sectionId: SectionIdEnum.category,
    component: <CategoriesSection />,
  },
  {
    sectionId: SectionIdEnum.store,
    component: <StoresSection />,
  },
  {
    sectionId: SectionIdEnum.help,
    component: <HelpCenterSection />,
  },
];

export const HomePage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handleNavigate = () => {
        navigation.navigate('ChatScreen');
      };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sections.map((section) => (
          <View key={section.sectionId}>{section.component}</View>
        ))}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={handleNavigate} // Replace with your chat screen name in the navigator
      >
        <Text style={styles.chatButtonText}><Image source={require('../../assets/Icons/3d-setting.png')} style={{width: 50, height: 50}}/></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  chatButton: {
    position: "absolute",
    bottom: 80,
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

export default HomePage;
