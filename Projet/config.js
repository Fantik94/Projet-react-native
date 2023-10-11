import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8UF5yHTnTga5EXaTqOZ77wIFHzyirfqs",
  authDomain: "projet-react-native-h3m1.firebaseapp.com",
  projectId: "projet-react-native-h3m1",
  storageBucket: "projet-react-native-h3m1.appspot.com",
  messagingSenderId: "93160791658",
  appId: "1:93160791658:web:ba660a6d00bee2ea59f413",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
