import React from 'react';
import Logo from '../../img/logo_talento.png';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditModule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id_bootcamp, id, title, status, fecha_inicio, fecha_fin } = location.state || { id: null, title: '', status: '', fecha_inicio: '', fecha_fin: '' };

  const [moduleID, ] = React.useState(id);
  const [moduleTitle, setModuleTitle] = React.useState(title);
  const [moduleStatus, setModuleStatus] = React.useState(status);
  const [moduleStartDate, setModuleStartDate] = React.useState(new Date(fecha_inicio));
  const [moduleEndDate, setModuleEndDate] = React.useState(new Date(fecha_fin));

  const handleSave = async () => {
    if (moduleStartDate > moduleEndDate) {
      alert("La fecha de inicio no puede ser posterior a la fecha de fin");
      return;
    }

    const formData = {
      bootcampID: id_bootcamp,
      id: moduleID,
      nombre_modulo: moduleTitle,
      fecha_inicio: moduleStartDate.toISOString(), 
      fecha_fin: moduleEndDate.toISOString(), 
      estado: moduleStatus,
    };
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:3001/api/modulos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar el módulo');
      }
  
      console.log('Datos del módulo guardados:', formData);
      navigate(`/bootcamps/modulos/${id_bootcamp}`);
    } catch (error) {
      console.error('Error al guardar el módulo:', error);
    }
  
  };
  
  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
        <div className="flex items-center pl-4">
          <img src={Logo} alt="Logo Talento" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Editar Módulo</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre del Módulo:
        </label>
        <input
          type="text"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha de Inicio:
        </label>
        <DatePicker
          selected={moduleStartDate}
          onChange={date => setModuleStartDate(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha de Fin:
        </label>
        <DatePicker
          selected={moduleEndDate}
          onChange={date => setModuleEndDate(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Estado del Módulo:
        </label>
        <select
          value={moduleStatus}
          onChange={(e) => setModuleStatus(e.target.value)}
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

export default EditModule;
