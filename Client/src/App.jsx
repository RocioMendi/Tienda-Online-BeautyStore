import React from 'react';
import ResponsiveAppBar from './components/templates/Navbar/index.jsx';
import { Routes, Route } from 'react-router-dom';
import Productos from './components/pages/Productos/index.jsx';
import Contacto from './components/pages/Contacto/index.jsx';
import SobreNosotros from './components/pages/Sobre Nosotros/index.jsx';

const App = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      </Routes>
    </>
  );
};

export default App;


