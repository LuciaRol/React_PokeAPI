import React, { useState, useEffect } from 'react';
import ListaPokemon from './ListaPokemon';
import DetallePokemon from './DetallePokemon';
import '../App.css';

import { Link } from "react-router-dom";

function Jugar() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0); // Estado para almacenar la puntuación

  useEffect(() => {
    getTotalPokemonCount();
  }, []);

  useEffect(() => {// lo hacemos por separado para que termine gettotalPokemonCount y se lance correctamente fetchRandomPokemon
    if (totalPokemonCount > 0) {
      fetchRandomPokemon();
    }
  }, [totalPokemonCount]);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * totalPokemonCount) + 1;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      const pokemonName = data.name;
      const imageUrl = data.sprites.other['official-artwork'].front_default;
      setPokemonData({ name: pokemonName, imageUrl: imageUrl });
      setMessage('');
    } catch (error) {
      console.error('Error fetching random Pokemon:', error);
    } finally {
      setLoading(false);
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
        setScore(score + 10); // Suma 10 puntos si acierta
      } else {
        setMessage('¡Has fallado! Este pokemon se llama ' + pokemonData.name);
        setScore(score - 5); // Resta 5 puntos si falla
      }
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="container-game">
        <button className="game-btn" onClick={fetchRandomPokemon}>Nuevo Pokémon</button>
        {pokemonData && (
          <div>
            <p>Nombre del Pokémon: {pokemonData.name}</p>
            <img src={pokemonData.imageUrl} alt="" />
          </div>
        )}
        <input 
          type="text" 
          placeholder="Escribe el nombre del Pokémon" 
          value={inputValue} 
          onChange={handleChange} 
          onKeyPress={handleKeyPress} 
        />
        <p>Puntuación: {score}</p> {/* Muestra la puntuación */}
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
