import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tiposTraducidos, gruposHuevoTraducidos, habitatsTraducidos, statsTraducidos } from './traducciones'; // Importar las traducciones desde el archivo traducciones.jsx


export default function DetallePokemon() {
    const [detallePokemon, setDetallePokemon] = useState(null);
    const [grupoHuevo, setGrupoHuevo] = useState('');
    const [habitat, setHabitat] = useState('');
    const { id } = useParams();
   

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(datosPokemon => {
                setDetallePokemon(datosPokemon);
            });
    }, [id]);

    useEffect(() => {
        if (detallePokemon) {
            fetch(detallePokemon.species.url)
                .then(response => response.json())
                .then(datosPokemon => {
                    const huevo = datosPokemon.egg_groups.map(group => gruposHuevoTraducidos[group.name]).join(', ');
                    const habitat = datosPokemon.habitat ? habitatsTraducidos[datosPokemon.habitat.name] : 'Desconocido';
                    setGrupoHuevo(huevo);
                    setHabitat(habitat);
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
                        <p>Hábitat: {habitat}</p>
                        <p>Stats:</p>
                        <ul>
                            {detallePokemon.stats.map(stat => (
                                <li key={stat.stat.name}>{statsTraducidos[stat.stat.name]}: {stat.base_stat}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {!detallePokemon && <p>Cargando...</p>}
            </section>
        </>
    );
}
