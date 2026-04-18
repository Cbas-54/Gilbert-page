# Gilbert - Catálogo Digital & Panel de Administración

Este proyecto es una plataforma de catálogo digital para la marca **Gilbert**, que permite visualizar productos de cuero y deportes de manera dinámica, con una integración fluida con Google Sheets para la gestión de inventario.

## 🚀 Características

- **Catálogo Dinámico:** Renderizado en tiempo real de productos desde Google Sheets.
- **Panel de Administración:** Interfaz protegida para gestionar el catálogo (Agregar, Editar, Suspender, Eliminar).
- **Subida de Imágenes:** Integración con Cloudinary para gestión de multimedia.
- **Sincronización Instantánea:** Sistema de cache-busting para visualizar cambios de Google Sheets sin esperas.
- **Diseño Premium:** Estética minimalista y moderna con animaciones suaves.

## 🛠️ Tecnologías

- **Frontend:** React + Vite
- **Estilo:** Tailwind CSS + Framer Motion
- **Backend:** Google Apps Script (Servicio API)
- **Base de Datos:** Google Sheets (Hoja de cálculo)
- **Multimedia:** Cloudinary

## 📂 Estructura del Proyecto

- `/src/components`: Componentes reutilizables (UI, Layout, Features).
- `/src/pages`: Páginas principales (Inicio, Productos, Admin).
- `/src/services`: Lógica de conexión con APIs (Google Sheets, Cloudinary).

## ⚙️ Configuración del Panel de Admin

Para que el panel de administración funcione correctamente, se requiere:
1. Un script de Google Apps Script vinculado a la hoja de cálculo.
2. La columna 'ID' en Google Sheets configurada como **Texto sin formato**.
3. Un Upload Preset en Cloudinary configurado como **Unsigned**.

---
Desarrollado con ❤️ para Gilbert.
