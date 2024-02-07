import {useState,useEffect} from 'react'
import ListaPokemon from './ListaPokemon';
import DetallePokemon from './DetallePokemon';
import '../App.css'

import {
    Link
} from "react-router-dom";

function Navegacion(){
    return(
        <>
            <header>
                <div><h2>LOGO</h2></div>
                <div class="nav-menu">
                    <Link to="/"><span class="nav-link">Inicio</span></Link>
                    <Link to="/listapokemon"><span class="nav-link">Pokédex</span></Link>
                    <Link to="/detalle/32"><span class="nav-link">Detalle</span></Link>
                </div>
                
            </header>
            
        </>
    )
}

export default Navegacion


