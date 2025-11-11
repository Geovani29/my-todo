import { useState } from 'react';
import { authService } from '../../services/authService';
import { Button, Input } from '../todo/styled';

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
                // Después de registrar, hacemos login automáticamente
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
        <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
            <h2>{isSigningUp ? 'Registro' : 'Iniciar Sesión'}</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                {isSigningUp && (
                    <div style={{ marginBottom: '10px' }}>
                        <Input
                            type="text"
                            placeholder="Nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={isSigningUp}
                        />
                    </div>
                )}
                <div style={{ marginBottom: '10px' }}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit">
                    {isSigningUp ? 'Registrarse' : 'Iniciar Sesión'}
                </Button>
                <Button 
                    type="button" 
                    onClick={() => setIsSigningUp(!isSigningUp)}
                    style={{ marginLeft: '10px' }}
                >
                    {isSigningUp ? 'Ya tengo cuenta' : 'Crear cuenta'}
                </Button>
            </form>
        </div>
    );
};