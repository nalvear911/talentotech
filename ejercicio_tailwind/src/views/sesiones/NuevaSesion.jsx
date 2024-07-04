import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Logo from '../../img/logo_talento.png';

const NuevaSesion = () => {
  const { id_modulo } = useParams();
  const [nombreSesion, setNombreSesion] = useState('');
  const [fecha, setFecha] = useState(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sesiones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_sesion: nombreSesion,
          fecha: fecha,
          moduloID: id_modulo,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la sesión');
      }

      console.log('Nueva sesión creada:', { nombreSesion, fecha, id_modulo });
      navigate(`/modulos/${id_modulo}/sesiones`);
    } catch (error) {
      console.error('Error al guardar la sesión:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
        <div className="flex items-center pl-4">
          <img src={Logo} alt="Logo Talento"/>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Crear Nueva Sesión</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre de la Sesión:
        </label>
        <input
          type="text"
          value={nombreSesion}
          onChange={(e) => setNombreSesion(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha:
        </label>
        <DatePicker
          selected={fecha}
          onChange={(date) => setFecha(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <button onClick={handleSave} className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Guardar
        </button>
      </div>
    </div>
  );
};

export default NuevaSesion;
