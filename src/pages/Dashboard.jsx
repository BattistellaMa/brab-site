import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

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

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleNavigateToClient = () => {
    navigate('/cliente');
  };

  const handleNavigateToAdmin = () => {
    navigate('/admin');
  };

  return (
    <Container maxWidth="lg" className="dashboard-container" sx={{ marginTop: 2 }}>
      <Box className="dashboard-content">
        {/* Header com informações do usuário */}
        <Box className="dashboard-header" sx={{ marginBottom: 4 }}>
          <TitleText variant="h1" component="h1">
            ABRAB
          </TitleText>
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              marginBottom: 2, 
              color: '#666666'
            }}
          >
            Você está logado como: {user?.email}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ borderRadius: '8px' }}
            >
              Sair
            </Button>
          </Box>
        </Box>

        {/* Cards de navegação */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', padding: 3 }}>
                <PersonIcon sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Área do Cliente
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Acesse seus agendamentos, histórico de serviços e informações da sua conta.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
                <Button 
                  size="large" 
                  variant="contained" 
                  onClick={handleNavigateToClient}
                  sx={{ borderRadius: '8px' }}
                >
                  Acessar
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>

          {profile?.role === 'admin' && (
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', padding: 3 }}>
                  <AdminPanelSettingsIcon sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
                  <Typography variant="h5" component="h2" gutterBottom>
                    Painel Administrativo
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gerencie clientes, agendamentos e configurações do sistema.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
                  <Button 
                    size="large" 
                    variant="contained" 
                    onClick={handleNavigateToAdmin}
                    sx={{ borderRadius: '8px' }}
                  >
                    Acessar
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
