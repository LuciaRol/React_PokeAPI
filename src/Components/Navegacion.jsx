import {useState,useEffect} from 'react'
import ListaPokemon from './ListaPokemon';
import DetallePokemon from './DetallePokemon';

import {
    Link
} from "react-router-dom";

function Navegacion(){
    return(
        <>
            <Link to="/">Inicio</Link>
            <Link to="/listapokemon">Pokemon</Link>
            <Link to="/detalle/32">Pikachu</Link>
        </>
    )
}

export default Navegacion