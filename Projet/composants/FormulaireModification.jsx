import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import db from "../config";
import { getDoc, updateDoc, doc } from "firebase/firestore";

const FormulaireModification = ({ navigation, route }) => {
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [auteur, setAuteur] = useState("");
  
  const currentDateISO = new Date().toISOString();
  const dt_creation = currentDateISO.split('T')[0];
  
  const UpdateListHandler = route.params.UpdateListHandler;

  useEffect(() => {
    const id = route.params.id;
    setId(id);
    getDoc(doc(db, "oeuvres", id)).then((snapShot) => {
      const { nom, description, image, auteur } = snapShot.data();
      setNom(nom);
      setDescription(description);
      setImage(image);
      setAuteur(auteur);
    });
  }, [route.params.id]);

  const handleSubmit = async () => {
    const produit = { nom, description, image, auteur, dt_creation };
    
    await updateDoc(doc(db, "oeuvres", id), produit);
    UpdateListHandler();
    alert("Modification ajoutée dans la base de données");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Modifier un produit</Text>
        <Text style={styles.title2}>Nom:</Text>
        <TextInput style={styles.input} placeholder={nom} onChangeText={(text) => setNom(text)} value={nom} />
        <Text style={styles.title2}>Description:</Text>
        <TextInput style={styles.input} placeholder={description} onChangeText={(text) => setDescription(text)} value={description} />
        <Text style={styles.title2}>Lien de l'image:</Text>
        <TextInput style={styles.input} placeholder={image} onChangeText={(text) => setImage(text)} value={image} />
        <Button title="modifier" onPress={handleSubmit} color="#FFA500" />
        <View style={styles.button}></View>
        <Button onPress={() => {
              navigation.goBack();
          }} title="retour" color="#8951FC" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F3F1F8", 
  },
  card: {
    width: "95%",
    backgroundColor: "#FFFF",
    padding: 20,
    borderRadius: 15,
    elevation: 3, 
  },
  title: {
    color: "#333333",
    fontSize: 35,
    textAlign: "center",
  },
  title2: {
    marginBottom: 10,
    marginTop: 30,
    color: "#333333",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  button: {
    padding: 10,
    marginTop: 20,
  },
});

export default FormulaireModification;