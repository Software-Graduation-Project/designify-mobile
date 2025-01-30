import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const CakeWebView = () => {
    return (
        <View style={styles.container}>
            
            <WebView source={{ uri: "https://dc220096-1706-4f90-87ba-6ba816c2f0a2-00-2wd57dywd7unx.pike.replit.dev:3000/cake" }} 
             scalesPageToFit={true} // Ensures the page scales to fit the device
             startInLoadingState={true}
            />
        </View>
    );
};

export default CakeWebView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
