# Publicación y base de datos

## Build estático

```bash
npm install
npm run test
npm run build
```

Publica el contenido de `dist/` en el hosting. El archivo de entrada es `dist/index.html`. Para una comprobación local:

```bash
npm run preview
```

La configuración de Astro crea rutas estáticas, minifica el CSS y deja los recursos locales listos para producción. No se requieren dependencias en el servidor.

## Reseñas compartidas entre visitantes

La versión actual guarda reseñas en el navegador con `localStorage`. Para compartirlas entre visitantes, crea la base con `docs/database.sql` y conecta el formulario a una API.

Endpoints sugeridos:

- `GET /api/reviews`: listar reseñas.
- `POST /api/reviews`: guardar nombre, correo, calificación, descripción y proyecto.
- `POST /api/contact`: guardar mensajes de contacto.

Nunca coloques credenciales de MySQL dentro de `src/pages/index.astro` o `public/script.js`; deben permanecer en el servidor mediante variables de entorno.
