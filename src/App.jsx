import './App.css';
import Header from './components/header';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  // Determina o basename baseado no ambiente
  // Em produção no GitHub Pages: /brab-site
  // Em desenvolvimento: /
  const basename = import.meta.env.PROD ? '/brab-site' : '/';

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
