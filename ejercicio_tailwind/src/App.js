import React, { useState } from 'react';
import logo from './img/logo_talento.png';

const LeftSidebar = () => {
  return (
    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/4 ml-2">
      <div className="bg-[#f9fafb] rounded-3xl p-6 shadow-lg">
        <div className="flex items-center mb-6 group">
          <div className="bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mr-4 group-hover:scale-110 duration-300">
            <span className="text-white font-bold">NA</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-800 font-bold text-lg group-hover:text-blue-900 duration-300">Nelly Alvear Cisneros</h3>
                <p className="text-gray-600 text-sm group-hover:text-blue-900 duration-300">alvearcisneros@gmail.com</p>
              </div>
              <button className="bg-white text-green-500 hover:bg-green-500 hover:text-white px-2 py-1 rounded-md flex items-center border border-green-500 w-20">
                <span className="material-symbols-outlined text-green-500 hover:text-white mr-1">trophy</span>
                <span>200</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">home</span>
            <span>Inicio</span>
          </button>
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">bookmark</span>
            <span>Bootcamp</span>
          </button>
          <hr className="w-full mb-4 border-gray-300" />
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">diversity_2</span>
            <span>Hackathons</span>
          </button>
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">shopping_cart</span>
            <span>Marketplace</span>
          </button>
          <hr className="w-full mb-4 border-gray-300" />
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">work</span>
            <span>Job Connections</span>
          </button>
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">menu_book</span>
            <span>Manual de Usuario</span>
          </button>
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80 mb-6">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">handyman</span>
            <span>Herramientas</span>
          </button>
          <button className="bg-transparent text-gray-400 px-6 py-2 rounded-md flex items-center border border-transparent w-80 mb-6">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800"></span>
            <span></span>
          </button>
          <button className="bg-transparent text-gray-400 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800"></span>
            <span></span>
          </button>
          <button className="bg-white text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-md flex items-center border border-red-500 w-80">
            <span className="material-symbols-outlined mr-2 hover:text-white">logout</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ title, date, status, progress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-container bg-white border border-gray-300 rounded-lg shadow-lg mb-6 w-full sm:w-[calc(100%)] hover:bg-gray-200 transition-colors duration-300">
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className="flex items-center justify-between">
          <div className="bg-transparent p-2">
            <h3 className="text-lg sm:text-xl md:text-2xl">{title}</h3>
            <p className="text-sm sm:text-base">{date}</p>
          </div>
          <div>
            <button className={`px-4 py-0.5 rounded ${getStatusColor(status)} text-white text-sm sm:text-base`}>
              {status}
            </button>
            {/* Progreso del módulo */}
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full h-2 w-20 sm:w-24 md:w-28 mr-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: `${progress}%` }}></div>
              </div>
              <span className={`material-symbols-outlined ${isOpen ? 'rotate-180' : ''} hover:text-blue-900 transition-colors duration-300 text-sm sm:text-base`}>
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`accordion-content ${isOpen ? 'show' : ''} p-2`}>
        {/* Contenido del acordeón */}
      </div>
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

const CentralContent = () => {
  const accordionData = [
    {
      title: 'Módulo 01',
      date: 'Lunes, 1 de marzo al 30 de marzo de 2024',
      status: 'Finalizado',
      progress: 100
    },
    {
      title: 'Módulo 02',
      date: 'Lunes, 1 de abril al 30 de abril de 2024',
      status: 'Finalizado',
      progress: 100
    },
    {
      title: 'Módulo 03',
      date: 'Lunes, 1 de mayo al 30 de mayo de 2024',
      status: 'En curso',
      progress: 35
    },
    {
      title: 'Módulo 04',
      date: 'Lunes, 1 de junio al 30 de junio de 2024',
      status: 'Próximamente',
      progress: 0
    }
  ];

  const totalProgress = accordionData.reduce((acc, curr) => acc + curr.progress, 0) / accordionData.length;

  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
        <div className="flex items-center pl-4">
          <img src={logo} alt="Logo Talento"/>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 w-full mt-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Desarrollo Web Full Stack</h2>
        <div className="w-full bg-gray-300 rounded-full h-4 sm:h-6 mt-4 overflow-hidden">
          <div className="bg-blue-900 rounded-full h-4 sm:h-6 animate-progress" style={{ width: `${totalProgress}%` }}></div>
        </div>
      </div>

      <div className="flex w-full flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 pr-8">
          {accordionData.map((item, index) => (
            <Accordion
              key={index}
              title={item.title}
              date={item.date}
              status={item.status}
              progress={item.progress}
            />
          ))}
        </div>
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-4 pr-5 hover:bg-gray-200 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-blue-900 rounded-full w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 flex items-center justify-center mr-4 hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-white hover:text-blue-500 transition-colors duration-300 text-base sm:text-lg md:text-xl">
                android
              </span>
            </div>
            <div>
              <h3 className="text-gray-800 font-bold text-lg sm:text-xl md:text-2xl">Hola, soy Tech. Tu asistente virtual de Talento Tech</h3>
              <p className="text-gray-600 text-sm sm:text-base">¿En qué puedo ayudarte?</p>
            </div>
          </div>
          <div className="flex items-center justify-end mt-auto">
            <input type="text" className="w-full bg-gray-100 rounded-full py-1 px-4 text-gray-600 focus:outline-none" placeholder="Escribe tu mensaje" />
            <button className="ml-2 bg-green-500 rounded-full p-2 hover:bg-green-600 transition-colors duration-300">
              <span className="material-symbols-outlined text-white hover:scale-110 transition-transform duration-300 text-base sm:text-lg md:text-xl">
                send
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex items-center h-screen">
      <LeftSidebar />
      <CentralContent />
    </div>
  );
};

export default App;