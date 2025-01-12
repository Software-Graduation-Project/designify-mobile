import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HomePage } from '../../../pages/HomePage';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>Home Screen</Text>
  </View>
);

const OrdersScreen = () => (
  <View style={styles.screen}>
    <Text>Orders Screen</Text>
  </View>
);

const PackagesScreen = () => (
  <View style={styles.screen}>
    <Text>Packages Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Screen</Text>
  </View>
);

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let imgSrc;
          let imgStyle;

          if (route.name === 'Home') {
            imgSrc = focused
              ? require('../../../../assets/Icons/house.png') // Active icon
              : require('../../../../assets/Icons/house.png'); // Inactive icon
            imgStyle = styles.homeIcon;
          } else if (route.name === 'Cart') {
            imgSrc = focused
              ? require('../../../../assets/Icons/cart.png')
              : require('../../../../assets/Icons/cart.png');
            imgStyle = styles.cartIcon;
          } else if (route.name === 'Shops') {
            imgSrc = focused
              ? require('../../../../assets/Icons/bag.png')
              : require('../../../../assets/Icons/bag.png');
            imgStyle = styles.shopsIcon;
          } else if (route.name === 'Profile') {
            imgSrc = focused
              ? require('../../../../assets/Icons/person.png')
              : require('../../../../assets/Icons/person.png');
            imgStyle = styles.profileIcon;
          }

          return <Image source={imgSrc} style={[styles.commonIcon, imgStyle]} />;
        },
        tabBarActiveTintColor: '#FFB300',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: {
          height: 70,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: 'absolute',
          overflow: 'hidden',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Cart" component={OrdersScreen} />
      <Tab.Screen name="Shops" component={PackagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonIcon: {
    resizeMode: 'contain',
    marginBottom: 2,
  },
  homeIcon: {
    width: 140,
    height: 90,
  },
  cartIcon: {
    width: 140,
    height: 90,
    marginTop: 8,
  },
  shopsIcon: {
    width: 105,
    height: 75,
  },
  profileIcon: {
    width: 100,
    height: 50,
    marginTop: 8,
  },
});
