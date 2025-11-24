import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Enviar error a Sentry
        Sentry.captureException(error, {
            contexts: {
                react: {
                    componentStack: errorInfo.componentStack,
                },
            },
        });

        console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '500px',
                            backgroundColor: 'white',
                            padding: '40px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>
                            ⚠️ Algo salió mal
                        </h1>
                        <p style={{ color: '#666', marginBottom: '20px' }}>
                            Lo sentimos, ha ocurrido un error inesperado. El error ha sido
                            reportado automáticamente.
                        </p>
                        {import.meta.env.DEV && this.state.error && (
                            <details
                                style={{
                                    marginBottom: '20px',
                                    textAlign: 'left',
                                    backgroundColor: '#f8f9fa',
                                    padding: '10px',
                                    borderRadius: '4px',
                                }}
                            >
                                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                    Detalles del error (solo en desarrollo)
                                </summary>
                                <pre
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '12px',
                                        overflow: 'auto',
                                    }}
                                >
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                        <button
                            onClick={this.handleReset}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                marginRight: '10px',
                            }}
                        >
                            Intentar de nuevo
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#95a5a6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            Recargar página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
