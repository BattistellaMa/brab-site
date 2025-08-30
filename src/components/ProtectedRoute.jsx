import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, profile, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      if (profile && !allowedRoles.includes(profile.role)) {
        navigate('/acesso-negado');
        return;
      }
    }
  }, [loading, isAuthenticated, profile, allowedRoles, navigate]);

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

  if (!isAuthenticated) {
    return null; // Será redirecionado pelo useEffect
  }

  if (profile && !allowedRoles.includes(profile.role)) {
    return null; // Será redirecionado pelo useEffect
  }

  return children;
};

export default ProtectedRoute;
