import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../../img/logo_talento.png';

export default function Sesion() {
    const navigate = useNavigate();
  const { id_modulo } = useParams();
  const [sesiones, setSesiones] = useState([]);
  const [nombreModulo, setNombreModulo] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/sesiones/${id_modulo}`)
      .then(response => {
        setSesiones(response.data);
        if (response.data.length > 0) {
          setNombreModulo(response.data[0].nombre_modulo);
        }
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching sesiones:', error);
      });
  }, [id_modulo]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Finalizado':
        return 'bg-red-500';
      case 'En curso':
        return 'bg-green-500';
      case 'Próximamente':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  const addNuevaSesion = () => {
    navigate('/'+id_modulo+'/nueva-sesion');
};
const handleEdit = (id) => {
  navigate(`/editar-sesion/${id}`);
};
  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
        <div className="flex items-center pl-4">
          <img src={Logo} alt="Logo Talento" />
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Sesiones del Módulo {nombreModulo}</h2>
      <div className="flex flex-col">
      {sesiones.map((sesion, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 mb-4 relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl">{sesion.nombre_sesion}</h3>
                <p className="text-sm sm:text-base">Fecha: {new Date(sesion.fecha).toLocaleDateString('es-ES')}</p>
              </div>
              <button className={`px-4 py-0.5 rounded ${getStatusColor(sesion.estado)} text-white text-sm sm:text-base`}>
                {sesion.estado}
              </button>
            </div>
            <button className="mt-4 bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mr-4">
              {sesion.estado === "Finalizado" ? "Ver grabación" : "Ingresar a la sesión"}
            </button>
            <button onClick={() => handleEdit(sesion.id)} className="mt-4 bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                Editar
            </button>
          </div>
        ))}
      </div>
      <button onClick={addNuevaSesion} className="mt-4 bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Agregar Nuevo Módulo
    </button>
    </div>
  );
}
