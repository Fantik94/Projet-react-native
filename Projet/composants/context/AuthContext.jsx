import React, { createContext, useContext, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../../config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');  // Initialisé à une chaîne vide
  
  const login = async (email, password) => {
    try {
      const gestionnairesRef = collection(db, "gestionnaire");
      const q = query(gestionnairesRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (password === data.password) {
            setIsAuthenticated(true);
            setEmail(email);
          } else {
            throw new Error("Mot de passe incorrect. Veuillez réessayer.");
          }
        });
      } else {
        throw new Error("Email non trouvé. Veuillez réessayer.");
      }
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login, isAuthenticated, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
