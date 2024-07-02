import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Accordion = ({ id, title, fecha_inicio, fecha_fin, status, progress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const goAsistance = () => {
    navigate(`/asistencia`);
  };

  const editModule = () => {
    console.log('id modulo' + id);
    navigate(`/editar-modulo`, { state: { id, title, fecha_inicio, fecha_fin, status, progress } });
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="accordion-container bg-white border border-gray-300 rounded-lg shadow-lg mb-6 w-full sm:w-[calc(100%)] hover:bg-gray-200 transition-colors duration-300">
      <div className="accordion-header p-4 cursor-pointer" onClick={toggleAccordion}>
        <div className="flex items-center justify-between">
          <div className="bg-transparent p-2">
            <h3 className="text-lg sm:text-xl md:text-2xl">{title}</h3>
            <p className="text-sm sm:text-base">Fecha de inicio: {formatDate(fecha_inicio)}</p>
            <p className="text-sm sm:text-base">Fecha de fin: {formatDate(fecha_fin)}</p>
          </div>
          <div className="flex items-center">
            <button className={`px-4 py-0.5 rounded ${getStatusColor(status)} text-white text-sm sm:text-base`}>
              {status}
            </button>
            <div className="flex items-center ml-2">
              <div className="bg-gray-300 rounded-full h-2 w-20 sm:w-24 md:w-28 mr-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: `${progress}%` }}></div>
              </div>
              <span className={`material-symbols-outlined ${isOpen ? 'rotate-180' : ''} transition-transform duration-300`}>
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="accordion-content p-4">
          <button onClick={goAsistance} className="mt-4 bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mr-4">
            Lista asistencia
          </button>
          <button onClick={editModule} className="mt-4 bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

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

export default Accordion;
