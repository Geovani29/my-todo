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
    <div className="app-container">
      {isAuthenticated ? (
        <>
          <button 
            onClick={handleLogout}
            className="logout-button"
          >
            Cerrar sesión
          </button>
          <div className="todo-container">
            <Todo />
          </div>
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
