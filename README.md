# Guacamaya Analytics

Sitio de presentación del equipo. Construido con **Next.js 16** (App Router, React 19)
y desplegado en Vercel.

> Datos que vuelan alto

## Requisitos

- Node.js 20.9 o superior (probado en Node 24)
- npm

## Puesta en marcha

```bash
npm install     # instala dependencias
npm run dev     # desarrollo con recarga automática en http://localhost:3000
```

Para producción:

```bash
npm run build   # genera el build optimizado en .next/
npm start       # levanta el servidor en modo producción
```

El puerto se cambia con la variable de entorno `PORT`:

```bash
PORT=4000 npm run dev
```

## Estructura

```
app/                 páginas y estilos globales (App Router de Next.js)
  layout.jsx         estructura común: fuentes, metadatos, barra y pie
  page.jsx           contenido de la página única
  globals.css        sistema de diseño completo (variables, secciones, responsive)
  api/               rutas de la API (route handlers)

components/          componentes de React
  Topbar.jsx         barra superior con menú móvil
  Cover.jsx          portada con animación de entrada escalonada
  TeamMember.jsx     tarjeta de cada integrante
  Reveal.jsx         revelado de elementos al entrar en pantalla
  ScrollProgress.jsx barra de progreso de lectura
  SiteFooter.jsx     pie de página

data/team.js         fuente única de datos del equipo
public/assets/       imágenes (logo y caricaturas)
```

## API

| Método | Ruta              | Descripción                                  |
| ------ | ----------------- | -------------------------------------------- |
| GET    | `/api/health`     | Estado del servicio y tiempo activo           |
| GET    | `/api/site`       | Nombre, eslogan y descripción del equipo      |
| GET    | `/api/team`       | Listado completo de integrantes               |
| GET    | `/api/team/:slug` | Un integrante concreto, o 404 si no existe    |

Ejemplo:

```bash
curl http://localhost:3000/api/team/emiliano-serna
```

## Cómo editar el contenido

Los datos del equipo están en un solo archivo: `data/team.js`. Al cambiar un nombre,
un rol o una descripción ahí, se actualizan a la vez la página, el pie y la API.
Para añadir un integrante basta con agregar un objeto más al arreglo; la alternancia
izquierda/derecha de las tarjetas se calcula sola.

Los colores, tipografías y espaciados viven como variables CSS al inicio de
`app/globals.css`.
