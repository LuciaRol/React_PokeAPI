// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJ-YAgKrHwEawv_tpE4tqjxR-gHOiil8A",
  authDomain: "pokedex-79ee5.firebaseapp.com",
  projectId: "pokedex-79ee5",
  storageBucket: "pokedex-79ee5.appspot.com",
  messagingSenderId: "138206337561",
  appId: "1:138206337561:web:97bdcb7351c70be1de2888"
};

const app = initializeApp(firebaseConfig);

export default app;