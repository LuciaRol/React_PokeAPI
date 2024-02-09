import React, { useState } from 'react';
import DetallePokemon from './DetallePokemon';

function Busqueda() {
    const [nombrePokemon, setNombrePokemon] = useState('');
    const [detallesPokemon, setDetallesPokemon] = useState(null);
    const [error, setError] = useState(null);

    // traducción de los tipos
    const tiposTraducidos = {
        normal: 'Normal',
        fighting: 'Lucha',
        flying: 'Volador',
        poison: 'Veneno',
        ground: 'Tierra',
        rock: 'Roca',
        bug: 'Bicho',
        ghost: 'Fantasma',
        steel: 'Acero',
        fire: 'Fuego',
        water: 'Agua',
        grass: 'Planta',
        electric: 'Eléctrico',
        psychic: 'Psíquico',
        ice: 'Hielo',
        dragon: 'Dragón',
        dark: 'Siniestro',
        fairy: 'Hada'
    };

    // traducción de los grupo huevo
    const gruposHuevoTraducidos = {
        monster: 'Monstruo',
        water1: 'Agua 1',
        bug: 'Bicho',
        flying: 'Volador',
        ground: 'Tierra',
        fairy: 'Hada',
        plant: 'Planta',
        humanshape: 'Forma humana',
        mineral: 'Mineral',
        amorphous: 'Amorfo',
        water3: 'Agua 3',
        water2: 'Agua 2',
        ditto: 'Ditto',
        dragon: 'Dragón',
        noeggs: 'Sin huevos',
        undiscovered: 'No descubierto'
    };

    const buscarPokemon = async () => {
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
            if (!respuesta.ok) {
                throw new Error('Error. Pokémon no encontrado.');
            }
            const datos = await respuesta.json();

            const speciesResponse = await fetch(datos.species.url);
            const speciesData = await speciesResponse.json();

            // Traducción de tipos y grupos huevo
            const tipos = datos.types.map(type => tiposTraducidos[type.type.name]).join(', ');
            const grupoHuevo = speciesData.egg_groups.map(group => gruposHuevoTraducidos[group.name]).join(', ');

            setDetallesPokemon({
                ...datos,
                tipos,
                grupoHuevo
            });
            setError(null);
        } catch (error) {
            setDetallesPokemon(null);
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
