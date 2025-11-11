// Variables de entorno - deben estar definidas en .env
const getEnvVar = (key: string, defaultValue?: string): string => {
    const value = import.meta.env[key];
    if (!value && !defaultValue) {
        console.warn(`⚠️ Variable de entorno ${key} no está definida`);
    }
    return value || defaultValue || '';
};

export const API_BASE_URL = getEnvVar('VITE_API_BASE_URL');
export const API_TOKEN = getEnvVar('VITE_API_TOKEN');

// Validación en desarrollo
if (import.meta.env.DEV) {
    if (!API_BASE_URL || !API_TOKEN) {
        console.error(' Error: Las variables VITE_API_BASE_URL y VITE_API_TOKEN deben estar definidas en .env');
    }
}