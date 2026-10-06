# Publicación y base de datos

## Sitio estático

La página actual no necesita compilación. Para publicarla:

1. Sube `index.html`, `styles.css`, `script.js` y la carpeta `assets/`.
2. Verifica que el servidor entregue `index.html` como página inicial.
3. Abre la URL en escritorio y móvil.
4. Comprueba el botón `EN` y el formulario de reseñas.

## Reseñas compartidas entre visitantes

La versión directa guarda reseñas en el navegador con `localStorage`. Para guardar datos de todos los visitantes, crea la base con `docs/database.sql` y conecta el formulario a una API.

Endpoints sugeridos:

- `GET /api/reviews`: listar reseñas.
- `POST /api/reviews`: guardar nombre, correo, calificación, descripción y proyecto.
- `POST /api/contact`: guardar mensajes de contacto.

Nunca coloques las credenciales de MySQL dentro de `index.html` o `script.js`. Deben permanecer en el servidor mediante variables de entorno.
