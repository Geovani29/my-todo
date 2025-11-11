import { useState, useEffect } from 'react';
import Todo from './components/todo';
import { Login } from './components/auth/Login';
import { authService } from './services/authService';
import './App.css';

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
    <div>
      {isAuthenticated ? (
        <div>
          <button 
            onClick={handleLogout}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            Cerrar sesión
          </button>
          <Todo />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
