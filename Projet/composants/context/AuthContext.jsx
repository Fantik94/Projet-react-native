import React, { createContext, useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import db from '../../config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const login = async (email, password) => {
    try {
      const gestionnairesRef = collection(db, 'gestionnaire');
      const q = query(gestionnairesRef, where('email', '==', email));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          const data = doc.data();
          const storedPassword = data.password;
        });
      } else {
        throw new Error('Email non trouvé. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur d\'authentification :', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
