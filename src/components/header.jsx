import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
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
              Gestão BRAB
            </LogoText>
          </Box>
          
          {/* Navegação */}
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
            >
              Home
            </NavButton>
            {/* Outros botões de navegação podem ser adicionados aqui */}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
