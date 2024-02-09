import React from 'react'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
/* rfc */
import Busqueda from './BusquedaPokemon';
import ListaPokemon from './ListaPokemon';

import {
  Link
} from "react-router-dom";

export default function DetallePokemon() {

  const [detallePokemon, setDetallePokemon] = useState([]);

  let {id}=useParams()

  useEffect(() => {
      fetch('https://pokeapi.co/api/v2/pokemon/'+id)
          .then(response => response.json())
          .then(datosPokemon => {
            setDetallePokemon(datosPokemon);
            console.log(datosPokemon)
          });
  }, []);

    

    

  return (
    <>
      <section>
          <h1 class="title">ESTE ES EL COMPONENTE DETALLE</h1>
          <div class="btn-group">
              <button class="btn"><Link to="/listapokemon"><span class="nav-link">Volver</span></Link></button>
              <button class="btn"><Link to="/jugar"><span class="nav-link">Ir a jugar</span></Link></button>
            </div>
          <div>Aquí van los detalles del Pokémon{id}</div>
      </section>
    </>
    

  )
}
