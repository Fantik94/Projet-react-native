import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuth } from './context/AuthContext';
import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore"; 

const db = getFirestore();

export default function ChangePassword() {
  const { email: userEmail } = useAuth();
  const [email, setEmail] = useState(userEmail || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      const gestionnairesRef = collection(db, "gestionnaire");
      const q = query(gestionnairesRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          const data = doc.data();
          if (data.password === oldPassword) {
            await updateDoc(doc.ref, {  // Utilisation de doc.ref
              password: newPassword
            });
            Alert.alert('Mot de passe mis à jour avec succès');
          } else {
            Alert.alert('L’ancien mot de passe est incorrect');
          }
        });
      } else {
        Alert.alert('Email non trouvé');
      }
    } catch (error) {
      Alert.alert(`Erreur: ${error.message}`);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Changer le mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Ancien mot de passe"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Changer le mot de passe" onPress={handleChangePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
});
