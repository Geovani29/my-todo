import { useState } from 'react';
import { authService } from '../../services/authService';
import { Button, Input } from '../todo/styled';
import './Login.css';

interface LoginProps {
    onLoginSuccess: () => void;
}

export const Login = ({ onLoginSuccess }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            if (isSigningUp) {
                await authService.signUp(email, password, name);
                await authService.login(email, password);
            } else {
                await authService.login(email, password);
            }
            onLoginSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error en la autenticación');
        }
    };

    return (
        <div className="login-container">
            <h2>{isSigningUp ? 'Registro' : 'Iniciar Sesión'}</h2>
            {error && <div className="login-error">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                {isSigningUp && (
                    <div className="login-form-group">
                        <Input
                            type="text"
                            placeholder="Nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={isSigningUp}
                        />
                    </div>
                )}
                <div className="login-form-group">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login-form-group">
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="login-buttons">
                    <Button type="submit" style={{ flex: 1 }}>
                        {isSigningUp ? 'Registrarse' : 'Iniciar Sesión'}
                    </Button>
                    <Button 
                        type="button" 
                        onClick={() => setIsSigningUp(!isSigningUp)}
                        style={{ flex: 1 }}
                    >
                        {isSigningUp ? 'Ya tengo cuenta' : 'Crear cuenta'}
                    </Button>
                </div>
            </form>
        </div>
    );
};