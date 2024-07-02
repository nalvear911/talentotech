import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function LeftSideBar() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/home');
  };



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
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80"
            onClick={returnHome}>
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">home</span>
            <span>Inicio</span>
          </button>
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">bookmark</span>
            <span>Bootcamp</span>
          </button>
          <hr className="w-full mb-4 border-gray-300" />
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800">People</span>
            <span>Usuarios</span>
          </button>
          <button className="bg-white text-gray-600 hover:bg-gray-200 hover:border-gray-300 px-6 py-2 rounded-md flex items-center border border-transparent w-80">
            <span className="material-symbols-outlined mr-2 hover:text-gray-800"> circle</span>
            <span>Mi perfil</span>
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
}
