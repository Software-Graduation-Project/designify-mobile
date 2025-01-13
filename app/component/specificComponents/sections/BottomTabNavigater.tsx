import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { HomePage } from '../../../pages/HomePage';
import FavoriteScreen from '../../../pages/products/FavoritePage'; // Create this screen
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App'; // Adjust path if necessary

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigate = () => {
    navigation.navigate('favorite');
  };
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerTitle: () => (
          <View style={styles.headerTitle}>
            <Image
              source={require('../../../../assets/Icons/logo2.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Designfy</Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={handleNavigate}
            style={styles.iconContainer}
          >
            <Image
              source={require('../../../../assets/Icons/heart.png')} // Replace with your heart image path
              style={styles.heartIcon}
            />
    
        </TouchableOpacity>
        ),
        tabBarIcon: ({ focused }) => {
          let imgSrc;
          let imgStyle;

          if (route.name === 'Home') {
            imgSrc = focused
              ? require('../../../../assets/Icons/house.png')
              : require('../../../../assets/Icons/house.png');
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
      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      <Tab.Screen name="Cart" component={HomePage} />
      <Tab.Screen name="Shops" component={HomePage} />
      <Tab.Screen name="Profile" component= {HomePage}/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
   display: 'flex',
   flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  logo: {
    width:50,
    height: 50,
    //resizeMode: 'contain',
  },
  iconContainer: {
    marginRight: 10,
    resizeMode: 'contain',
  },
  heartIcon: {
    width: 60,
    height: 60, // Adjust the size as needed
    //resizeMode: 'contain',
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
  title: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#242124',
  },
});