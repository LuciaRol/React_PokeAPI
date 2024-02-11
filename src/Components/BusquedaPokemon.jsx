import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetallePokemon from './DetallePokemon';
import { tiposTraducidos, gruposHuevoTraducidos } from './traducciones'; // Importar las traducciones desde el archivo traducciones.jsx

function Busqueda() {
    const [nombrePokemon, setNombrePokemon] = useState('');
    const [detallesPokemon, setDetallesPokemon] = useState(null);
    const [error, setError] = useState(null);
    const navigateTo = useNavigate();

 
    const buscarPokemon = async () => {
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
            if (!respuesta.ok) {
                throw new Error('Error. Pokémon no encontrado.');
            }
            const datos = await respuesta.json();
            navigateTo(`/detalle/${datos.id}`); // Navega a la página de detalles con el ID del Pokémon
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCambioInput = (e) => {
        setNombrePokemon(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            buscarPokemon();
        }
    };

    let buscar = 
    <>
        <input
            type="text"
            placeholder='Busca tu Pokémon favorito'
            value={nombrePokemon}
            onChange={handleCambioInput}
            onKeyDown={handleKeyDown} 
        />
    </>

    let caracteristicas =
    <>
        {detallesPokemon && (
            <div className="card">
                <div className="card-header">{detallesPokemon.name}</div>
                <div className="card-body">
                    <img src={detallesPokemon.sprites.front_default} alt={detallesPokemon.name} class="img" />
                    <p><strong>Número:</strong> {detallesPokemon.id}</p>
                    <p><strong>Altura:</strong> {detallesPokemon.height / 10} m</p>
                    <p><strong>Peso:</strong> {detallesPokemon.weight / 10} kg</p>
                    <p><strong>Tipo:</strong> {detallesPokemon.tipos}</p>
                    <p><strong>Grupo Huevo:</strong> {detallesPokemon.grupoHuevo}</p>
                </div>
            </div>
        )}
    </>

    return (
        <>
            <div class="container-search">
                <div class="input-group mb-3">
                    {buscar}
                    <button class="btn btn-primary" onClick={buscarPokemon}>Buscar</button>
                </div>
                {caracteristicas}
                {error && <div class="alert alert-danger">{error}</div>}
            </div>
        </>
    );
}

export default Busqueda;
