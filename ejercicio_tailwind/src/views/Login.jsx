import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../img/fondo.jpeg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar usuario y contraseña
    if (username === 'admin' && password === '1234') {
      console.log('Inicio de sesión exitoso');
      navigate('/home'); // Redirige al usuario a la página de administración
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div
    className="flex items-center justify-center h-screen"
    style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover' }}
  >
      <div className="bg-white bg-opacity-75 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#082563]">Ingresando a Talento Tech</h2>
          <p className="text-[#2d2d2d]">¡Descubre tu potencial!</p>
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-[#2d2d2d] font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#2d2d2d] leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#2d2d2d] font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#2d2d2d] leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-[#2d2d2d] font-bold">
                Recuérdame
              </label>
            </div>
            <button className="bg-[#082563] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 