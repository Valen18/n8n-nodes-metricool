# n8n-nodes-metricool

## Prueba Formativa - VA360

Este proyecto es una **prueba formativa** desarrollada durante una clase en directo de **VA360**.

El objetivo es demostrar cómo crear un nodo de comunidad para n8n que se conecte con la API de Metricool.

## Funcionalidades Implementadas

- **Credenciales**: Configuración de autenticación con la API de Metricool (User Token, User ID, Blog ID)
- **Recurso Post**: Operaciones sobre posts programados
  - `GET /v2/scheduler/posts` - Obtener posts programados
  - `POST /v2/scheduler/posts` - Crear un nuevo post programado

## Instalación para Desarrollo

```bash
# Instalar dependencias
npm install

# Compilar el proyecto
npm run build
```

## Uso en n8n

Para probar el nodo en n8n de forma local:

```powershell
# PowerShell
$env:N8N_CUSTOM_EXTENSIONS="D:\Test\n8n-nodes-metricool"
npx n8n
```

```bash
# Bash
N8N_CUSTOM_EXTENSIONS="/ruta/al/proyecto" npx n8n
```

## Estructura del Proyecto

```
n8n-nodes-metricool/
├── credentials/
│   └── MetricoolApi.credentials.ts
├── nodes/
│   └── Metricool/
│       ├── Metricool.node.ts
│       ├── Metricool.node.json
│       ├── metricool.svg
│       └── resources/
│           └── posts/
│               ├── index.ts
│               ├── posts.operations.ts
│               └── posts.fields.ts
├── scripts/
│   └── post-build.js
├── package.json
├── tsconfig.json
└── index.js
```

## Licencia

MIT
