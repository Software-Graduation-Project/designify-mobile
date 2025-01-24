import { ScrollView, View, StyleSheet } from "react-native";
import { HelpCenterSection } from "../component/specificComponents/sections/HelpCenterSection";
import { HeroSection } from "../component/specificComponents/sections/HeroSection";
import { SectionIdEnum } from "../types/enums/SectionIdEnum";
import { OffersSection } from "../features/offers/OffersSection";
import {CategoriesSection} from "../component/specificComponents/sections/CategoriesSection";
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
        component: <CategoriesSection  />,
    },
    {
        sectionId: SectionIdEnum.store,
        component: <StoresSection  />,
    },
    {
        sectionId: SectionIdEnum.help,
        component: <HelpCenterSection />,
    },
];

import { useNavigation } from '@react-navigation/native';
import { StoresSection } from "../component/specificComponents/sections/StoreSection";

export const HomePage = () => {
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {sections.map((section) => (
                <View key={section.sectionId} >
                    {section.component}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1, // Ensures the content fills the scrollable area
        paddingBottom: 60, // Adds padding around content
    },
    
});
