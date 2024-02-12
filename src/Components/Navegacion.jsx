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
                <div><img src="../../src/assets/img/pokeball.png" alt="" class="logo-img" /></div>
                <div class="nav-menu">
                    <Link to="/"><span class="nav-link">Inicio</span></Link>
                    <Link to="/listapokemon"><span class="nav-link">Pokédex</span></Link>
                    {/* <Link to="/jugar"><span class="nav-link">Jugar</span></Link> */}
                    
                </div>
                
            </header>
            
        </>
    )
}

export default Navegacion


