import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import db from '../config'; // Importez l'instance de Firestore
import { useNavigation } from '@react-navigation/native'; // Importez useNavigation depuis @react-navigation/native

const Accueil = () => {
  const [oeuvres, setOeuvres] = useState([]);
  const navigation = useNavigation(); // Utilisez useNavigation pour obtenir l'objet de navigation

  useEffect(() => {
    // Fonction asynchrone pour récupérer les œuvres depuis Firestore
    const fetchOeuvres = async () => {
      try {
        const oeuvresRef = collection(db, 'oeuvres'); // Référence à la collection 'oeuvres'
        const querySnapshot = await getDocs(oeuvresRef); // Récupérez tous les documents dans la collection

        const nouvellesOeuvres = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Convertir la date Firestore en chaîne de caractères
          const dt_creation = data.dt_creation ? data.dt_creation.toDate().toLocaleString() : 'Date non disponible';
          nouvellesOeuvres.push({ id: doc.id, ...data, dt_creation });
        });

        setOeuvres(nouvellesOeuvres);
      } catch (error) {
        console.error('Erreur lors de la récupération des œuvres :', error);
      }
    };

    // Appelez la fonction pour récupérer les œuvres
    fetchOeuvres();
  }, []); // Utilisez une dépendance vide pour exécuter l'effet une seule fois

  return (
    <View>
      <Text style={styles.titre}>Liste des œuvres :</Text>
      <FlatList
        data={oeuvres}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.oeuvreContainer}
            onPress={() => {
              // Naviguez vers la page Single avec les données de l'œuvre
              navigation.navigate('Single', { oeuvre: item });
            }}
          >
            <Image source={{ uri: item.image }} style={styles.oeuvreImage} />
            <Text style={styles.oeuvreNom}>{item.nom}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  oeuvreContainer: {
    margin: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#F5F0FF",
    borderRadius: 10,
  },
  oeuvreNom: {
    fontSize: 30, // Augmentation de la taille de la police
    fontWeight: 'bold',
    color: '#8951FC', // Couleur du texte
  },
  oeuvreImage: {
    width: 320,
    height: 240,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default Accueil;
