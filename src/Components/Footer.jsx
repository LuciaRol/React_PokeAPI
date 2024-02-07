import {useState,useEffect} from 'react'
import ListaPokemon from './ListaPokemon';
import DetallePokemon from './DetallePokemon';
import '../App.css'

import {
    Link
} from "react-router-dom";

function Footer(){
    return(
        <>
            <footer class="footer">
                <div class="nav-footer">
                    <p>&#169; 2024 Lucía Rodríguez López</p>
                    <button class="btn">Check my github!</button>
                </div>
            </footer>
            
        </>
    )
}

export default Footer