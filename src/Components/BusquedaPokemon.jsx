import {useState,useEffect} from 'react'
import ListaPokemon from './ListaPokemon';
import DetallePokemon from './DetallePokemon';


function Busqueda(){
    return(
        <>
            <div className="btn-group">
                <input type="text" placeholder='Introduce el nombre de un Pokémon'></input>
                <button className="btn">Buscar</button>
            </div>
        </>
    )
}

export default Busqueda