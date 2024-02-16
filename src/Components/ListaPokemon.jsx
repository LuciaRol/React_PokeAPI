import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navegacion from './Navegacion';
import Busqueda from './BusquedaPokemon';
import DetallePokemon from './DetallePokemon';

function ListaPokemon() {
    const [listaPokemon, setListaPokemon] = useState([]);
    const [cargando, setCargando] = useState(false); 

    useEffect(() => {
        setCargando(true); 
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8')
            .then(response => response.json())
            .then(datosPokemon => {
                setListaPokemon(datosPokemon.results);
                setCargando(false); 
            });
    }, []);

    const cargarMas = () => {
        setCargando(true); 
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=' + listaPokemon.length + '&limit=8')
            .then(response => response.json())
            .then(datosPokemon => {
                setListaPokemon(prevListaPokemon => [...prevListaPokemon, ...datosPokemon.results]);
                setCargando(false); 
            });
    };

    const handleSaberMas = pokemonUrl => {
        console.log('Saber más sobre:', pokemonUrl);
    };

    let lista = listaPokemon.map((pokemon, index) => (
        <div key={pokemon.name} className="pokemon-card">
            <img
                className="img-lista"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} 
                alt={pokemon.name}
            />
            <div className="pokemon-info">
                <span className="pokemon-name">{pokemon.name}</span>
                <Link to={`/detalle/${pokemon.url.split('/')[6]}`}>
                    <span className="nav-link">Saber más</span>
                </Link>
            </div>
        </div>
    ));

    return (
        <div className="container">
            <h1>Pokédex</h1>
            <div className="card">
                <div className="pokemon-container">
                    {lista}
                </div>
                {cargando && <p>Cargando...</p>}
                {!cargando && <button className="btn" onClick={cargarMas}>Cargar más</button>} 
            </div>
        </div>
    );
}

export default ListaPokemon;
