import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container,
  useTheme,
  useMediaQuery,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

// Componente estilizado para o AppBar com borda azul
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#424242', // Cinza escuro
  borderBottom: `3px solid #1976d2`, // Borda azul
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  '& .MuiToolbar-root': {
    minHeight: '64px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '56px',
    },
  },
}));

// Componente estilizado para o logo/título
const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#ffffff',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

// Componente estilizado para os botões de navegação
const NavButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  padding: '8px 16px',
  borderRadius: '6px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-1px)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '6px 12px',
  },
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
      handleMenuClose();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleNavigateToProfile = () => {
    navigate('/cliente');
    handleMenuClose();
  };

  const handleNavigateToAdmin = () => {
    navigate('/admin');
    handleMenuClose();
  };

  return (
    <StyledAppBar position="static" className="header-container">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <LogoText variant="h6" component="div">
              BRAB
            </LogoText>
          </Box>
          
          {/* Navegação - apenas se estiver logado */}
          {isAuthenticated && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <NavButton
                component={RouterLink}
                to="/"
                className="nav-link"
                startIcon={<HomeIcon />}
              >
                Dashboard
              </NavButton>
              
              <NavButton
                component={RouterLink}
                to="/agendamento"
                className="nav-link"
                startIcon={<ScheduleIcon />}
              >
                Agendamento
              </NavButton>
            </Box>
          )}

          {/* Área do usuário */}
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ 
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: '#1976d2',
                    fontSize: '0.875rem'
                  }}
                >
                  {user?.email?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleNavigateToProfile}>
                  <PersonIcon sx={{ mr: 1 }} />
                  Área do Cliente
                </MenuItem>
                {profile?.role === 'admin' && (
                  <MenuItem onClick={handleNavigateToAdmin}>
                    <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                    Painel Admin
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Sair
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              sx={{
                color: '#ffffff',
                borderColor: '#ffffff',
                '&:hover': {
                  borderColor: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Entrar
            </Button>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
