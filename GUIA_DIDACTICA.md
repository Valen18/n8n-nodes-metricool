# 🛠️ Guía Didáctica: Cómo Crear tu Propio Nodo de n8n
## *Una guía paso a paso para desarrollar nodos personalizados*

---

## 🎯 ¿Qué vas a aprender?

Al final de esta guía sabrás:
- Qué es un nodo de n8n y cómo funciona
- La estructura básica de un nodo personalizado
- Cómo crear tu primer nodo desde cero
- Cómo agregar funcionalidades avanzadas
- Cómo publicar tu nodo para que otros lo usen

**Tiempo estimado:** 60-90 minutos  
**Nivel:** Principiante (conocimientos básicos de programación útiles pero no esenciales)

---

## 📋 Antes de Empezar

### Lo que necesitas tener listo:
1. **Una computadora** con Windows, Mac o Linux
2. **Node.js** instalado (versión 16 o superior)
3. **Un editor de código** como Visual Studio Code (gratis)
4. **n8n instalado** para probar tu nodo
5. **60-90 minutos** de tiempo libre
6. **Ganas de aprender** (¡lo más importante!)

### ¿No tienes Node.js?
Ve a [nodejs.org](https://nodejs.org) y descarga la versión LTS (recomendada). Es gratis y fácil de instalar.

### ¿No tienes un editor de código?
Descarga [Visual Studio Code](https://code.visualstudio.com) - es gratis, potente y perfecto para principiantes.

---

## 🚀 PASO 1: Entendiendo Qué es un Nodo de n8n

### 1.1 ¿Qué es un nodo?
- Un **nodo** es como un bloque de LEGO digital
- Cada nodo hace una tarea específica (enviar email, procesar datos, conectar APIs)
- Los conectas entre sí para crear **flujos de trabajo automáticos**

### 1.2 ¿Por qué crear tu propio nodo?
- **Conectar servicios únicos** que n8n no tiene
- **Simplificar tareas complejas** en un solo bloque
- **Compartir con la comunidad** y ayudar a otros
- **Aprender programación** de forma práctica y divertida

### 1.3 Ejemplo: El nodo de Vuela.ai
Vamos a usar como ejemplo el nodo de Vuela.ai que tienes en este proyecto:
- Conecta con la API de Vuela.ai
- Genera contenido y videos con IA
- Tiene múltiples funciones organizadas

---

## 🏗️ PASO 2: Preparando tu Entorno de Desarrollo

### 2.1 Verifica que tienes Node.js
- Abre tu **terminal** o **línea de comandos**
- Escribe: `node --version`
- Deberías ver algo como `v18.17.0` o similar
- Si no, instala Node.js desde [nodejs.org](https://nodejs.org)

### 2.2 Crea tu carpeta de proyecto
- Crea una carpeta nueva llamada `mi-primer-nodo`
- Abre esta carpeta en tu editor de código
- ¡Este será tu laboratorio de experimentación!

---

## 📦 PASO 3: Creando la Estructura Básica del Proyecto

### 3.1 Inicializa tu proyecto Node.js
- Abre la terminal en tu carpeta `mi-primer-nodo`
- Escribe: `npm init -y`
- Esto crea un archivo `package.json` con la configuración básica

### 3.2 Instala las dependencias necesarias
Escribe estos comandos uno por uno:
```bash
npm install n8n-workflow
npm install --save-dev typescript @types/node
```

### 3.3 Crea la estructura de carpetas
Crea estas carpetas y archivos:
```
mi-primer-nodo/
├── package.json
├── nodes/
│   └── MiNodo/
│       ├── MiNodo.node.ts
│       └── mi-nodo.svg
├── credentials/
│   └── MiApi.credentials.ts
└── index.js
```

---

## 🎯 PASO 4: Creando tu Primer Nodo Simple

### 4.1 El archivo principal del nodo
Crea el archivo `nodes/MiNodo/MiNodo.node.ts` y copia este código:

```typescript
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class MiNodo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mi Primer Nodo',
		name: 'miPrimerNodo',
		icon: 'file:mi-nodo.svg',
		group: ['transform'],
		version: 1,
		description: '¡Mi primer nodo personalizado de n8n!',
		defaults: {
			name: 'Mi Primer Nodo',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Mensaje',
				name: 'mensaje',
				type: 'string',
				default: 'Hola mundo',
				description: 'El mensaje que quieres mostrar',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const mensaje = this.getNodeParameter('mensaje', i) as string;
			
			returnData.push({
				json: {
					mensaje: mensaje,
					timestamp: new Date().toISOString(),
					original: items[i].json,
				},
			});
		}

		return [returnData];
	}
}
```

### 4.2 ¿Qué hace este código?
- **displayName**: El nombre que verán los usuarios
- **properties**: Los campos que puede configurar el usuario
- **execute**: La función que hace el trabajo real
- **returnData**: Los datos que devuelve el nodo

---

## 🎨 PASO 5: Agregando un Ícono a tu Nodo

### 5.1 Crea el ícono
- Busca un ícono SVG simple en [Heroicons](https://heroicons.com) o [Feather Icons](https://feathericons.com)
- Guárdalo como `nodes/MiNodo/mi-nodo.svg`
- El ícono debe ser simple y reconocible

### 5.2 Ejemplo de ícono SVG simple:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"/>
  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
  <line x1="9" y1="9" x2="9.01" y2="9"/>
  <line x1="15" y1="9" x2="15.01" y2="9"/>
</svg>
```

### 5.3 ¿Por qué es importante el ícono?
- Ayuda a los usuarios a **identificar** tu nodo rápidamente
- Hace que tu nodo se vea **profesional**
- Mejora la **experiencia de usuario** en n8n

---

## ⚙️ PASO 6: Configurando el package.json

### 6.1 Edita tu package.json
Abre `package.json` y reemplaza el contenido con esto:

```json
{
  "name": "n8n-nodes-mi-primer-nodo",
  "version": "0.1.0",
  "description": "Mi primer nodo personalizado para n8n",
  "keywords": ["n8n-community-node-package"],
  "license": "MIT",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "files": ["dist"],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "nodes": ["dist/nodes/MiNodo/MiNodo.node.js"]
  },
  "devDependencies": {
    "typescript": "^4.9.0",
    "@types/node": "^18.0.0"
  },
  "dependencies": {
    "n8n-workflow": "^1.0.0"
  }
}
```

### 6.2 Crea el archivo index.js
```javascript
// Este archivo es requerido por n8n
module.exports = require('./dist/nodes/MiNodo/MiNodo.node.js');
```

### 6.3 Configura TypeScript
Crea `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["nodes/**/*", "credentials/**/*"]
}
```

---

## 🔨 PASO 7: Compilando y Probando tu Nodo

### 7.1 Compila tu nodo
- En la terminal, escribe: `npm run build`
- Esto convierte tu código TypeScript a JavaScript
- Verás que se crea una carpeta `dist/`

### 7.2 Instala tu nodo en n8n (desarrollo local)
- Copia la carpeta completa a tu directorio de nodos de n8n
- O usa: `npm link` para desarrollo
- Reinicia n8n

### 7.3 Prueba tu nodo
- Abre n8n en tu navegador
- Busca "Mi Primer Nodo" en la lista de nodos
- ¡Arrástralo a tu flujo y pruébalo!

### 7.4 ¿Qué deberías ver?
- Un nodo con tu ícono personalizado
- Un campo para escribir tu mensaje
- Cuando lo ejecutes, devuelve tu mensaje con timestamp

---

## 🚀 PASO 8: Agregando Funcionalidades Avanzadas

### 8.1 Múltiples operaciones
Puedes agregar diferentes operaciones a tu nodo:

```typescript
properties: [
  {
    displayName: 'Operación',
    name: 'operation',
    type: 'options',
    options: [
      {
        name: 'Saludar',
        value: 'saludar',
      },
      {
        name: 'Calcular',
        value: 'calcular',
      },
    ],
    default: 'saludar',
  },
  // Más propiedades...
]
```

### 8.2 Campos condicionales
Muestra campos solo cuando sea necesario:

```typescript
{
  displayName: 'Número 1',
  name: 'numero1',
  type: 'number',
  displayOptions: {
    show: {
      operation: ['calcular'],
    },
  },
  default: 0,
}
```

### 8.3 Validación de datos
```typescript
if (!mensaje || mensaje.trim() === '') {
  throw new Error('El mensaje no puede estar vacío');
}
```

---

## 🛠️ PASO 9: Solucionando Problemas Comunes

### 9.1 "Error de compilación"
- **Problema**: TypeScript no compila
- **Solución**: Revisa la sintaxis en tu código
- **Tip**: Los errores suelen indicar la línea exacta

### 9.2 "El nodo no aparece en n8n"
- **Problema**: n8n no encuentra tu nodo
- **Solución**: Verifica el `package.json` y reinicia n8n
- **Tip**: Revisa que la ruta en `n8n.nodes` sea correcta

### 9.3 "Error al ejecutar el nodo"
- **Problema**: El nodo falla al ejecutarse
- **Solución**: Agrega logs para debug: `console.log()`
- **Tip**: Revisa la consola del navegador para más detalles

### 9.4 Debugging útil
```typescript
// Agrega esto en tu función execute para debug
console.log('Parámetros recibidos:', {
  mensaje: this.getNodeParameter('mensaje', 0),
  items: items.length
});
```

---

## 🎉 PASO 10: Publicando tu Nodo

### 10.1 Prepara tu nodo para publicación
- Agrega un **README.md** con instrucciones
- Incluye **ejemplos de uso**
- Documenta todos los parámetros

### 10.2 Publica en npm
```bash
npm login
npm publish
```

### 10.3 Comparte con la comunidad
- Sube tu código a **GitHub**
- Comparte en el **foro de n8n**
- Documenta en [n8n Community](https://community.n8n.io)

### 10.4 Mantén tu nodo actualizado
- Escucha feedback de usuarios
- Agrega nuevas funcionalidades
- Corrige bugs rápidamente

---

## 📚 Recursos Adicionales

### Enlaces útiles:
- **n8n Documentación**: [https://docs.n8n.io/integrations/creating-nodes/](https://docs.n8n.io/integrations/creating-nodes/)
- **n8n Community**: [https://community.n8n.io](https://community.n8n.io)
- **VA360.pro**: [https://va360.pro](https://va360.pro) - Aprende más sobre automatización
- **TypeScript Docs**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

### Ejemplos avanzados:
1. **Nodo con API externa** - Conecta con servicios web
2. **Nodo con credenciales** - Maneja autenticación
3. **Nodo con webhooks** - Recibe datos en tiempo real
4. **Nodo con archivos** - Procesa documentos e imágenes

### Próximos pasos:
1. Estudia nodos existentes en [n8n GitHub](https://github.com/n8n-io/n8n)
2. Únete a la comunidad de desarrolladores
3. Contribuye a proyectos open source
4. Crea nodos más complejos

---

## 🎉 ¡Felicidades!

Has completado la guía y ahora sabes cómo:
- ✅ Entender la arquitectura de un nodo de n8n
- ✅ Crear la estructura básica de un proyecto
- ✅ Escribir tu primer nodo funcional
- ✅ Compilar y probar tu nodo
- ✅ Agregar funcionalidades avanzadas
- ✅ Solucionar problemas comunes
- ✅ Publicar tu nodo para la comunidad

**¡Ahora puedes crear nodos increíbles para n8n!**

---

## 🚀 Proyecto de Ejemplo: Nodo de Vuela.ai

Este proyecto que estás viendo es un **ejemplo perfecto** de un nodo profesional:
- **Arquitectura modular** - Código organizado y mantenible
- **Múltiples recursos** - Auth, Content, Video, Project
- **Propiedades avanzadas** - Campos condicionales y validación
- **Documentación completa** - README y ejemplos
- **Buenas prácticas** - TypeScript, ESLint, testing

**Estudia este código para aprender técnicas avanzadas:**
- `nodes/Vuela/` - Estructura modular
- `properties/` - Organización de propiedades
- `utils/apiHelpers.ts` - Helpers para APIs
- `credentials/` - Manejo de autenticación

---

*Esta guía fue creada por [VA360.pro](https://va360.pro) usando como ejemplo el nodo de [Vuela.ai](https://vuela.ai)*

*¿Quieres aprender más? Únete a nuestra comunidad en VA360.pro*
