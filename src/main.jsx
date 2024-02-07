import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ListaPokemon from './Components/ListaPokemon.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navegacion from './Components/Navegacion.jsx'
import DetallePokemon from './Components/DetallePokemon.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <Navegacion></Navegacion>
      <App></App>
    </>
    ,
    errorElement:<h1>Ruta no valida</h1>
  },
   {
    path: "listapokemon",
    element: 
    <>
      <Navegacion></Navegacion>
      <ListaPokemon/>,
    </>
    
  },
  {
    path: "detalle/:id",
    element: 
    <>
      <Navegacion></Navegacion>
      <DetallePokemon/>,
    </>
    
  }, 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <RouterProvider router= {router}/>

    
  </React.StrictMode>,
)
