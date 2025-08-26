import React, { useState, useEffect } from 'react';
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
import { styled } from '@mui/material/styles';
import { supabase } from '../config/supabase';
import '../styles/AgendarServico.css';

// Componente estilizado para o título
const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 700,
  fontSize: '2.5rem',
  color: '#1976d2',
  marginBottom: '2rem',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
  },
}));

// Componente estilizado para o botão de agendamento
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#ffffff',
  fontSize: '1.25rem',
  fontWeight: 600,
  padding: '16px 32px',
  borderRadius: '12px',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
  '&:hover': {
    backgroundColor: '#1565c0',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
  },
  '&:disabled': {
    backgroundColor: '#bdbdbd',
    color: '#757575',
    transform: 'none',
    boxShadow: 'none',
  },
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
    padding: '14px 28px',
  },
}));

const AgendarServico = () => {
  const [formData, setFormData] = useState({
    cliente_nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    tipo_servico: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Valida se todos os campos estão preenchidos
  useEffect(() => {
    const isValid = Object.values(formData).every(value => value.trim() !== '');
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert([formData])
        .select();

      if (error) {
        // Verificar se é erro de configuração do Supabase
        if (error.message === 'Supabase não configurado') {
          setSubmitStatus({
            type: 'warning',
            message: 'Sistema em manutenção. Entre em contato diretamente pelo WhatsApp ou email.'
          });
          return;
        }
        throw error;
      }

      setSubmitStatus({
        type: 'success',
        message: 'Agendamento realizado com sucesso! Entraremos em contato em breve.'
      });

      // Limpa o formulário após sucesso
      setFormData({
        cliente_nome: '',
        telefone: '',
        email: '',
        endereco: '',
        cidade: '',
        tipo_servico: ''
      });

    } catch (error) {
      console.error('Erro ao agendar:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Erro ao realizar agendamento. Tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" className="agendar-servico-container">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '2rem 0',
        }}
      >
        <StyledTitle variant="h2" component="h1">
          Agendar Serviço
        </StyledTitle>

        <Paper 
          elevation={3} 
          sx={{ 
            padding: '2rem', 
            width: '100%', 
            maxWidth: '600px',
            borderRadius: '12px'
          }}
        >
          {submitStatus && (
            <Alert 
              severity={submitStatus.type} 
              sx={{ marginBottom: '1rem' }}
              onClose={() => setSubmitStatus(null)}
            >
              {submitStatus.message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nome Completo"
              value={formData.cliente_nome}
              onChange={(e) => handleInputChange('cliente_nome', e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="WhatsApp"
              value={formData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              margin="normal"
              required
              variant="outlined"
              placeholder="(11) 99999-9999"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Endereço"
              value={formData.endereco}
              onChange={(e) => handleInputChange('endereco', e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Cidade"
              value={formData.cidade}
              onChange={(e) => handleInputChange('cidade', e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Tipo de Serviço</InputLabel>
              <Select
                value={formData.tipo_servico}
                label="Tipo de Serviço"
                onChange={(e) => handleInputChange('tipo_servico', e.target.value)}
              >
                <MenuItem value="INSTALAÇÃO">INSTALAÇÃO</MenuItem>
                <MenuItem value="MANUTENÇÃO">MANUTENÇÃO</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <StyledButton
                type="submit"
                variant="contained"
                size="large"
                disabled={!isFormValid || isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isSubmitting ? 'Agendando...' : 'Agendar'}
              </StyledButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AgendarServico;
