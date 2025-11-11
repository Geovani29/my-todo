import axios from 'axios';
import { API_TOKEN } from '../config/api';

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
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    }
};