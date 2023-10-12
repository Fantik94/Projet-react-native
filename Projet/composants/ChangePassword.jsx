import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuth } from './context/AuthContext';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { changePasswordValidation } from './verifs/validation';

const db = getFirestore();

export default function ChangePassword({ navigation }) {
  const { email: userEmail } = useAuth();
  const [email, setEmail] = useState(userEmail || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    // Vérification si les champs sont vides
    if (!email.trim() || !oldPassword.trim() || !newPassword.trim()) {
      return Alert.alert('Tous les champs sont obligatoires.');
    }

    const { error } = changePasswordValidation({ email, oldPassword, newPassword });
    if (error) {
      return Alert.alert(error.message);
    }

    try {
      const docRef = doc(db, "gestionnaire", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.password === oldPassword) {
          await updateDoc(docRef, {
            password: newPassword
          });
          Alert.alert('Mot de passe mis à jour avec succès');
          navigation.navigate('Accueil');
        } else {
          Alert.alert('L’ancien mot de passe est incorrect');
        }
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 300, // Largeur fixe en points
    height: 40,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});