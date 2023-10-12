import 'react-native-gesture-handler'; 
import React from 'react';
import { TextEncoder, TextDecoder } from 'text-encoding'; 
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './composants/Accueil';
import Single from './composants/Single';
import Navigation from './composants/Navigation';
import Connexion from './composants/Connexion';
import { AuthProvider } from './composants/context/AuthContext';
import EspaceGestion from './composants/EspaceGestion';
import FormulaireCreation from './composants/FormulaireCreation';
import FormulaireModification from './composants/FormulaireModification';

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
          <Stack.Screen name="EspaceGestion" component={EspaceGestion} />
          <Stack.Screen name="FormulaireCreation" component={FormulaireCreation} />
          <Stack.Screen name="FormulaireModification" component={FormulaireModification} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
