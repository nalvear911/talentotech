import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../../img/logo_talento.png';
import axios from 'axios';

export default function ListaNotas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/modulos/nombres')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getModuleNames = () => {
    const moduleNames = new Set();
    data.forEach(entry => {
      moduleNames.add(entry.modulo);
    });
    console.log(data)
    return Array.from(moduleNames);
  };

  const moduleNames = getModuleNames();

  return (
    <div className="flex w-full flex-col">
      <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
        <div className="flex items-center pl-4">
          <img src={Logo} alt="Logo Talento" />
        </div>
      </div>
      <div className="flex flex-col p-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Lista de Notas</h2>
        <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Estudiante</th>
              {moduleNames.map((name, index) => (
                <th key={index} className="border border-gray-200 px-4 py-2">{name}</th>
              ))}
              <th className="border border-gray-200 px-4 py-2">Promedio</th>
              <th className="border border-gray-200 px-4 py-2">Editar</th> {}
            </tr>
          </thead>
          <tbody>
          {data.reduce((acc, entry) => {
              let student = acc.find(st => st.estudiante === entry.estudiante);
              if (!student) {
                student = { estudiante: entry.estudiante, modulos: {}, promedio: 0, count: 0, idUsuario: entry.id_estudiante }; 
                acc.push(student);
              }
              student.modulos[entry.modulo] = entry.nota;
              student.promedio += entry.nota;
              student.count += 1;
              return acc;
            }, []).map((student, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="border border-gray-200 px-4 py-2">{student.estudiante}</td>
                {moduleNames.map((name, i) => (
                  <td key={i} className="border border-gray-200 px-4 py-2">
                    {student.modulos[name] !== undefined ? student.modulos[name] : 'N/A'}
                  </td>
                ))}
                <td className="border border-gray-200 px-4 py-2">
                  {student.count > 0 ? (student.promedio / student.count).toFixed(2) : 'N/A'}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <Link to={`/editar-nota/${student.idUsuario}`} className="mt-4 bg-[#072563] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
