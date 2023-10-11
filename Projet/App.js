import 'react-native-gesture-handler'; // Importez ceci en premier
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './composants/Accueil';
import Single from './composants/Single';
import Navigation from './composants/Navigation';
import Connexion from './composants/Connexion';
import { AuthProvider } from './composants/context/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
    <NavigationContainer>
      
      <Navigation />
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Single" component={Single} />
        <Stack.Screen name="Connexion" component={Connexion} />
      </Stack.Navigator>
      
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
