import React, { useState, useEffect } from 'react';
import ListaPokemon from './ListaPokemon';
import DetallePokemon from './DetallePokemon';
import '../App.css';

import { Link } from "react-router-dom";

function Jugar() {
  const [pokemonImageUrl, setPokemonImageUrl] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async () => {
    setLoading(true); 
    const randomId = Math.floor(Math.random() * 898) + 1;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      const imageUrl = data.sprites.other['official-artwork'].front_default;
      setPokemonImageUrl(imageUrl);
    } catch (error) {
      console.error('Error fetching random Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-game">
        <button className="game-btn" onClick={fetchRandomPokemon}>Nuevo Pokémon</button>
        {loading ? (
          <p>Cargando...</p> 
        ) : (
        <img src={pokemonImageUrl} alt="" />
        )}
      </div>
    </>
  );
}

export default Jugar;
