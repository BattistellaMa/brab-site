import './App.css';
import Header from './components/header';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
