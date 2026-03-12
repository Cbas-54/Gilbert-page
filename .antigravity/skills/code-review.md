---
name: Code Review
description: Revisión sistemática de código con checklist de calidad premium
---

# Code Review

Realiza una revisión de código siguiendo este checklist:

## Checklist

### Correctitud y Logica
- [ ] La lógica cumple con los requisitos del diseño.
- [ ] Los edge cases de UI están cubiertos.
- [ ] No hay bugs visuales obvios.

### Calidad Estetica (Premium Focus)
- [ ] Alineación y spacing consistentes.
- [ ] Uso de colores vibrantes y armónicos (no básicos).
- [ ] Tipografía moderna y legible.
- [ ] Micro-animaciones añadidas donde aportan valor.

### Codigo
- [ ] Nombrado claro y semántico en React.
- [ ] Componentes pequeños y con una sola responsabilidad.
- [ ] Sin código duplicado o estilos ad-hoc innecesarios.
- [ ] Sin imports no usados.

### Seguridad
- [ ] Sin secretos hardcodeados.
- [ ] Inputs de usuario (si existen) validados.

## Formato de salida
Para cada issue encontrado:
1. Archivo y línea
2. Severidad (crítico/medio/bajo)
3. Descripción del problema
4. Sugerencia de mejora
