import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './firebaseConfig';

import {
    Link
} from "react-router-dom";

function Landing() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado:", userCredential.user.uid);
            setIsLoggedIn(true);
            setRegistrationSuccess(true);
            setError(null); // Limpiar el mensaje de error
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegisterWithGoogle = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
    
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Usuario ha iniciado sesión con Google:", result.user.uid);
            setIsLoggedIn(true);
            setRegistrationSuccess(true);
            setError(null); 
            window.location.href = "/"; 
        } catch (error) {
            setError(error.message);
        }
    };
    
    const handleRegisterWithFacebook = async () => {
        const auth = getAuth(app);
        const provider = new FacebookAuthProvider();
    
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Usuario ha iniciado sesión con Facebook:", result.user.uid);
            setIsLoggedIn(true);
            setRegistrationSuccess(true);
            setError(null); 
            window.location.href = "/"; 
        } catch (error) {
            setError(error.message);
        }
    };
    
    return (
        <div className="container-landing">
            <div><img src="../../src/assets/img/eeveevolutions.png" alt="" class="landing-img" /></div>
            {registrationSuccess && <p>¡Registrado correctamente!</p>}
            <div className='landing-register'>
                <h2>Regístrate</h2>
                <form className='landing-form' onSubmit={handleRegister}>
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
                    <button type="submit">Registrarse</button>
                </form>
                <button onClick={handleRegisterWithGoogle}>Registrarse con Google</button>
                <button onClick={handleRegisterWithFacebook}>Registrarse con Facebook</button>
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Landing;
