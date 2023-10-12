import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from './context/AuthContext.jsx';
import db from '../config.js';
import { collection, addDoc } from 'firebase/firestore';



function FormulaireCreation({ navigation, route }) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const UpdateListHandler = route.params.UpdateListHandler;

  const { accountId } = useAuth();
  const [auteur] = useState(accountId);

  const currentDateISO = new Date().toISOString();
  const dt_creation = currentDateISO.split('T')[0];

  const [erreurs] = useState([]);


  const onSubmit = () => {
    
      const produit = {nom, description, image, auteur, dt_creation}
      
        addDoc(collection(db, "oeuvres"), produit).then(function(reponse){
            setNom("")
            setDescription("")
            setImage("")
            UpdateListHandler();
            alert("Le produit à bien été ajouté dans la base de données")
        })
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ajout d'un produit</Text>
        <Text style={styles.title2}>Nom:</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={(text) => setNom(text)}
          placeholder="Nom"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.title2}>Desciption:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Description"
          autoCapitalize="none"
          autoCorrect={false}
        />
         <Text style={styles.title2}>Lien de l'image:</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={(text) => setImage(text)}
          placeholder="Image"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.button}></View>
        <Button title='Ajouter' onPress={onSubmit} />
      </View>
      {erreurs.length > 0 && (
          <View>
            {erreurs.map((erreur, index) => (
              <Text key={index} style={{ color: "red" }}>
                {erreur}
              </Text>
            ))}
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#F0F1F6",
  },
  card: {
    width: "95%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  title: {
    color: "#333",
    fontSize: 35,
    textAlign: "center",
  },
  title2: {
    marginBottom: 10,
    marginTop: 30,
    color: "#555",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fafafa",
  },
  button: {
    padding: 10,
    backgroundColor: '#5A9', 
    borderRadius: 4,
  },
});


export default FormulaireCreation;