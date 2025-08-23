import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Outras rotas podem ser adicionadas aqui no futuro */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
