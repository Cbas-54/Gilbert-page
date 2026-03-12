# Arquitectura: Pagina Gilbert

## Visión General
Aplicación web de una sola página (SPA) construida con React y Vite, diseñada para mostrar servicios profesionales con una estética premium.

## Componentes Principales

### Componentes (`src/components/`)
La UI se divide en tres categorías principales:
- **`layout/`**: Navbar, Footer y Layout general.
- **`common/`**: Componentes atómicos y reutilizables (ej. WhatsAppButton).
- **`features/`**: Secciones específicas del dominio (Home, Products, Location).

### Otros Módulos
- **`pages/`**: Vistas de alto nivel (Home, ProductsPage).
- **`services/`**: Lógica de obtención de datos.
- **`hooks/` & `utils/`**: Para lógica compartida y funciones de ayuda.

## Flujo de Desarrollo
1. Diseño en Figma/Inspiración.
2. Implementación de componentes en `src/components/`.
3. Auditoría de diseño mediante Skill `audit-design`.
4. Refactorización para mantenimiento.
