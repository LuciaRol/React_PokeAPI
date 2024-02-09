import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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
    humanshape: 'Humanoide',
    mineral: 'Mineral',
    amorphous: 'Amorfo',
    water3: 'Agua 3',
    water2: 'Agua 2',
    ditto: 'Ditto',
    dragon: 'Dragón',
    noeggs: 'Sin huevos',
    undiscovered: 'No descubierto'
};

export default function DetallePokemon() {
  const [detallePokemon, setDetallePokemon] = useState(null);
  const [grupoHuevo, setGrupoHuevo] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(datosPokemon => {
        setDetallePokemon(datosPokemon);
        console.log(datosPokemon);
      });
  }, [id]);

  useEffect(() => {
    if (detallePokemon) {
      fetch(detallePokemon.species.url)
        .then(response => response.json())
        .then(datosPokemon => {
          const huevo = datosPokemon.egg_groups.map(group => gruposHuevoTraducidos[group.name]).join(', ');
          setGrupoHuevo(huevo);
        });
    }
  }, [detallePokemon]);

  return (
    <>
      <section>
        <h1 className="title">DETALLE DEL POKÉMON</h1>
        <div className="btn-group">
          <button className="btn"><Link to="/listapokemon"><span className="nav-link">Volver</span></Link></button>
          <button className="btn"><Link to="/jugar"><span className="nav-link">Ir a jugar</span></Link></button>
        </div>
        {detallePokemon && (
          <div>
            <img src={detallePokemon.sprites.front_default} alt={detallePokemon.name} />
            <p>Número: {detallePokemon.id}</p>
            <p>Tipo: {detallePokemon.types.map(type => tiposTraducidos[type.type.name]).join(', ')}</p>
            <p>Peso: {detallePokemon.weight / 10} kg</p>
            <p>Altura: {detallePokemon.height / 10} m</p>
            <p>Grupo Huevo: {grupoHuevo}</p>
          </div>
        )}
        {!detallePokemon && <p>Cargando...</p>}
      </section>
    </>
  );
}
