import {useState,useEffect} from 'react'

function Menu(){



    return(
        <>
        <header class="header">
            <nav class="navbar">
                <div>
                    <a class="navbar-link" href="#"><img src="" class="navbar-logo" alt="..."/></a>
                    <div>
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                            <a class="nav-link" href="#">Pokémon</a>
                            <a class="nav-link" href="#">Juego</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        </>
    )

}
export default Menu