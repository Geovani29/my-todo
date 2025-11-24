# 🚀 Guía de Configuración: Observabilidad y Deploy

Esta guía te ayudará a obtener todas las credenciales necesarias y configurar el proyecto para producción.

---

## 📋 Tabla de Contenidos

1. [Sentry - Error Tracking](#1-sentry---error-tracking)
2. [Google Analytics - Analíticas](#2-google-analytics---analíticas)
3. [Firebase - Hosting](#3-firebase---hosting)
4. [GitHub Actions - CI/CD](#4-github-actions---cicd)
5. [Variables de Entorno](#5-variables-de-entorno)

---

## 1. Sentry - Error Tracking

### Paso 1: Crear cuenta en Sentry

1. Ve a [https://sentry.io/signup/](https://sentry.io/signup/)
2. Regístrate con tu email o GitHub
3. Selecciona el plan **Free** (gratuito)

### Paso 2: Crear proyecto

1. Una vez dentro, haz clic en **"Create Project"**
2. Selecciona la plataforma: **React**
3. Dale un nombre al proyecto: `my-todo` (o el que prefieras)
4. Haz clic en **"Create Project"**

### Paso 3: Obtener el DSN

1. Después de crear el proyecto, verás una pantalla de configuración
2. Busca el **DSN (Data Source Name)**
   - Se ve así: `https://xxxxxxxxxxxxx@xxxxx.ingest.sentry.io/xxxxxxx`
3. **Cópialo** - lo necesitarás para el `.env`

### Paso 4: Obtener Auth Token (para CI/CD)

1. Ve a **Settings** → **Account** → **API** → **Auth Tokens**
2. Haz clic en **"Create New Token"**
3. Dale un nombre: `GitHub Actions`
4. Selecciona los scopes:
   - ✅ `project:read`
   - ✅ `project:releases`
   - ✅ `org:read`
4. Haz clic en **"Create Token"**
5. **Copia el token** - solo se muestra una vez

### Paso 5: Obtener Organization y Project names

1. En la URL de Sentry, verás algo como: `https://sentry.io/organizations/TU-ORG/projects/TU-PROJECT/`
2. Anota:
   - **Organization**: `TU-ORG`
   - **Project**: `TU-PROJECT`

---

## 2. Google Analytics - Analíticas

### Paso 1: Crear cuenta de Google Analytics

1. Ve a [https://analytics.google.com/](https://analytics.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Empezar a medir"**

### Paso 2: Configurar cuenta

1. **Nombre de la cuenta**: `My Todo App` (o el que prefieras)
2. Configura las opciones de compartir datos (opcional)
3. Haz clic en **"Siguiente"**

### Paso 3: Crear propiedad

1. **Nombre de la propiedad**: `My Todo`
2. **Zona horaria**: Selecciona tu zona horaria
3. **Moneda**: Selecciona tu moneda
4. Haz clic en **"Siguiente"**

### Paso 4: Detalles del negocio

1. Selecciona la categoría de tu negocio
2. Selecciona el tamaño de tu empresa
3. Selecciona cómo planeas usar Google Analytics
4. Haz clic en **"Crear"**
5. Acepta los términos de servicio

### Paso 5: Configurar flujo de datos

1. Selecciona la plataforma: **Web**
2. **URL del sitio web**: `https://tu-proyecto.web.app` (o tu dominio)
3. **Nombre del flujo**: `My Todo Web`
4. Haz clic en **"Crear flujo"**

### Paso 6: Obtener Measurement ID

1. Después de crear el flujo, verás el **ID de medición**
   - Se ve así: `G-XXXXXXXXXX`
2. **Cópialo** - lo necesitarás para el `.env`

---

## 3. Firebase - Hosting

### Paso 1: Crear proyecto en Firebase

1. Ve a [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"**
3. **Nombre del proyecto**: `my-todo` (o el que prefieras)
4. Haz clic en **"Continuar"**
5. (Opcional) Habilita Google Analytics
6. Selecciona tu cuenta de Analytics o crea una nueva
7. Haz clic en **"Crear proyecto"**

### Paso 2: Habilitar Firebase Hosting

1. En el menú lateral, ve a **"Hosting"**
2. Haz clic en **"Comenzar"**
3. Sigue los pasos (ya tenemos el código configurado)
4. Haz clic en **"Finalizar"**

### Paso 3: Inicializar Firebase en tu proyecto

Abre una terminal en tu proyecto y ejecuta:

```bash
# Login en Firebase
npx firebase login

# Inicializar Firebase Hosting
npm run firebase:init
```

Cuando te pregunte:
- **¿Qué características quieres usar?**: Selecciona solo **Hosting**
- **¿Usar un proyecto existente?**: Sí
- **Selecciona tu proyecto**: Elige el que creaste
- **¿Cuál es tu directorio público?**: `dist`
- **¿Configurar como SPA?**: **Sí**
- **¿Sobrescribir index.html?**: **No**

### Paso 4: Obtener Service Account (para CI/CD)

1. En Firebase Console, ve a **⚙️ Configuración del proyecto**
2. Ve a la pestaña **"Cuentas de servicio"**
3. Haz clic en **"Generar nueva clave privada"**
4. Haz clic en **"Generar clave"**
5. Se descargará un archivo JSON
6. **Guarda este archivo de forma segura** - lo necesitarás para GitHub Secrets

### Paso 5: Obtener Project ID

1. En Firebase Console, ve a **⚙️ Configuración del proyecto**
2. En la pestaña **"General"**, copia el **ID del proyecto**
   - Se ve así: `my-todo-xxxxx`

---

## 4. GitHub Actions - CI/CD

### Paso 1: Configurar GitHub Secrets

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **"New repository secret"** para cada uno:

#### Secrets necesarios:

| Nombre | Valor | Dónde obtenerlo |
|--------|-------|-----------------|
| `VITE_API_BASE_URL` | Tu URL de API | De tu `.env` actual |
| `VITE_API_TOKEN` | Tu token de API | De tu `.env` actual |
| `VITE_SENTRY_DSN` | DSN de Sentry | Paso 1.3 |
| `VITE_GA_MEASUREMENT_ID` | ID de Google Analytics | Paso 2.6 |
| `FIREBASE_SERVICE_ACCOUNT` | Contenido del JSON | Paso 3.4 (todo el contenido del archivo JSON) |
| `FIREBASE_PROJECT_ID` | ID del proyecto Firebase | Paso 3.5 |
| `SENTRY_AUTH_TOKEN` | Token de Sentry | Paso 1.4 |
| `SENTRY_ORG` | Organización de Sentry | Paso 1.5 |
| `SENTRY_PROJECT` | Proyecto de Sentry | Paso 1.5 |

### Paso 2: Verificar el workflow

El archivo `.github/workflows/deploy.yml` ya está configurado. Cuando hagas push a `main`, se ejecutará automáticamente.

---

## 5. Variables de Entorno

### Desarrollo (`.env`)

Crea o actualiza tu archivo `.env` en la raíz del proyecto:

```env
# API Configuration
VITE_API_BASE_URL=https://roble-api.openlab.uninorte.edu.co/data/TU_TOKEN
VITE_API_TOKEN=TU_TOKEN

# Sentry Configuration
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
VITE_SENTRY_ENVIRONMENT=development

# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Producción (GitHub Secrets)

Las variables de producción se configuran en GitHub Secrets (ver Paso 4.1).

---

## ✅ Verificación

### 1. Verificar Sentry

```bash
# Ejecuta la app en desarrollo
npm run dev

# Abre la consola del navegador y ejecuta:
throw new Error("Test Sentry");

# Verifica que el error aparezca en Sentry Dashboard
```

### 2. Verificar Google Analytics

1. Abre [Google Analytics Real-Time](https://analytics.google.com/)
2. Ejecuta `npm run dev`
3. Navega por la aplicación
4. Verifica que aparezcan eventos en tiempo real

### 3. Verificar Firebase Hosting

```bash
# Build y deploy manual
npm run deploy

# Verifica que la app esté en: https://TU-PROYECTO.web.app
```

### 4. Verificar GitHub Actions

1. Haz un cambio pequeño en el código
2. Commit y push a `main`:
   ```bash
   git add .
   git commit -m "test: verificar CI/CD"
   git push origin main
   ```
3. Ve a **Actions** en GitHub
4. Verifica que el workflow se ejecute correctamente

---

## 🎉 ¡Listo!

Tu aplicación ahora tiene:
- ✅ **Sentry** - Monitoreo de errores en tiempo real
- ✅ **Google Analytics** - Análisis de comportamiento de usuarios
- ✅ **Firebase Hosting** - Hosting rápido y seguro
- ✅ **GitHub Actions** - Deploy automático en cada push

---

## 🆘 Troubleshooting

### Error: "Sentry DSN not configured"
- Verifica que `VITE_SENTRY_DSN` esté en tu `.env`
- Reinicia el servidor de desarrollo

### Error: "Firebase project not found"
- Verifica que hayas ejecutado `firebase login`
- Verifica que el Project ID sea correcto

### Error en GitHub Actions
- Verifica que todos los Secrets estén configurados
- Revisa los logs en la pestaña Actions

### Google Analytics no muestra datos
- Puede tardar hasta 24 horas en mostrar datos históricos
- Usa la vista "Real-Time" para ver datos inmediatos

---

## 📚 Recursos Adicionales

- [Documentación de Sentry](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Documentación de Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Documentación de Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Documentación de GitHub Actions](https://docs.github.com/en/actions)
