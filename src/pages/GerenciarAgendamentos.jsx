import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import '../styles/GerenciarAgendamentos.css';
import { Title } from '@mui/icons-material';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
//TODO: Implementar rota para gerenciar agendamentos.
//TODO: Implementar integração com o supabase para exibir agendamentos.

const GerenciarAgendamentos = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    
    return (
        <Container sx={{mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4,}}>
            <Box sx={{p:5,}}>
                <Typography variant="h4" >
                    Gerenciar Agendamentos
                </Typography>
            </Box>
            <main class="main-agendamentos">
                <div  class="paper-agendamentos">
                    
                </div>
            </main>





        </Container>
    );
};

export default GerenciarAgendamentos;
