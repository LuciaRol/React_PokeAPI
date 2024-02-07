import React, { useState } from 'react';

function Busqueda() {
    const [nombrePokemon, setNombrePokemon] = useState('');
    const [detallesPokemon, setDetallesPokemon] = useState(null);
    const [error, setError] = useState(null);

    const buscarPokemon = async () => {
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
            if (!respuesta.ok) {
                throw new Error('Error. Pokémon no encontrado.');
            }
            const datos = await respuesta.json();
            setDetallesPokemon(datos);
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

    const renderTable = () => {
        return detallesPokemon ? (
            <>
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Altura</th>
                        <th>Peso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{detallesPokemon.id}</td>
                        <td>
                            <img src={detallesPokemon.sprites.front_default} alt={detallesPokemon.name} style={{ width: '100px' }} />
                        </td>
                        <td>{detallesPokemon.name}</td>
                        <td>{detallesPokemon.height / 10} m</td>
                        <td>{detallesPokemon.weight / 10} kg</td>
                    </tr>
                </tbody>
            </table>
            </>
        ) : null;
    };
    
    
    let buscar = 
    <>
        <input
            type="text"
            placeholder='Introduce el nombre de un Pokémon'
            value={nombrePokemon}
            onChange={handleCambioInput}
            onKeyDown={handleKeyDown} 
        />
    </>
    
    return (
        <>
            <div className="btn-group">
                {buscar}
                <button className="btn" onClick={buscarPokemon}>Buscar</button>
            </div>

            {error && <div>{error}</div>}
            {renderTable()}
        </>
    );
}

export default Busqueda;
