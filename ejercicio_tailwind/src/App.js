import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Asistance from './views/Asistance';
import EditModule from './views/EditModule';
import LeftSidebar from './views/LeftSideBar';
import NewModule from './views/NewModule';
import Login from './views/Login';
import CentralContent from './views/CentralContent';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={
          <div className="flex items-center h-screen">
            <LeftSidebar />
            <Routes>
            <Route path="/home" element={<ProtectedRoute element={CentralContent} />} />
              <Route path="/asistencia" element={<ProtectedRoute element={Asistance} />} />
              <Route path="/editar-modulo" element={<ProtectedRoute element={EditModule} />} />
              <Route path="/nuevo-modulo" element={<ProtectedRoute element={NewModule} />} />

            </Routes>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
