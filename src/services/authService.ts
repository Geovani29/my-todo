import axios from 'axios';
import { API_TOKEN } from '../config/api';
import { captureError, addBreadcrumb } from '../config/sentry';

const AUTH_BASE_URL = `https://roble-api.openlab.uninorte.edu.co/auth/${API_TOKEN}`;

export const authService = {
    async signUp(email: string, password: string, name: string) {
        try {
            const response = await axios.post(`${AUTH_BASE_URL}/signup-direct`, {
                email,
                password,
                name
            });
            return response.data;
        } catch (error) {
            console.error('Error in signup:', error);
            captureError(error as Error, { context: 'signup', email });
            throw error;
        }
    },

    async login(email: string, password: string) {
        try {
            const response = await axios.post(`${AUTH_BASE_URL}/login`, {
                email,
                password
            });
            // Guardar el token en localStorage
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            return response.data;
        } catch (error) {
            console.error('Error in login:', error);
            captureError(error as Error, { context: 'login', email });
            throw error;
        }
    },

    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axios.post(`${AUTH_BASE_URL}/refresh-token`, {
                refreshToken
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            captureError(error as Error, { context: 'refreshToken' });
            throw error;
        }
    },

    getAccessToken() {
        const token = localStorage.getItem('accessToken');
        return token;
    },

    isAuthenticated() {
        return !!this.getAccessToken();
    },

    async logout() {
        try {
            const accessToken = this.getAccessToken();
            if (accessToken) {
                await axios.post(`${AUTH_BASE_URL}/logout`, null, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
            }
        } catch (error) {
            console.error('Error in logout:', error);
            captureError(error as Error, { context: 'logout' });
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    }
};