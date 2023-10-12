import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { deleteDoc , doc , getDocs, collection } from "firebase/firestore";
import db from '../config'; 
import { useAuth } from './context/AuthContext';

const EspaceGestion = ({ navigation }) => {

  const { role, accountId } = useAuth();
  const [produits, setProduits] = useState([]);
  const [UpdateList, setUpdateList] = useState(false);

  const UpdateListHandler = () => {
    setUpdateList(!UpdateList);
  };

  useEffect(() => { 
    getDocs(collection(db, "oeuvres"))
    .then((snapShot) => {
      const data = [];
      snapShot.docs.forEach((doc) => {
        data.push({...doc.data(), id: doc.id});
      });
      setProduits(data);
    });
  }, [UpdateList]);

  const supprimer = (id) => {
    deleteDoc(doc(db, "oeuvres", id)).then(() => {
      setUpdateList(!UpdateList);
    });
  };

  return (
    <View style={styles.container}>
      {role === 'admin' && (
        <View>
          <View style={styles.ButtonCompte}>
            <TouchableOpacity onPress={() => navigation.navigate('FormulaireCreation', { UpdateListHandler })} style={styles.Button}>
              <Text style={styles.ButtonText}>Ajouter un Produit</Text>
            </TouchableOpacity>
          </View>

          <FlatList 
            data={produits}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={styles.buttonContainer}>
                  <Button onPress={() => navigation.navigate("FormulaireModification", {id: item.id, UpdateListHandler})} color="blue" title="M"/>
                  <Button onPress={() => supprimer(item.id)} color="red" title="S"/>
                </View>
                <Text style={styles.cardText}>Nom: {item.nom}</Text>
                <Image style={styles.cardImage} source={{ uri: item.image }} resizeMode="cover"/>
              </View>
            )}
          />
        </View>
      )}

      {role === 'redacteur' && (
        <View>
          <View style={styles.ButtonCompte}>
            <TouchableOpacity onPress={() => navigation.navigate('FormulaireCreation', { UpdateListHandler })} style={styles.Button}>
              <Text style={styles.ButtonText}>Ajouter un Produit</Text>
            </TouchableOpacity>
          </View>

          <FlatList 
            data={produits.filter(item => item.auteur === accountId)}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={styles.buttonContainer}>
                  <Button onPress={() => navigation.navigate("FormulaireModification", {id: item.id, UpdateListHandler})} color="orange" title="M"/>
                  <Button onPress={() => supprimer(item.id)} color="red" title="S"/>
                </View>
                <Text style={styles.cardText}>Nom: {item.nom}</Text>
                <Image style={styles.cardImage} source={{ uri: item.image }} resizeMode="cover"/>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F4F8",
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardText: {
    flex: 3,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardImage: {
    flex: 2,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  ButtonCompte: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 20,
  },
  Button: {
    backgroundColor: '#2D3748',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    alignItems: 'center',
    width: '50%',
    borderRadius: 20,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EspaceGestion;
