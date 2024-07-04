import React, { useState, useEffect } from 'react';
import Logo from '../../img/logo_talento.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const EditarSesion = () => {
  const navigate = useNavigate();
  const { id_sesion } = useParams();
  const location = useLocation();
  const { nombre_sesion, estado, fecha, moduloID } = location.state || { nombre_sesion: '', estado: '', fecha: '', moduloID: '' };

  const [sessionID] = useState(id_sesion);
  const [sessionName, setSessionName] = useState(nombre_sesion);
  const [sessionStatus, setSessionStatus] = useState(estado);
  const [sessionDate, setSessionDate] = useState(fecha ? new Date(fecha) : new Date());
  const [sessionModuloID, setModuloID] = useState(moduloID)

  useEffect(() => {
    if (!location.state) {
      axios.get(`http://localhost:3001/api/sesiones/getSesion/${id_sesion}`)
        .then(response => {
          const sesion = response.data.find(s => s.id === parseInt(id_sesion));
          if (sesion) {
            setSessionName(sesion.nombre_sesion);
            setSessionStatus(sesion.estado);
            setSessionDate(new Date(sesion.fecha));
            setModuloID(sesion.moduloID)
            console.log(sesion)
          }
          
        })
        .catch(error => {
          console.error('Error fetching session data:', error);
        });
        
    }
  }, [ id_sesion, location.state]);

  const handleSave = async () => {
    const formData = {
      nombre_sesion: sessionName,
      estado: sessionStatus,
      fecha: sessionDate.toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:3001/api/sesiones/${sessionID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la sesión');
      }
      navigate(`/modulos/${sessionModuloID}/sesiones`);
    } catch (error) {
      console.error('Error al guardar la sesión:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
        <div className="flex items-center pl-4">
          <img src={Logo} alt="Logo Talento" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Editar Sesión</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre de la Sesión:
        </label>
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha:
        </label>
        <DatePicker
          selected={sessionDate}
          onChange={date => setSessionDate(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Estado de la Sesión:
        </label>
        <select
          value={sessionStatus}
          onChange={(e) => setSessionStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        >
          <option value="Finalizado">Finalizado</option>
          <option value="En curso">En curso</option>
          <option value="Próximamente">Próximamente</option>
        </select>

        <button
          onClick={handleSave}
          className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default EditarSesion;
