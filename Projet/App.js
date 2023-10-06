import React from 'react';
import { ScrollView, View } from 'react-native';
import Navigation from './composants/Navigation';
import Accueil from './composants/Accueil';

const App = () => {
  return (
    
    <View>
      <Navigation />
      <ScrollView >
      <Accueil />
      </ScrollView>
    </View>
  );
};

export default App;
