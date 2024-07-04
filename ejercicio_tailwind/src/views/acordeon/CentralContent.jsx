import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../../img/logo_talento.png';
import Accordion from './Accordion';
import { useNavigate, useParams } from 'react-router-dom';


export default function CentralContent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [accordionData, setAccordionData] = useState([]);

    useEffect(() => {
        const fetchModulos = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/bootcamps/modulos/${id}`);
                console.log(response)
                const modulos = response.data.map(modulo => ({
                    id_modulo: modulo.id_modulo,
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
    }, [id]);
    console.log(id);
    const totalProgress = accordionData.reduce((acc, curr) => acc + (curr.progress || 0), 0) / accordionData.length;

    const addNewModule = () => {
        navigate('/'+id+'/nuevo-modulo');
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
                            id_bootcamp={id}
                            id={item.id_modulo}
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
                
            </div>
        </div>
    );
}
