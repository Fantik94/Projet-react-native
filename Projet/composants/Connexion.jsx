import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from './context/AuthContext';

const Connexion = ({ navigation }) => {
  const [email, setEmail] = useState('redac@yahoo.fr');
  const [password, setPassword] = useState('azerty1234');

  const { login } = useAuth();

  const handleConnexion = async () => {
    try {
      await login(email, password);
      Alert.alert('Connexion réussie.');
      
      // Vous pouvez ajouter ici la navigation vers une autre page si nécessaire
      // navigation.navigate('AutrePage');
    } catch (error) {
      Alert.alert('Identifiants incorrects. Veuillez réessayer.');
      console.error('Erreur d\'authentification :', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          /*secureTextEntry={true}*/
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Se connecter"
          onPress={handleConnexion}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -200,
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white', 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    width: '100%',
    backgroundColor: '#8951FC',
    padding: 15,
    borderRadius: 5,
  },
});

export default Connexion;
