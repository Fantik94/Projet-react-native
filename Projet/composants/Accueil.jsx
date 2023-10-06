import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import db from '../config'; 

const Accueil = () => {
  const [oeuvres, setOeuvres] = useState([]);

  useEffect(() => {
    const fetchOeuvres = async () => {
      try {
        const oeuvresRef = collection(db, 'oeuvres'); 
        const querySnapshot = await getDocs(oeuvresRef); 
        const nouvellesOeuvres = [];
        querySnapshot.forEach((doc) => {
          nouvellesOeuvres.push({ id: doc.id, ...doc.data() });
        });

        setOeuvres(nouvellesOeuvres);
      } catch (error) {
        console.error('Erreur lors de la récupération des œuvres :', error);
      }
    };

   
    fetchOeuvres();
  }, []); 

  return (
    <View>
      <Text style={styles.titre}>Liste des œuvres :</Text>
      <FlatList
        data={oeuvres}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <View style={styles.oeuvreContainer}>
            <Image source={{ uri: item.image }} style={styles.oeuvreImage} />
            <Text style={styles.oeuvreNom}>{item.nom}</Text>
          </View>
        }}
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
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#8951FC', 
  },
  oeuvreImage: {
    width: 320,
    height: 240,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default Accueil;
