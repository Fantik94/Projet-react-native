import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Connexion from './Connexion'; // Importez useNavigation pour accéder à la navigation

const Navigation = () => {
  const navigation = useNavigation(); // Utilisez useNavigation pour accéder à la navigation

  const handleConnexionPress = () => {
    navigation.navigate('Connexion'); // Redirigez l'utilisateur vers la page de connexion
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
