import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../img/logo_talento.png';
import Accordion from './Accordion';
import { useNavigate } from 'react-router-dom';

export default function CentralContent() {
    const navigate = useNavigate();
    const [accordionData, setAccordionData] = useState([]);

    useEffect(() => {
        const fetchModulos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/modulos');
                const modulos = response.data.map(modulo => ({
                    id: modulo.id_modulo,
                    title: modulo.nombre_modulo,
                    status: modulo.estado,
                    fecha_inicio: modulo.fecha_inicio,
                    fecha_fin: modulo.fecha_fin
                }));

                setAccordionData(modulos);
            } catch (error) {
                console.error('Error fetching modulos:', error);
            }
        };

        fetchModulos();
    }, []);

    const totalProgress = accordionData.reduce((acc, curr) => acc + (curr.progress || 0), 0) / accordionData.length;

    const addNewModule = () => {
        navigate('/nuevo-modulo');
    };

    return (
        <div className="flex w-full flex-col">
            <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
                <div className="flex items-center pl-4">
                    <img src={Logo} alt="Logo Talento" />
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
                            id={item.id}
                            title={item.title}
                            status={item.status}
                            fecha_inicio={item.fecha_inicio}
                            fecha_fin={item.fecha_fin}
                        />
                    ))}
                    <button onClick={addNewModule} className="mt-4 bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                        Agregar Nuevo Módulo
                    </button>
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
}
