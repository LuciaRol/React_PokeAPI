import React from 'react'
import { useParams } from 'react-router-dom';
/* rfc */
import Busqueda from './BusquedaPokemon';
import ListaPokemon from './ListaPokemon';

import {
  Link
} from "react-router-dom";


export default function DetallePokemon() {
    let {id}=useParams()

  return (
    <>
      <section>
          <h1 className="title">ESTE ES EL COMPONENTE DETALLE</h1>
          <div class="btn-group">
              <button class="btn"><Link to="/listapokemon"><span class="nav-link">Volver</span></Link></button>
              <button class="btn"><Link to="/jugar"><span class="nav-link">Ir a jugar</span></Link></button>
            </div>
          <div>Aquí van los detalles del Pokémon{id}</div>
      </section>
    </>
    

  )
}
