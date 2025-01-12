import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomPage } from './app/pages/welcomPage/WelcomPage';
import LoginPage from './app/pages/user/LoginPage';
import { BottomTabNavigator } from './app/component/specificComponents/sections/BottomTabNavigater';

export type RootStackParamList = {
  WelcomPage: undefined;
  Home: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomPage" component={WelcomPage} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
