import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/AcessoNegado.css';

// Componente estilizado para o título
const TitleText = styled(Typography)(({ theme }) => ({
  color: '#d32f2f',
  fontWeight: 700,
  fontSize: '2.5rem',
  lineHeight: 1.2,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1.75rem',
  },
}));

const AcessoNegado = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" className="acesso-negado-container" sx={{ marginTop: 4 }}>
      <Box className="acesso-negado-content">
        <Paper elevation={3} className="acesso-negado-paper" sx={{ padding: 4 }}>
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <BlockIcon sx={{ fontSize: 80, color: '#d32f2f', marginBottom: 2 }} />
            <TitleText variant="h1" component="h1">
              Acesso Negado
            </TitleText>
          </Box>
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              marginBottom: 3, 
              color: '#666666',
              lineHeight: 1.6
            }}
          >
            Você não tem permissão para acessar esta área. 
            Entre em contato com o administrador do sistema para solicitar acesso.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToDashboard}
              sx={{ 
                borderRadius: '8px',
                padding: '12px 24px'
              }}
            >
              Voltar ao Dashboard
            </Button>
          </Box>

          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              marginTop: 4, 
              color: '#999999',
              fontSize: '0.9rem'
            }}
          >
            Se você acredita que isso é um erro, verifique suas permissões ou entre em contato com o suporte.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AcessoNegado;
