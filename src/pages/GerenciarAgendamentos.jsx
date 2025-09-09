import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import '../styles/GerenciarAgendamentos.css';
//TODO: Implementar rota para gerenciar agendamentos.
//TODO: Implementar integração com o supabase para exibir agendamentos.

const GerenciarAgendamentos = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    
    return (
        <title>Gerenciar Agendamentos</title>
    );
};

export default GerenciarAgendamentos;
