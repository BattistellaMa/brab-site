import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Agendamento from '../pages/Agendamento';
import AgendarServico from '../pages/AgendarServico';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Cliente from '../pages/Cliente';
import Admin from '../pages/Admin';
import AcessoNegado from '../pages/AcessoNegado';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/acesso-negado" element={<AcessoNegado />} />
      
      {/* Rotas protegidas */}
      <Route path="/" element={
        
          <Home />
        
      } />
      
      <Route path="/cliente" element={
        <ProtectedRoute allowedRoles={['client', 'admin']}>
          <Cliente />
        </ProtectedRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Admin />
        </ProtectedRoute>
      } />
      
      {/* Rotas existentes - agora protegidas */}
      <Route path="/agendamento" element={
        <ProtectedRoute allowedRoles={['client', 'admin']}>
          <Agendamento />
        </ProtectedRoute>
      } />
      
      <Route path="/agendar-servico" element={
        <ProtectedRoute allowedRoles={['client', 'admin']}>
          <AgendarServico />
        </ProtectedRoute>
      } />
      
      {/* Redirecionamento para login se rota não encontrada */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
