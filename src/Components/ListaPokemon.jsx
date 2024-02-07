import {useState,useEffect} from 'react'
import Navegacion from './Navegacion';

let url;

function ListaPokemon(){
    const [listaPokemon, setListaPokemon] = useState([]);
   

    function cargarMas(){
        fetch(url)
          .then((response) => response.json())
          .then((datosPokemon) => {
            console.log(datosPokemon)
            url = datosPokemon.next;
            setListaPokemon([...listaPokemon,...datosPokemon.results])
            
          });
    }

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=&&limit=8")
          .then((response) => response.json())
          .then((datosPokemon) => {
            console.log(datosPokemon)
            url = datosPokemon.next;
            setListaPokemon([...listaPokemon,...datosPokemon.results])
            
          });
      }, []);

      const handleSaberMas = (pokemonUrl) => {
        // aquí irá a ruta al detalle
        console.log("Saber más sobre:", pokemonUrl);
      };

      
      let lista = listaPokemon.map(nombre =>
        <>
          <li key={nombre.name}>
            {nombre.name}
            <button onClick={() => handleSaberMas(pokemon.url)}>Saber más</button>
          </li>
        </>

      )

    return(
        <>
            <h1>Componente para lista Pokemon</h1>
            <ul>
              {lista}
            </ul>
            <button onClick={cargarMas}>Cargar más</button>
        </>

    )
}
export default ListaPokemon