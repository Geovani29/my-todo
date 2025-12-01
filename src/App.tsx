import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Todo from './components/todo';
import { Login } from './components/auth/Login';
import { authService } from './services/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative" style={{ background: 'linear-gradient(135deg, #10002B 0%, #240046 25%, #3C096C 50%, #5A189A 75%, #7B2CBF 100%)', backgroundAttachment: 'fixed' }}>
      {isAuthenticated ? (
        <>
          <Button 
            onClick={handleLogout}
            variant="light"
            className="position-fixed top-0 end-0 m-3"
            style={{ zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '2px solid #9D4EDD' }}
          >
            Cerrar sesión
          </Button>
          <Container className="py-5">
            <Todo />
          </Container>
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
