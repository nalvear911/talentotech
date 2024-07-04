import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../../img/logo_talento.png';

export default function EditarNota() {
  const { usuario_id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [notas, setNotas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/notas/${usuario_id}`)
      .then(response => {
        setNotas(response.data);
        if (response.data.length > 0) {
          setUsuario(response.data[0].nombre_usuario);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [usuario_id]);

  const handleInputChange = (modulo, nota) => {
    setNotas(prevNotas => prevNotas.map(
      n => n.nombre_modulo === modulo ? { ...n, nota: parseFloat(nota) } : n
    ));
  };

  const handleSave = () => {
    const dataToSend = notas.map(nota => ({

      id_modulo: nota.id_modulo,  
      nota: parseFloat(nota.nota) 
    })
  
  );
  const notasInvalidas = dataToSend.filter(n => n.nota < 0 || n.nota > 100);
    if (notasInvalidas.length > 0) {
      alert("Todas las notas deben estar entre 0 y 100");
      return;
    }

    console.log('Datos a enviar:', dataToSend);

    axios.put(`http://localhost:3001/api/notas/${usuario_id}`, dataToSend, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log("put", response.data.message);
        navigate('/lista-notas');
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
        <div className="flex items-center pl-4">
          <img src={Logo} alt="Logo Talento" />
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Notas de {usuario}</h2>
      {notas.map((nota, index) => (
        <div key={index} className="flex flex-col mb-4">
          <label className="mb-2">{nota.nombre_modulo}</label>
          <input
            type="number"
            value={nota.nota}
            onChange={(e) => handleInputChange(nota.nombre_modulo, e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      ))}
      <button onClick={handleSave} className="bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
        Guardar
      </button>
    </div>
  );
}
