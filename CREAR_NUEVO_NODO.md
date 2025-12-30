# Guía Completa: Crear un Custom Node de n8n

Esta guía documenta cómo crear un nuevo nodo personalizado de n8n basándose en la arquitectura modular utilizada en `n8n-nodes-vuela`.

---

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Paso a Paso: Crear un Nuevo Nodo](#paso-a-paso-crear-un-nuevo-nodo)
4. [Archivos de Configuración](#archivos-de-configuración)
5. [Anatomía de un Nodo](#anatomía-de-un-nodo)
6. [Sistema de Credenciales](#sistema-de-credenciales)
7. [Propiedades y Campos](#propiedades-y-campos)
8. [Lógica de Ejecución](#lógica-de-ejecución)
9. [Instalación y Pruebas](#instalación-y-pruebas)
10. [Comandos Útiles](#comandos-útiles)
11. [Solución de Problemas](#solución-de-problemas)

---

## Requisitos Previos

- Node.js v18.17.0 o superior
- n8n instalado globalmente o localmente
- TypeScript conocimiento básico
- Editor de código (VS Code recomendado)

---

## Estructura del Proyecto

```
n8n-nodes-tunodo/
├── credentials/
│   └── TuApi.credentials.ts       # Definición de credenciales
├── nodes/
│   └── TuNodo/
│       ├── TuNodo.node.ts         # Clase principal del nodo
│       ├── TuNodo.node.json       # Metadatos para n8n (categorías, docs)
│       ├── TuNodoDescription.ts   # Definición de propiedades UI
│       ├── TuNodoExecutor.ts      # Lógica de ejecución
│       ├── tunodo.svg             # Icono del nodo (SVG)
│       ├── properties/            # Propiedades modulares por recurso
│       │   ├── recurso1Properties.ts
│       │   └── recurso2Properties.ts
│       └── utils/
│           └── apiHelpers.ts      # Helpers para llamadas API
├── dist/                          # Código compilado (generado)
├── .eslintrc.js                   # Configuración ESLint
├── .gitignore                     # Archivos a ignorar
├── index.js                       # Entry point
├── package.json                   # Dependencias y configuración n8n
└── tsconfig.json                  # Configuración TypeScript
```

---

## Paso a Paso: Crear un Nuevo Nodo

### Paso 1: Crear la Carpeta del Proyecto

```bash
mkdir n8n-nodes-minodo
cd n8n-nodes-minodo
npm init -y
```

### Paso 2: Instalar Dependencias

```bash
# Dependencias de desarrollo
npm install --save-dev typescript @types/node @typescript-eslint/parser eslint eslint-plugin-n8n-nodes-base prettier

# Peer dependency (n8n-workflow)
npm install --save-peer n8n-workflow
```

### Paso 3: Crear Estructura de Carpetas

```bash
mkdir -p credentials nodes/MiNodo/properties nodes/MiNodo/utils
```

### Paso 4: Crear Archivos de Configuración

Ver sección [Archivos de Configuración](#archivos-de-configuración) más abajo.

### Paso 5: Crear los Archivos del Nodo

Ver secciones siguientes para el contenido de cada archivo.

---

## Archivos de Configuración

### package.json

```json
{
  "name": "n8n-nodes-minodo",
  "version": "0.1.0",
  "description": "Descripción de tu nodo personalizado",
  "keywords": [
    "n8n-community-node-package"
  ],
  "license": "MIT",
  "author": {
    "name": "Tu Nombre",
    "email": "tu@email.com"
  },
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint nodes/**/*.ts credentials/**/*.ts",
    "lintfix": "eslint nodes/**/*.ts credentials/**/*.ts --fix",
    "prepublishOnly": "npm run build && npm run lint"
  },
  "files": [
    "dist"
  ],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": [
      "dist/credentials/MiApi.credentials.js"
    ],
    "nodes": [
      "dist/nodes/MiNodo/MiNodo.node.js"
    ]
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@typescript-eslint/parser": "^6.14.0",
    "eslint": "^8.56.0",
    "eslint-plugin-n8n-nodes-base": "^1.16.1",
    "prettier": "^3.1.1",
    "typescript": "~5.3.3"
  },
  "peerDependencies": {
    "n8n-workflow": "~1.32.0"
  }
}
```

> **IMPORTANTE**: La sección `n8n` es crítica. Define qué archivos compilados n8n debe cargar.

### tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["es2020"],
    "target": "es2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./",
    "typeRoots": ["./node_modules/@types"]
  },
  "include": [
    "credentials/**/*",
    "nodes/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    ".eslintrc.js"
  ]
}
```

### .eslintrc.js

```javascript
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.json'],
  },
  ignorePatterns: [
    '.eslintrc.js',
    'dist/**/*',
    'node_modules/**/*',
    '**/*.json',
    '**/*.svg'
  ],
  plugins: ['eslint-plugin-n8n-nodes-base'],
  extends: ['plugin:n8n-nodes-base/community'],
  rules: {
    'n8n-nodes-base/node-dirname-against-convention': 'off',
  },
};
```

### .gitignore

```gitignore
# Dependencies
node_modules/
npm-debug.log*
package-lock.json

# Production build
dist/
build/

# Environment variables
.env
.env.local
.env.*.local

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
thumbs.db

# Logs
logs
*.log

# Coverage
coverage/

# Temporary
tmp/
temp/
```

### index.js

```javascript
// Entry point para n8n
module.exports = require('./dist/nodes/MiNodo/MiNodo.node.js');
```

---

## Anatomía de un Nodo

### MiNodo.node.ts (Clase Principal)

```typescript
import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
} from 'n8n-workflow';
import { MiNodoDescription } from './MiNodoDescription';
import { MiNodoExecutor } from './MiNodoExecutor';

/**
 * Mi Nodo Personalizado para n8n
 *
 * Arquitectura modular:
 * - MiNodoDescription.ts: Definición del nodo y propiedades UI
 * - MiNodoExecutor.ts: Lógica de ejecución
 * - properties/: Propiedades organizadas por recurso
 * - utils/: Helpers y utilidades
 */
export class MiNodo implements INodeType {
  description = MiNodoDescription;

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return await MiNodoExecutor.execute(this);
  }
}
```

### MiNodo.node.json (Metadatos)

```json
{
  "node": "n8n-nodes-base.minodo",
  "nodeVersion": "1.0",
  "codexVersion": "1.0",
  "categories": [
    "Marketing & Content",
    "Productivity"
  ],
  "resources": {
    "primaryDocumentation": [
      {
        "url": "https://tudominio.com/docs"
      }
    ]
  },
  "alias": ["MiNodo", "Alias1", "Alias2"]
}
```

### MiNodoDescription.ts (Propiedades UI)

```typescript
import { INodeTypeDescription } from 'n8n-workflow';
import { recurso1Properties } from './properties/recurso1Properties';
import { recurso2Properties } from './properties/recurso2Properties';

export const MiNodoDescription: INodeTypeDescription = {
  displayName: 'Mi Nodo',
  name: 'miNodo',                    // Nombre interno (camelCase, sin espacios)
  icon: 'file:minodo.svg',           // Icono SVG
  group: ['transform'],              // Grupo: transform, input, output, trigger
  version: 1,
  subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
  description: 'Descripción corta de tu nodo',
  defaults: {
    name: 'Mi Nodo',
  },
  inputs: ['main'],
  outputs: ['main'],
  credentials: [
    {
      name: 'miApi',                 // Nombre de las credenciales (debe coincidir)
      required: true,
    },
  ],
  requestDefaults: {
    baseURL: 'https://api.tuservicio.com',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  properties: [
    // Selector de recurso (primera propiedad siempre)
    {
      displayName: 'Resource',
      name: 'resource',
      type: 'options',
      noDataExpression: true,
      options: [
        {
          name: 'Recurso 1',
          value: 'recurso1',
        },
        {
          name: 'Recurso 2',
          value: 'recurso2',
        },
      ],
      default: 'recurso1',
    },

    // Importar propiedades de cada recurso
    ...recurso1Properties,
    ...recurso2Properties,
  ],
};
```

---

## Sistema de Credenciales

### MiApi.credentials.ts

```typescript
import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MiApi implements ICredentialType {
  name = 'miApi';                              // Debe coincidir con credentials[].name del nodo
  displayName = 'Mi API';
  documentationUrl = 'https://tudominio.com/docs';
  icon = 'file:minodo.svg';                    // Opcional: icono para credenciales

  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,                        // Oculta el valor
      },
      default: '',
      required: true,
      description: 'Tu API Key. Obtenla desde el dashboard.',
    },
    // Puedes agregar más campos si necesitas
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.tuservicio.com',
      description: 'URL base de la API (opcional)',
    },
  ];

  // Cómo enviar la autenticación en cada request
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.apiKey}}',
        // Alternativas:
        // 'X-API-Key': '={{$credentials.apiKey}}',
        // 'Authorization': '=Basic {{$credentials.apiKey}}',
      },
    },
  };

  // Test para verificar que las credenciales funcionan
  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.tuservicio.com',
      url: '/auth/verify',                     // Endpoint de verificación
      method: 'GET',
    },
  };
}
```

---

## Propiedades y Campos

### properties/recurso1Properties.ts

```typescript
import { INodeProperties } from 'n8n-workflow';

export const recurso1Properties: INodeProperties[] = [
  // OPERACIONES disponibles para este recurso
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['recurso1'],               // Solo mostrar cuando resource = recurso1
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Crear un nuevo elemento',
        action: 'Create element',             // Texto para el action selector
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Obtener un elemento por ID',
        action: 'Get element',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Obtener múltiples elementos',
        action: 'Get many elements',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Actualizar un elemento',
        action: 'Update element',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Eliminar un elemento',
        action: 'Delete element',
      },
    ],
    default: 'create',
  },

  // CAMPOS para operación CREATE
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    description: 'Nombre del elemento a crear',
    displayOptions: {
      show: {
        resource: ['recurso1'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    typeOptions: {
      rows: 4,                                // Textarea multilínea
    },
    default: '',
    description: 'Descripción del elemento',
    displayOptions: {
      show: {
        resource: ['recurso1'],
        operation: ['create'],
      },
    },
  },

  // CAMPOS para operación GET
  {
    displayName: 'Element ID',
    name: 'elementId',
    type: 'string',
    default: '',
    required: true,
    description: 'ID del elemento a obtener',
    displayOptions: {
      show: {
        resource: ['recurso1'],
        operation: ['get', 'update', 'delete'],
      },
    },
  },

  // CAMPOS OPCIONALES (Additional Fields)
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['recurso1'],
        operation: ['create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Tags separados por coma',
      },
      {
        displayName: 'Priority',
        name: 'priority',
        type: 'options',
        options: [
          { name: 'Low', value: 'low' },
          { name: 'Medium', value: 'medium' },
          { name: 'High', value: 'high' },
        ],
        default: 'medium',
      },
      {
        displayName: 'Active',
        name: 'active',
        type: 'boolean',
        default: true,
      },
    ],
  },

  // PARÁMETROS de paginación para GET MANY
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 50,
    description: 'Número máximo de resultados',
    displayOptions: {
      show: {
        resource: ['recurso1'],
        operation: ['getMany'],
      },
    },
  },
];
```

### Tipos de Campos Disponibles

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `string` | Texto simple | Nombres, IDs |
| `number` | Número | Límites, cantidades |
| `boolean` | Checkbox | Opciones on/off |
| `options` | Dropdown | Selección única |
| `multiOptions` | Multi-select | Selección múltiple |
| `collection` | Grupo de campos | Additional Fields |
| `fixedCollection` | Grupo con items | Arrays de objetos |
| `json` | Editor JSON | Configuraciones complejas |
| `dateTime` | Selector de fecha | Timestamps |
| `color` | Selector de color | Colores HEX |
| `notice` | Texto informativo | Avisos, instrucciones |

---

## Lógica de Ejecución

### MiNodoExecutor.ts

```typescript
import {
  IExecuteFunctions,
  INodeExecutionData,
} from 'n8n-workflow';
import { MiApiHelper } from './utils/apiHelpers';

export class MiNodoExecutor {
  static async execute(executeFunctions: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = executeFunctions.getInputData();
    const returnData: INodeExecutionData[] = [];

    // Obtener credenciales
    const credentials = await executeFunctions.getCredentials('miApi');

    // Procesar cada item de entrada
    for (let i = 0; i < items.length; i++) {
      try {
        const resource = executeFunctions.getNodeParameter('resource', i) as string;
        const operation = executeFunctions.getNodeParameter('operation', i) as string;

        let response;

        // Router de recursos y operaciones
        if (resource === 'recurso1') {
          if (operation === 'create') {
            const name = executeFunctions.getNodeParameter('name', i) as string;
            const description = executeFunctions.getNodeParameter('description', i, '') as string;
            const additionalFields = executeFunctions.getNodeParameter('additionalFields', i, {}) as any;

            response = await MiApiHelper.createElement(executeFunctions, credentials, {
              name,
              description,
              ...additionalFields,
            });
          } else if (operation === 'get') {
            const elementId = executeFunctions.getNodeParameter('elementId', i) as string;
            response = await MiApiHelper.getElement(executeFunctions, credentials, elementId);
          } else if (operation === 'getMany') {
            const limit = executeFunctions.getNodeParameter('limit', i, 50) as number;
            response = await MiApiHelper.getElements(executeFunctions, credentials, limit);
          } else if (operation === 'update') {
            const elementId = executeFunctions.getNodeParameter('elementId', i) as string;
            const additionalFields = executeFunctions.getNodeParameter('additionalFields', i, {}) as any;
            response = await MiApiHelper.updateElement(executeFunctions, credentials, elementId, additionalFields);
          } else if (operation === 'delete') {
            const elementId = executeFunctions.getNodeParameter('elementId', i) as string;
            response = await MiApiHelper.deleteElement(executeFunctions, credentials, elementId);
          }
        }
        // Agregar más recursos aquí...

        // Agregar respuesta al resultado
        returnData.push({ json: response });

      } catch (error) {
        // Manejo de errores
        if (executeFunctions.continueOnFail()) {
          returnData.push({
            json: {
              error: error instanceof Error ? error.message : String(error),
            },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
```

### utils/apiHelpers.ts

```typescript
import {
  IDataObject,
  IExecuteFunctions,
  IHttpRequestMethods,
  IHttpRequestOptions,
} from 'n8n-workflow';

export class MiApiHelper {
  private static async makeRequest(
    executeFunctions: IExecuteFunctions,
    credentials: IDataObject,
    method: IHttpRequestMethods,
    endpoint: string,
    body?: IDataObject,
    qs?: IDataObject,
  ): Promise<any> {
    const baseUrl = (credentials.baseUrl as string) || 'https://api.tuservicio.com';

    const options: IHttpRequestOptions = {
      method,
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${credentials.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      json: true,
    };

    if (body && Object.keys(body).length > 0) {
      options.body = body;
    }

    if (qs && Object.keys(qs).length > 0) {
      options.qs = qs;
    }

    return await executeFunctions.helpers.httpRequest(options);
  }

  // Métodos específicos para cada operación
  static async createElement(
    executeFunctions: IExecuteFunctions,
    credentials: IDataObject,
    data: IDataObject,
  ): Promise<any> {
    return this.makeRequest(executeFunctions, credentials, 'POST', '/elements', data);
  }

  static async getElement(
    executeFunctions: IExecuteFunctions,
    credentials: IDataObject,
    id: string,
  ): Promise<any> {
    return this.makeRequest(executeFunctions, credentials, 'GET', `/elements/${id}`);
  }

  static async getElements(
    executeFunctions: IExecuteFunctions,
    credentials: IDataObject,
    limit: number,
  ): Promise<any> {
    return this.makeRequest(executeFunctions, credentials, 'GET', '/elements', undefined, { limit });
  }

  static async updateElement(
    executeFunctions: IExecuteFunctions,
    credentials: IDataObject,
    id: string,
    data: IDataObject,
  ): Promise<any> {
    return this.makeRequest(executeFunctions, credentials, 'PUT', `/elements/${id}`, data);
  }

  static async deleteElement(
    executeFunctions: IExecuteFunctions,
    credentials: IDataObject,
    id: string,
  ): Promise<any> {
    return this.makeRequest(executeFunctions, credentials, 'DELETE', `/elements/${id}`);
  }
}
```

---

## Instalación y Pruebas

### Método 1: Symlink (Recomendado para Desarrollo)

```bash
# Desde la carpeta de tu nodo
cd D:\Test\n8n-nodes-minodo
npm run build

# Crear symlink en n8n
cd C:\Users\TuUsuario\.n8n
mkdir node_modules  # Si no existe
cd node_modules
mklink /D n8n-nodes-minodo D:\Test\n8n-nodes-minodo

# Registrar en package.json de .n8n
# Agregar manualmente o usar:
npm install --save file:D:\Test\n8n-nodes-minodo
```

Contenido de `C:\Users\TuUsuario\.n8n\package.json`:

```json
{
  "dependencies": {
    "n8n-nodes-minodo": "file:D:/Test/n8n-nodes-minodo"
  }
}
```

### Método 2: npm link

```bash
# Desde la carpeta de tu nodo
cd D:\Test\n8n-nodes-minodo
npm link

# Desde .n8n
cd C:\Users\TuUsuario\.n8n
npm link n8n-nodes-minodo
```

### Verificar Instalación

```bash
# Ver qué nodos están instalados
ls C:\Users\TuUsuario\.n8n\node_modules
```

---

## Comandos Útiles

### Desarrollo

```bash
# Compilar una vez
npm run build

# Compilar en modo watch (detecta cambios)
npm run dev

# Verificar errores de lint
npm run lint

# Corregir errores de lint automáticamente
npm run lintfix
```

### Flujo de Desarrollo

1. **Editar** archivos `.ts` en `nodes/` o `credentials/`
2. **Compilar** con `npm run build` o usar `npm run dev` para modo watch
3. **Reiniciar n8n** para cargar los cambios
4. **Probar** el nodo en el editor de n8n

### Depuración

```bash
# Iniciar n8n con logs detallados
n8n start --log-level=debug

# Ver errores específicos de nodos
set DEBUG=n8n:*
n8n start
```

---

## Solución de Problemas

### El nodo no aparece en n8n

1. Verificar que `package.json` tiene la sección `n8n` correcta
2. Verificar que los paths en `n8n.nodes` y `n8n.credentials` son correctos
3. Asegurar que el código compiló sin errores (`npm run build`)
4. Reiniciar n8n completamente

### Error: "Cannot find module"

1. Verificar que el symlink existe y apunta correctamente
2. Ejecutar `npm install` en la carpeta del nodo
3. Verificar que `dist/` contiene los archivos compilados

### Error de credenciales

1. Verificar que `name` en credentials coincide con `credentials[].name` en el nodo
2. Verificar que el archivo de credenciales está listado en `package.json`

### El icono no aparece

1. El icono debe ser SVG
2. El path debe ser `file:nombreicono.svg`
3. El archivo debe estar en la misma carpeta que el `.node.ts`

### Errores de TypeScript

```bash
# Ver errores detallados
npx tsc --noEmit

# Limpiar y recompilar
rm -rf dist/
npm run build
```

---

## Plantilla Rápida de Inicio

Para crear un nuevo nodo rápidamente, copia esta estructura:

```bash
# Clonar estructura base
cp -r D:\Test\n8n-nodes-vuela D:\Test\n8n-nodes-nuevo

# Renombrar archivos y reemplazar contenido
# 1. Renombrar carpeta nodes/Vuela -> nodes/NuevoNodo
# 2. Renombrar archivos Vuela.* -> NuevoNodo.*
# 3. Renombrar VuelaApi.credentials.ts -> NuevoApi.credentials.ts
# 4. Buscar y reemplazar "Vuela" -> "NuevoNodo" en todos los archivos
# 5. Buscar y reemplazar "vuela" -> "nuevoNodo" en todos los archivos
# 6. Actualizar package.json con nuevo nombre y descripción
# 7. Actualizar el icono SVG
```

---

## Referencias

- [n8n Docs: Creating Nodes](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n Community Nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes)
- [n8n-workflow Types](https://github.com/n8n-io/n8n/tree/master/packages/workflow)

---

*Documentación generada basándose en la arquitectura de `n8n-nodes-vuela` v0.1.2*
*Autor: VA360.pro*
