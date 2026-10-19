# BI LAB | Fundamentos de Business Intelligence

Proyecto educativo y visual con dos páginas: una para aprender fundamentos de Business Intelligence y otra para consultar un dashboard interactivo de la Liga Pro 2026 con datos mock.

## Estructura del proyecto

```text
/
├── index.html
├── dashboard.html
├── css/
│   ├── styles.css
│   ├── index.css
│   └── dashboard.css
├── js/
│   ├── main.js
│   ├── quiz.js
│   └── dashboard.js
├── img/
├── README.md
└── .gitignore
```

## Tecnologías

- HTML5
- CSS3 con variables
- JavaScript vanilla
- Bootstrap 5 vía CDN
- Chart.js vía CDN
- Google Fonts vía CDN

## Ejecutar en GitHub Codespaces

### Opción 1: servidor HTTP simple

```bash
cd /workspaces/Estiven_1negocio
python3 -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000
```

### Opción 2: Live Server

1. Instala la extensión Live Server en VS Code.
2. Abre la carpeta del proyecto.
3. Haz clic derecho en `index.html` y selecciona “Open with Live Server”.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. Abre la sección `Settings` del repositorio.
3. Entra en `Pages`.
4. Elige la rama principal y la carpeta raíz del sitio.
5. Guarda la configuración.
6. GitHub Pages generará una URL pública del proyecto.

## Personalización

- Para modificar el contenido teórico, trabaja en `index.html`.
- Para cambiar el cuestionario, edita `js/quiz.js`.
- Para modificar los datos del dashboard, ajusta `js/dashboard.js`.
- Para cambiar estilos, usa `css/styles.css`, `css/index.css` y `css/dashboard.css`.

## Nota de datos

El dashboard usa datos mock con fines educativos y no representa estadísticas oficiales de la Liga Pro.
