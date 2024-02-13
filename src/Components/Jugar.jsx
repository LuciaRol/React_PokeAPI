import React, { useState, useEffect } from 'react';
import ListaPokemon from './ListaPokemon';
import DetallePokemon from './DetallePokemon';
import '../App.css';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { getAuth } from 'firebase/auth'; // Importa getAuth desde firebase/auth
import firebaseApp from './firebaseConfig'; // Importar la instancia de Firebase
import app from './firebaseConfig';


const db = getFirestore(firebaseApp);

function Jugar() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    getTotalPokemonCount();
  }, []);

  useEffect(() => {
    if (totalPokemonCount > 0) {
      fetchRandomPokemon();
    }
  }, [totalPokemonCount]);

  useEffect(() => {
    getLatestScoreFromFirestore();
  }, []);

  const getLatestScoreFromFirestore = async () => {
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
  
      if (user) {
        const q = query(collection(db, "puntuacion_juego"), 
                        where("userEmail", "==", user.email),
                        orderBy("timestamp", "desc"), 
                        limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const latestScore = doc.data().score;
          setScore(latestScore);
        });
      } else {
        console.error("No se pudo obtener el usuario actual.");
      }
    } catch (error) {
      console.error("Error al obtener la última puntuación:", error);
    }
  };
  const fetchRandomPokemon = async (errorCount = 0) => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * totalPokemonCount) + 1;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      const pokemonName = data.name;
      const imageUrl = data.sprites.other['official-artwork'].front_default;
      setPokemonData({ name: pokemonName, imageUrl: imageUrl });
      setMessage('');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching random Pokemon:', error);
      if (errorCount < 10) {
        fetchRandomPokemon(errorCount + 1);
      } else {
        console.error('Máximo números de errores.');
        setLoading(false);
      }
    }
  };
  

  const getTotalPokemonCount = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();
      const totalCount = data.count;
      setTotalPokemonCount(totalCount);
    } catch (error) {
      console.error('Error fetching total Pokemon count:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.toLowerCase() === pokemonData.name.toLowerCase()) {
        setMessage('¡Has acertado!');
        setScore(prevScore => {
          const newScore = prevScore + 10;
          saveScoreToFirestore(newScore); // Aquí se llama a saveScoreToFirestore
          return newScore;
        });
      } else {
        setMessage('¡Has fallado! Este pokemon se llama ' + pokemonData.name);
        setScore(prevScore => {
          const newScore = prevScore - 5;
          saveScoreToFirestore(newScore); // Y aquí también
          return newScore;
        });
      }
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const saveScoreToFirestore = async (newScore) => {
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
  
      if (user) {
        const docRef = await addDoc(collection(db, "puntuacion_juego"), {
          score: newScore,
          userEmail: user.email,
          timestamp: serverTimestamp() 
        });
        console.log("Puntuación guardada con éxito:", docRef.id);
      } else {
        console.error("No se pudo encontrar el usuario actual.");
      }
    } catch (error) {
      console.error("Error al guardar la puntuación:", error);
    }
  };

  return (
    <>
      <div className="container-game">
        <button className="game-btn" onClick={fetchRandomPokemon}>Nuevo Pokémon</button>
        {pokemonData && (
          <div>
            <p>Nombre del Pokémon: {pokemonData.name}</p>
            <img className="game-img" src={pokemonData.imageUrl} alt="" />
          </div>
        )}
        <input 
          type="text" 
          placeholder="Escribe el nombre del Pokémon" 
          value={inputValue} 
          onChange={handleChange} 
          onKeyPress={handleKeyPress} 
        />
        <p>Puntuación: {score}</p>
        <p>{message}</p>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          null
        )}
      </div>
    </>
  );  
}

export default Jugar;
