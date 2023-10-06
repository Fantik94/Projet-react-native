import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Single = ({ route }) => {
  const { oeuvre } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: oeuvre.image }} style={styles.oeuvreImage} />
      <Text style={styles.oeuvreNom}>{oeuvre.nom}</Text>
      <Text style={styles.oeuvreAuteur}>Auteur : {oeuvre.auteur}</Text>
      <Text style={styles.oeuvreDate}>Date de création : {oeuvre.dt_creation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oeuvreImage: {
    width: 320,
    height: 240,
    borderRadius: 10,
  },
  oeuvreNom: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  oeuvreAuteur: {
    fontSize: 20,
  },
  oeuvreDate: {
    fontSize: 16,
  },
});

export default Single;
