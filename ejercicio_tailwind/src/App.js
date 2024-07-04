import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Asistance from './views/Asistance';
import EditModule from './views/modulos/EditModule';
import LeftSidebar from './views/LeftSideBar';
import NewModule from './views/modulos/NewModule';
import Login from './views/Login';
import CentralContent from './views/acordeon/CentralContent';
import ProtectedRoute from './components/ProtectedRoute';
import Bootcamp from './views/bootcamp/Bootcamp';
import ListaNotas from './views/notas/ListaNotas';
import EditarNotas from './views/notas/EditarNotas';
import Sesiones from './views/sesiones/Sesion';
import NuevaSesion from './views/sesiones/NuevaSesion';
import EditarSesion from './views/sesiones/EditarSesion';
import Actividades from './views/actividades/Actividades';
import usuarios from './views/usuarios/Usuarios';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={
          <div className="flex items-center h-screen">
            <LeftSidebar />
            <Routes>
            <Route path="/bootcamps/modulos/:id" element={<ProtectedRoute element={CentralContent} />} />
              <Route path="/asistencia" element={<ProtectedRoute element={Asistance} />} />
              <Route path="/editar-modulo" element={<ProtectedRoute element={EditModule} />} />
              <Route path="/:id/nuevo-modulo" element={<ProtectedRoute element={NewModule} />} />
              <Route path="/bootcamp" element={<ProtectedRoute element={Bootcamp} />} />
              <Route path="/lista-notas" element={<ProtectedRoute element={ListaNotas} />} />
              <Route path="/editar-nota/:usuario_id" element={<ProtectedRoute element={EditarNotas} />} />
              <Route path="/modulos/:id_modulo/sesiones" element={<ProtectedRoute element={Sesiones} />} />
              <Route path="/:id_modulo/nueva-sesion" element={<ProtectedRoute element={NuevaSesion} />} />
              <Route path="/editar-sesion/:id_sesion" element={<ProtectedRoute element={EditarSesion} />} />
              <Route path='/actividades' element={<ProtectedRoute element={Actividades} />} />
              <Route path='/usuarios' element={<ProtectedRoute element={usuarios} />} />
            </Routes>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
