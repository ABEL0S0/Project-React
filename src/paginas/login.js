import React, { useState } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Hacer solicitud al primer endpoint
      const response1 = await fetch('http://localhost:3001/0');
      const user1 = await response1.json();

      // Hacer solicitud al segundo endpoint
      const response2 = await fetch('http://localhost:3001/1');
      const user2 = await response2.json();

      // Verificar si el usuario y la contraseña coinciden con alguno de los usuarios obtenidos
      if ((user1.username === username && user1.password === password) || 
          (user2.username === username && user2.password === password)) {
        onLogin(username);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="login">
      <header className="App-header">
        <div className="form-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Usuario:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-outline-success">Iniciar Sesión</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </header>
    </div>
  );
};

export default Login;
