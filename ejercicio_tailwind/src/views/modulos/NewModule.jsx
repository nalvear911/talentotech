import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Logo from '../../img/logo_talento.png';

const NewModule = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
console.log(id)
  const handleSave = async () => {
    if (startDate > endDate) {
      alert("La fecha de inicio no puede ser posterior a la fecha de fin");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/modulos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_modulo: title,
          fecha_inicio: startDate,
          fecha_fin: endDate,
          bootcampID:id
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el módulo');
      }

      console.log('Nuevo módulo creado:', { title, startDate, endDate, id });
      navigate(`/bootcamps/modulos/${id}`);
    } catch (error) {
      console.error('Error al guardar el módulo:', error);

    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
       <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
                <div className="flex items-center pl-4">
                    <img src={Logo} alt="Logo Talento"/>
                </div>
            </div>
      <h1 className="text-3xl font-bold mb-4">Crear Nuevo Módulo</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre del Módulo:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha de Inicio:
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha de Fin:
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
       
        <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Guardar
        </button>
      </div>
    </div>
  );
};

export default NewModule;
