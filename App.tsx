import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomPage } from './app/pages/welcomPage/WelcomPage';
import LoginPage from './app/pages/user/LoginPage';
import { BottomTabNavigator } from './app/component/specificComponents/sections/BottomTabNavigater';
import FavoriteScreen from './app/pages/products/FavoritePage';
import ShowcasePage from './app/pages/products/ShowcasePage';
import { CartProvider } from "./app/context/CartContext";
import { ProductDetailsPage } from './app/pages/products/ProductDetailsPage';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FavoriteProvider } from './app/context/FavoriteContext';
import RegisterPage from './app/pages/user/RegisterPage';
import StorePage from './app/pages/store/StorPage';
import CakeWebView from './app/pages/store/CakeWebView';

export type RootStackParamList = {
  WelcomPage: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Favorite: undefined;
  ShowcasePage: { category: string };
  ProductDetails: { product: string };
  Store: undefined;
  Write:undefined;
  Cake:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const showcasePageOptions = ({ navigation }: { navigation: any }) => ({
  headerTitle: "Categories",
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Favorite')}
      style={styles.iconContainer}
    >
      <Image
        source={require('./assets/Icons/heart.png')}
        style={styles.heartIcon}
      />
    </TouchableOpacity>
  ),
});

export default function App() {
  return (
    <CartProvider>
      <FavoriteProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WelcomPage">
            <Stack.Screen name="WelcomPage" component={WelcomPage} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
            <Stack.Screen name="ShowcasePage" component={ShowcasePage} options={showcasePageOptions} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsPage} />
            <Stack.Screen name="Store" component={StorePage} />
            <Stack.Screen name="Cake" component={CakeWebView} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoriteProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 10,
  },
  heartIcon: {
    width: 60,
    height: 60,
  },
});
