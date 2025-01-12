import { ScrollView, View, StyleSheet } from "react-native";
import { HelpCenterSection } from "../component/specificComponents/sections/HelpCenterSection";
import { HeroSection } from "../component/specificComponents/sections/HeroSection";
import { SectionIdEnum } from "../types/enums/SectionIdEnum";

const sections = [
    {
        sectionId: SectionIdEnum.home,
        component: <HeroSection />,
    },
    {
        sectionId: SectionIdEnum.help,
        component: <HelpCenterSection />,
    },
];

export const HomePage = () => {
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
        //padding: 16, // Adds padding around content
    },
    
});
