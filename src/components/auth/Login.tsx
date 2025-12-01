import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { authService } from '../../services/authService';

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
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="shadow-lg border-0" style={{ width: '100%', maxWidth: '450px', backgroundColor: 'rgba(255, 255, 255, 0.98)' }}>
                <Card.Body className="p-4">
                    <Card.Title as="h2" className="text-center mb-4 fw-bold" style={{ background: 'linear-gradient(135deg, #5A189A 0%, #7B2CBF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {isSigningUp ? 'Registro' : 'Iniciar Sesión'}
                    </Card.Title>
                    
                    {error && (
                        <Alert variant="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                        {isSigningUp && (
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold" style={{ color: '#240046' }}>Nombre completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={isSigningUp}
                                    size="lg"
                                    style={{ borderColor: '#9D4EDD' }}
                                />
                            </Form.Group>
                        )}
                        
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold" style={{ color: '#240046' }}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                size="lg"
                                autoComplete="email"
                                style={{ borderColor: '#9D4EDD' }}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold" style={{ color: '#240046' }}>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                size="lg"
                                autoComplete={isSigningUp ? "new-password" : "current-password"}
                                style={{ borderColor: '#9D4EDD' }}
                            />
                        </Form.Group>
                        
                        <div className="d-grid gap-2 mb-3">
                            <Button 
                                type="submit" 
                                variant="primary" 
                                size="lg"
                                className="fw-semibold"
                            >
                                {isSigningUp ? 'Registrarse' : 'Iniciar Sesión'}
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline-secondary"
                                size="lg"
                                onClick={() => setIsSigningUp(!isSigningUp)}
                                className="fw-semibold"
                            >
                                {isSigningUp ? 'Ya tengo cuenta' : 'Crear cuenta'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};