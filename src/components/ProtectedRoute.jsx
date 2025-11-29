import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, profile, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Log para debug
    console.log('ProtectedRoute - Estado:', { loading, isAuthenticated, profile: profile?.role });
    
    if (!loading) {
      if (!isAuthenticated) {
        console.log('ProtectedRoute - Usuário não autenticado, redirecionando para login');
        navigate('/login', { replace: true });
        return;
      }

      // Se o perfil ainda não foi carregado mas o usuário está autenticado,
      // aguardar um pouco mais (pode estar sendo criado)
      if (profile === undefined || profile === null) {
        console.log('ProtectedRoute - Perfil ainda não carregado, aguardando...');
        return;
      }

      if (!allowedRoles.includes(profile.role)) {
        console.log('ProtectedRoute - Acesso negado, role:', profile.role);
        navigate('/acesso-negado', { replace: true });
        return;
      }
    }
  }, [loading, isAuthenticated, profile, allowedRoles, navigate]);

  // Mostrar loading enquanto verifica autenticação ou carrega perfil
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Verificando permissões...
        </Typography>
      </Box>
    );
  }

  // Se não estiver autenticado, mostrar loading (será redirecionado)
  if (!isAuthenticated) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Redirecionando para login...
        </Typography>
      </Box>
    );
  }

  // Se o perfil ainda não foi carregado mas está autenticado, aguardar
  if (profile === undefined || profile === null) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Carregando perfil...
        </Typography>
      </Box>
    );
  }

  // Verificar permissões
  if (!allowedRoles.includes(profile.role)) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Verificando acesso...
        </Typography>
      </Box>
    );
  }

  // Tudo OK, renderizar conteúdo
  return children;
};

export default ProtectedRoute;
