import 'react-native-gesture-handler'; // Importez ceci en premier
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './composants/Accueil';
import Single from './composants/Single';
import Navigation from './composants/Navigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Navigation />
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Single" component={Single} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
