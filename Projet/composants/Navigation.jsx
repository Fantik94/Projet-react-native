import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './context/AuthContext'; 

const Navigation = () => {
  const navigation = useNavigation(); 
  const { isAuthenticated, setEmail, setIsAuthenticated } = useAuth(); 

  const handleConnexionPress = () => {
    navigation.navigate('Connexion'); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail(''); 
    navigation.navigate('Accueil'); 
    
    Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès !');
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Musée</Text>
      {isAuthenticated ? (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.button}>Déconnexion</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleConnexionPress}>
          <Text style={styles.button}>Connexion</Text>
        </TouchableOpacity>
      )}
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
