import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import app from './firebaseConfig';

function Landing() {
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

    const handleRegister = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado:", userCredential.user.uid);
            setIsLoggedIn(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUnregister = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
            const auth = getAuth(app);
            
            try {
                await deleteUser(auth.currentUser);
                setIsLoggedIn(false);
            } catch (error) {
                console.error('Error al eliminar la cuenta:', error);
            }
        }
    };

    return (
        <div className="container-landing">
            <h1>ESTE ES EL COMPONENTE LANDING</h1>
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
                    <button onClick={handleRegister}>Registrarse</button>
                </div>
            ) : (
                <div>
                    <p>Hola, {email}!</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                    <button onClick={handleUnregister}>Eliminar cuenta</button>
                </div>
            )}
            {error && <p>La cuenta no existe</p>}
        </div>
    );
}

export default Landing;
