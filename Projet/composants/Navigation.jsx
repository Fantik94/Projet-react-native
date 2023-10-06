

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Navigation = () => {
  
  const handleConnexionPress = () => {

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Musée</Text>
      <TouchableOpacity onPress={handleConnexionPress}>
        <Text style={styles.button}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#8951FC', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', 
  },
  button: {
    fontSize: 18,
    color: 'white', 
  },
});

export default Navigation;
