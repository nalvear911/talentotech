
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootcampCard from './BootcampCard';
import Logo from '../../img/logo_talento.png';


const Bootcamps = () => {

    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchBootcamps = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/bootcamps');
                const bootcamps = response.data.map(bootcamp => ({
                    id_bootcamp: bootcamp.id,
                    nombre: bootcamp.nombre,
                    nivel: bootcamp.nivel

                }));
                setCardData(bootcamps);
            } catch (error) {
                console.error('Error fetching bootcamps:', error);
            }
        };

        fetchBootcamps();
    }, []);

    return (
        <div className="flex w-full flex-col">
        <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
            <div className="flex items-center pl-4">
                <img src={Logo} alt="Logo Talento" />
            </div>
        </div>
        {cardData.map((item, index) => (
        <BootcampCard
            key={index}
            id={item.id_bootcamp}
            nombre={item.nombre}
            nivel={item.nivel}
        />
        ))}

    
        </div>
    );
};

export default Bootcamps;
