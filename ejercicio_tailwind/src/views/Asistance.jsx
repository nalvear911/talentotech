import React from 'react';
import Logo from '../img/logo_talento.png';

const Asistance = () => {
 
  const attendees = [
    { id: 1, name: 'Juan Pérez', time: '10:00 AM' },
    { id: 2, name: 'María García', time: '10:05 AM' },
    { id: 3, name: 'Carlos López', time: '10:10 AM' }
  ];

  const absentees = [
    { id: 1, name: 'Ana Sánchez', time: 'N/A' },
    { id: 2, name: 'Luis Gómez', time: 'N/A' },
    { id: 3, name: 'Sofía Martínez', time: 'N/A' }
  ];

  return ( 
    
    <div className="flex flex-col items-center w-full p-4">
      <div className="bg-[#082563] rounded-lg shadow-lg p-2 mb-2 w-[calc(100%)]">
        <div className="flex items-center pl-4">
          <img src={Logo} alt="Logo Talento" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Detalle de Asistencia</h1>
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h2 className="text-2xl font-semibold mb-2">Lista de Asistentes</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Nombre</th>
                <th className="py-2 px-4 border">Hora de Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee.id}>
                  <td className="py-2 px-4 border">{attendee.id}</td>
                  <td className="py-2 px-4 border">{attendee.name}</td>
                  <td className="py-2 px-4 border">{attendee.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold mb-2">Personas que No Han Asistido</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {absentees.map((absentee) => (
                <tr key={absentee.id}>
                  <td className="py-2 px-4 border">{absentee.id}</td>
                  <td className="py-2 px-4 border">{absentee.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Asistance;
