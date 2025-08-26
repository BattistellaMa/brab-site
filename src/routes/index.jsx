import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Agendamento from '../pages/Agendamento';
import AgendarServico from '../pages/AgendarServico';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agendamento" element={<Agendamento />} />
      <Route path="/agendar-servico" element={<AgendarServico />} />
      {/* Outras rotas podem ser adicionadas aqui no futuro */}
    </Routes>
  );
};

export default AppRoutes;
