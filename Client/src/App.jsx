import React from 'react';
import ResponsiveAppBar from './components/templates/Navbar/index.jsx';
import { Routes, Route } from 'react-router-dom';
import Productos from './components/pages/Productos/index.jsx';
import Contacto from './components/pages/Contacto/index.jsx';
import SobreNosotros from './components/pages/Sobre Nosotros/index.jsx';
import Login from './usuarios/Login/index.jsx';
import Register from './usuarios/Register/index.jsx';
import AdminDashboard from './usuarios/AdminDashboard/index.jsx'; // Ruta correcta del admin

const App = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Ruta para Admin */}
      </Routes>
    </>
  );
};

export default App;
