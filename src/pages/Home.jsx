import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles/Home.css';

// Componente estilizado para a barra vertical
const VerticalBar = styled(Box)(({ theme }) => ({
  width: '6px',
  height: '60px',
  backgroundColor: '#1976d2',
  borderRadius: '3px',
  marginRight: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    width: '4px',
    height: '50px',
    marginRight: theme.spacing(2),
  },
}));

// Componente estilizado para o título
const TitleText = styled(Typography)(({ theme }) => ({
  color: '#1976d2',
  fontWeight: 700,
  fontSize: '2.5rem',
  lineHeight: 1.2,
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1.75rem',
  },
}));

// Componente estilizado para o campo de texto
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976d2',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666666',
    '&.Mui-focused': {
      color: '#1976d2',
    },
  },
}));

const Home = () => {
  const [content, setContent] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" className="home-container">
      <Box className="home-content">
        {/* Seção do título */}
        <Box className="title-section">
          <VerticalBar />
          <TitleText variant="h1" component="h1">
            QUEM SOMOS NÓS?
          </TitleText>
        </Box>

        {/* Seção do conteúdo */}
        <Paper elevation={2} className="content-section">
          <StyledTextField
            fullWidth
            multiline
            rows={isMobile ? 8 : 12}
            variant="outlined"
            label="Descreva aqui as informações sobre sua empresa..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite aqui as informações sobre sua empresa, missão, valores, história, equipe ou qualquer outro conteúdo relevante..."
            className="content-textarea"
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
