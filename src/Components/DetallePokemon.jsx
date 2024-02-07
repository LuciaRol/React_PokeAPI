import React from 'react'
import { useParams } from 'react-router-dom';
/* rfc */

export default function DetallePokemon() {
    let {id}=useParams()

  return (
    <div>
        DetallePokemon
        {id}
    </div>

  )
}
