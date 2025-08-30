import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import '../styles/Cliente.css';

// Componente estilizado para o título
const TitleText = styled(Typography)(({ theme }) => ({
  color: '#1976d2',
  fontWeight: 700,
  fontSize: '2.5rem',
  lineHeight: 1.2,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1.75rem',
  },
}));

// Componente estilizado para os cards
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const Cliente = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigateToAgendamento = () => {
    navigate('/agendar-servico');
  };

  const handleNavigateToAgendamentos = () => {
    navigate('/agendamento');
  };

  const handleNavigateToProfile = () => {
    navigate('/perfil');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" className="cliente-container" sx={{ marginTop: 2 }}>
      <Box className="cliente-content">
        {/* Header com botão de voltar */}
        <Box className="cliente-header" sx={{ marginBottom: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToDashboard}
              sx={{ borderRadius: '8px' }}
            >
              Voltar ao Dashboard
            </Button>
          </Box>
          
          <TitleText variant="h1" component="h1">
            Área do Cliente
          </TitleText>
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              color: '#666666'
            }}
          >
            Gerencie seus agendamentos e informações
          </Typography>
        </Box>

        {/* Cards de funcionalidades */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', padding: 3 }}>
                <ScheduleIcon sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Agendar Serviço
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Solicite um novo serviço elétrico e escolha a data e horário preferidos.
                </Typography>
              </CardContent>
              <Box sx={{ padding: 3, paddingTop: 0 }}>
                <Button 
                  size="large" 
                  variant="contained" 
                  onClick={handleNavigateToAgendamento}
                  fullWidth
                  sx={{ borderRadius: '8px' }}
                >
                  Agendar
                </Button>
              </Box>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', padding: 3 }}>
                <HistoryIcon sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Meus Agendamentos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visualize e gerencie todos os seus agendamentos e histórico de serviços.
                </Typography>
              </CardContent>
              <Box sx={{ padding: 3, paddingTop: 0 }}>
                <Button 
                  size="large" 
                  variant="contained" 
                  onClick={handleNavigateToAgendamentos}
                  fullWidth
                  sx={{ borderRadius: '8px' }}
                >
                  Visualizar
                </Button>
              </Box>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', padding: 3 }}>
                <PersonIcon sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Meu Perfil
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Atualize suas informações pessoais e preferências de contato.
                </Typography>
              </CardContent>
              <Box sx={{ padding: 3, paddingTop: 0 }}>
                <Button 
                  size="large" 
                  variant="contained" 
                  onClick={handleNavigateToProfile}
                  fullWidth
                  sx={{ borderRadius: '8px' }}
                >
                  Editar
                </Button>
              </Box>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Cliente;
