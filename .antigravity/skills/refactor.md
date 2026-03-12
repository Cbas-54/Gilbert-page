---
name: Refactor
description: Refactorización guiada manteniendo estética y funcionalidad
---

# Refactor

Guía para refactorizar código manteniendo el comportamiento y la excelencia visual.

## Proceso

1. **Analizar** - Identificar deuda técnica o áreas de mejora estética.
2. **Planificar** - Describir los cambios estructurales antes de ejecutarlos.
3. **Ejecutar** - Aplicar cambios incrementales.
4. **Verificar** - Asegurar que el diseño no se rompió mediante visualización.

## Code smells a buscar
- Componentes de más de 100 líneas.
- Lógica de negocio mezclada con JSX complejo.
- Clases de Tailwind de más de 3 niveles de profundidad sin abstractar.
- Código duplicado en componentes de UI.

## Reglas
- Nunca sacrificar la estética por simplicidad de código extrema.
- Mantener la accesibilidad (ARIA labels) durante el refactor.
- Extraer constantes de diseño (colores, sombras) si se repiten.
