import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import type { TodoType } from '../components/todo/types';

import { authService } from './authService';

const getHeaders = () => {
    const accessToken = authService.getAccessToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };
};

export const todoService = {

    async getAllTodos(): Promise<TodoType[]> {
        try {
            const headers = getHeaders();
            const response = await axios.get(`${API_BASE_URL}/read`, {
                headers,
                params: {
                    tableName: 'todos'
                }
            });
            return response.data.map((todo: any) => ({
                ...todo,
                id: todo._id
            }));
        } catch (error: any) {
            console.log('Full error:', error);
            console.log('Request config:', error.config);
            
            // Si es error 401, intentar refresh del token
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                try {
                    await authService.refreshToken();
                    const headers = getHeaders();
                    const response = await axios.get(`${API_BASE_URL}/read`, {
                        headers,
                        params: {
                            tableName: 'todos'
                        }
                    });
                    return response.data.map((todo: any) => ({
                        ...todo,
                        id: todo._id
                    }));
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    throw refreshError;
                }
            }
            
            throw error;
        }
    },

    async addTodo(content: string): Promise<TodoType | null> {
        try {
            const response = await axios.post(`${API_BASE_URL}/insert`, {
                tableName: 'todos',
                records: [{
                    content,
                    done: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }]
            }, { headers: getHeaders() });

            if (response.data.inserted?.length > 0) {
                return {
                    ...response.data.inserted[0],
                    id: response.data.inserted[0]._id
                };
            }
            return null;
        } catch (error) {
            console.error('Error adding todo:', error);
            return null;
        }
    },

    async removeTodo(id: string): Promise<boolean> {
        try {
            const token = authService.getAccessToken();
            
            const response = await axios.delete(`${API_BASE_URL}/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    tableName: 'todos',
                    idColumn: '_id',
                    idValue: id
                }
            });
            console.log('Delete response:', response); // Para debug
            return true;
        } catch (error) {
            console.error('Error removing todo:', error);
            console.log('Headers sent:', getHeaders()); // Para debug
            if (axios.isAxiosError(error)) {
                console.log('Response data:', error.response?.data);
            }
            return false;
        }
    },

    async updateTodo(id: string, updates: Partial<TodoType>): Promise<boolean> {
        try {
            await axios.put(`${API_BASE_URL}/update`, {
                tableName: 'todos',
                idColumn: '_id',
                idValue: id,
                updates: {
                    ...updates,
                    updatedAt: new Date().toISOString()
                }
            }, { headers: getHeaders() });
            return true;
        } catch (error) {
            console.error('Error updating todo:', error);
            return false;
        }
    }
};