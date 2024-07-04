import React from 'react';
import { useNavigate } from 'react-router-dom';

const BootcampCard = ({ id, nombre, nivel }) => {
    const navigate = useNavigate();

    const handleViewModulos = () => {
        navigate(`/bootcamps/modulos/${id}`);
    };

    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{nombre}</h2>
            <p className="text-gray-700">Nivel: {nivel}</p>
            
            <button onClick={handleViewModulos} className="mt-4 bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                Ver Módulos
            </button>
        </div>
    );
};


export default BootcampCard;
