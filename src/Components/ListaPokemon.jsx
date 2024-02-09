import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navegacion from './Navegacion';
import Busqueda from './BusquedaPokemon';
import DetallePokemon from './DetallePokemon';

function ListaPokemon() {
    const [listaPokemon, setListaPokemon] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8')
            .then(response => response.json())
            .then(datosPokemon => {
                setListaPokemon(datosPokemon.results);
            });
    }, []);

    const cargarMas = () => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=' + listaPokemon.length + '&limit=8')
            .then(response => response.json())
            .then(datosPokemon => {
                setListaPokemon(prevListaPokemon => [...prevListaPokemon, ...datosPokemon.results]);
            });
    };

    const handleSaberMas = pokemonUrl => {
        console.log('Saber más sobre:', pokemonUrl);
        // Aquí puedes hacer lo que necesites cuando se selecciona un Pokémon
    };

    let lista = listaPokemon.map((pokemon, index) => (
        <div key={pokemon.name} className="pokemon-card">
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} 
                alt={pokemon.name}
            />
            <div className="pokemon-info">
                <span>{pokemon.name}</span>
                <Link to={`/detalle/${pokemon.url.split('/')[6]}`}>
                    <span className="nav-link">Saber más</span>
                </Link>
            </div>
        </div>
    ));

    return (
        <>
        <h1>Componente para lista Pokémon</h1>
        <div className="card">
            <div className="pokemon-container">
                {lista}
            </div>
            <button class="btn" onClick={cargarMas}>Cargar más</button>
        </div>
            
            
        </>
    );
}

export default ListaPokemon;
