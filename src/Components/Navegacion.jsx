import {useState,useEffect} from 'react'
import ListaPokemon from './ListaPokemon';
import DetallePokemon from './DetallePokemon';
import '../App.css'
import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import app from './firebaseConfig';

import {
    Link
} from "react-router-dom";

function Navegacion(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario ha iniciado sesión:", userCredential.user.uid);
            setIsLoggedIn(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        const auth = getAuth(app);
        
        try {
            await signOut(auth);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };


    return(
        <>
            <header>
                <div><img src="../../src/assets/img/pokeball.png" alt="" class="logo-img" /></div>
                {!isLoggedIn ? (
                <div>
                    <h2>Iniciar sesión</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Iniciar sesión</button>
                    </form>
                    
                </div>
            ) : (
                <div>
                    <div> 
                        <Link to="/jugar"><span className="nav-link">Jugar</span></Link>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                      
                    </div>
                    <p>Hola, {email}!</p>
                </div>
            )}
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


