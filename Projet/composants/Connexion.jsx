import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useAuth } from "./context/AuthContext";
import ChangePassword from "./ChangePassword";

const Connexion = ({ navigation }) => {
  const [password, setPassword] = useState("azerty1234");
  const [showChangePassword, setShowChangePassword] = useState(false);

  const { login, email, setEmail } = useAuth();
  
  const handleConnexion = async () => {
    try {
      await login(email, password);
      Alert.alert("Connexion réussie.");
      navigation.navigate('Accueil');
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      Alert.alert("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <View style={styles.container}>
      {showChangePassword ? (
        <ChangePassword />
      ) : (
        <>
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
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Se connecter"
              onPress={handleConnexion}
              color="#8951FC"
            />
          </View>
          <TouchableOpacity onPress={() => setShowChangePassword(true)}>
            <Text style={{color: 'blue', marginTop: 15}}>Mot de passe oublié</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: -200,
    alignItems: "center",
    backgroundColor: "#E5E5E5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "80%",
  },
});

export default Connexion;
