import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './app/pages/user/LoginPage';  // Adjust the path to where your LoginPage is located
import { HomeSection } from './app/component/specificComponent/HomeSection'; 
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeSection} />
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
