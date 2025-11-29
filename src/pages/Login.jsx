import React, { useEffect } from 'react';
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
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import '../styles/Login.css';

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

// Componente estilizado para o botão do Google
const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#757575',
  border: '2px solid #e0e0e0',
  borderRadius: '8px',
  padding: theme.spacing(2, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#1976d2',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
}));

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirecionar se já estiver logado
 /* useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);*/

  const handleGoogleLogin = async () => {
    try {
      // Obter a URL base correta (funciona tanto em localhost quanto em GitHub Pages)
      const redirectUrl = window.location.origin + window.location.pathname.replace(/\/$/, '') + '/';
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error('Erro ao fazer login:', error.message);
        alert(`Erro ao fazer login: ${error.message}`);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      alert(`Erro inesperado ao fazer login: ${error.message || error}`);
    }
  };

  // Se já estiver logado, não mostrar nada (será redirecionado)
  if (isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="sm" className="login-container" sx={{ marginTop: 4 }}>
      <Box className="login-content">
        <Paper elevation={3} className="login-paper" sx={{ padding: 4 }}>
          <TitleText variant="h1" component="h1">
            BRAB
          </TitleText>
          

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleButton
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              fullWidth={isMobile}
              sx={{ 
                minWidth: isMobile ? '100%' : '300px',
                height: '56px'
              }}
            >
              Entrar com Google
            </GoogleButton>
          </Box>

          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              marginTop: 3, 
              color: '#999999',
              fontSize: '0.9rem'
            }}
          >
            Ao fazer login, você concorda com nossos termos de uso e política de privacidade
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
