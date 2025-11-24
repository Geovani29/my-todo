# My Todo App 📝

Una aplicación moderna de gestión de tareas construida con React, TypeScript y Vite, con autenticación de usuarios y monitoreo en tiempo real.

## 🚀 Features

- ✅ Autenticación de usuarios (Login/Signup)
- ✅ CRUD completo de tareas
- ✅ Persistencia en base de datos
- ✅ Monitoreo de errores con Sentry
- ✅ Analíticas con Google Analytics
- ✅ Deploy automático con GitHub Actions
- ✅ Hosting en Firebase

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components
- **HTTP Client**: Axios
- **Testing**: Jest + Testing Library
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions

## 📦 Installation

```bash
# Clonar el repositorio
git clone https://github.com/YOUR_USERNAME/my-todo.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuration

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# API Configuration
VITE_API_BASE_URL=your_api_url
VITE_API_TOKEN=your_api_token

# Sentry
VITE_SENTRY_DSN=your_sentry_dsn
VITE_SENTRY_ENVIRONMENT=development

# Google Analytics
VITE_GA_MEASUREMENT_ID=your_ga_id
```

Para obtener todas las credenciales, consulta la [Guía de Configuración](./docs/SETUP_GUIDE.md).

## 📜 Scripts

```bash
npm run dev          # Ejecutar en desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Ejecutar linter
npm run test         # Ejecutar tests
npm run deploy       # Build y deploy a Firebase
```

## 🚀 Deployment

El proyecto está configurado para deploy automático en Firebase Hosting mediante GitHub Actions.

Cada push a `main` ejecuta:
1. ✅ Linting
2. ✅ Tests
3. ✅ Build
4. ✅ Deploy a Firebase
5. ✅ Creación de release en Sentry

Ver [Guía de Configuración](./docs/SETUP_GUIDE.md) para más detalles.

## 📊 Monitoring & Analytics

- **Sentry**: Monitoreo de errores en tiempo real
- **Google Analytics**: Análisis de comportamiento de usuarios
- **Source Maps**: Integrados para debugging en producción

## 🧪 Testing

```bash
npm run test        # Ejecutar todos los tests
npm run test:watch  # Ejecutar tests en modo watch
```

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
