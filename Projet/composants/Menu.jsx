import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './context/AuthContext'; 

const Menu = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate('EspaceGestion')}
    >
      <Text style={styles.buttonText}>EG</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    backgroundColor: '#8951FC',
    borderRadius: 30,
    zIndex: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default Menu;
