# Memory Game PWA

Un juego de memoria desarrollado como Progressive Web App (PWA) usando LitElement y persistencia con IndexedDB.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/MohaJabri/memory-game-pwa.git
cd memory-game-pwa
```

2. Instala las dependencias:
```bash
npm install
```

## Desarrollo Local

Para ejecutar la aplicación en modo desarrollo:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:1234`

## Tests

Para ejecutar los tests:
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npm run test:components    # Tests de componentes
npm run test:services     # Tests de servicios
npm run test:utils        # Tests de utilidades

# Ejecutar tests en modo watch
npm run test:watch
```

## Construcción

Para construir la aplicación para producción:
```bash
npm run build
```

Los archivos generados se encontrarán en el directorio `dist/`.

## Servir la Versión de Producción

Para probar la versión de producción localmente:
```bash
npm run serve
```

La aplicación estará disponible en `http://localhost:8080`

## Estructura del Proyecto

```
memory-game-pwa/
├── src/
│   ├── components/       # Componentes LitElement
│   ├── services/        # Servicios (IndexedDB, etc.)
│   ├── tests/           # Tests
│   └── app.js           # Punto de entrada
├── public/
│   └── icon.png        # Icono de la aplicación
├── sw.js           # Service Worker
├── manifest.json    # Manifest para PWA
└── index.html          # HTML principal
```

## Características

- Progressive Web App (PWA)
- Interfaz construida con LitElement
- Persistencia de datos con IndexedDB
- Diseño responsive
- Funciona offline
- Tests unitarios

## Tecnologías Utilizadas

- LitElement
- IndexedDB
- Service Workers
- Bootstrap (estilos)
- Web Test Runner (testing)

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta los tests
- `npm run build`: Construye la aplicación para producción
- `npm run serve`: Sirve la versión de producción
- `npm run lint`: Ejecuta el linter
- `npm run deploy`: Despliega la aplicación en GitHub Pages

## Licencia

MIT