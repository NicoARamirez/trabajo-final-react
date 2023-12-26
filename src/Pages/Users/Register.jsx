import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const isEmailAvailable = async (email) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/users/is-available', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const result = await response.json();
  return result.isAvailable;
};

const registerUser = async ({ name, email, password, avatar }) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, avatar }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const emailAvailable = await isEmailAvailable(email);

      if (!emailAvailable) {
        throw new Error('El correo electrónico ya está en uso.');
      }

      return registerUser({ name, email, password, avatar });
    },
    onSuccess: () => {
      console.log('Registro exitoso');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error al registrar usuario:', error.message);
      setError(error.message);
    },
  });

  const handleRegister = async () => {
    try {
      setError(null);
      await mutation.mutateAsync();
    } catch (error) {
      console.error('Error al manejar el registro:', error.message);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p></p>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <p></p>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <p></p>
      <label>
        Avatar (URL):
        <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      </label>
      <p></p>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error al registrar usuario: {error}
        </div>
      )}
      <ul>
        <button onClick={handleRegister}>Registrarse</button>
      </ul>
    </div>
  );
};

export default Register;
