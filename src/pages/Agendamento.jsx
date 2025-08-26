import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import '../styles/Agendamento.css';

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Agendamento = () => {
  const navigate = useNavigate();

  const handleAgendarClick = () => {
    navigate('/agendar-servico');
  };

  return (
    <Container maxWidth="md" className="agendamento-container">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <StyledTitle variant="h2" component="h1">
          Ficamos felizes em poder ajudar!
        </StyledTitle>
        
        <StyledButton
          variant="contained"
          size="large"
          onClick={handleAgendarClick}
        >
          Agendar Serviço
        </StyledButton>
      </Box>
    </Container>
  );
};

export default Agendamento;
