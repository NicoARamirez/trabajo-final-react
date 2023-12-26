import React, { useState } from 'react';
import { useAuth } from "@/components/context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.error('Error al iniciar sesión:', error.message);
        throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
      }

      const userData = await response.json();
      setUser(userData);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <p></p>
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        <button onClick={handleLogin}>
          Login
        </button>
      </ul>
    </div>
  );
};

export default Login;
