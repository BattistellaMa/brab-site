import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Outras rotas podem ser adicionadas aqui no futuro */}
    </Routes>
  );
};

export default AppRoutes;
