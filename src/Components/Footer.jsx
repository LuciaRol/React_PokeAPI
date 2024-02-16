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
                    <h5>&#169; 2024 Lucía Rodríguez López</h5>
                </div>
            </footer>
            
        </>
    )
}

export default Footer