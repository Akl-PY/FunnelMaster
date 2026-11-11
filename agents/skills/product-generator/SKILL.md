---
name: product-generator
description: Estructura y redacta los contenidos de infoproductos digitales (módulos, guías PDF, hojas de trabajo y entregables de bonos) a partir de la oferta y mecanismo único definidos en DATA.md (Paso #9 del plan de 48h).
allowed-tools: read_file write_file
---

# Product Generator — Creador de Infoproductos Accionables y Prompts para Gamma.app (Paso #9 del Playbook de 48hs)

Esta skill lee la oferta rediseñada y el Mecanismo Único desde `data/active_offer.json` y [`DATA.md`](../../../DATA.md) para construir todos los entregables digitales del producto principal y su pila de 4 bonos, además de exportar su versión lista para imprimir/PDF en `dist_html/`.

---

## 1. Super Prompt Maestro — Paso #9: Creación de Producto de Alto Impacto (Playbook 48hs / Nova Creator & Gamma)

La generación del contenido del producto obedece la directriz de diseño instruccional de respuesta directa:

> *"Actúa como un Diseñador Instruccional Senior y Especialista en Implementación Rápida. Crea el manual maestro del producto y cada uno de sus 4 bonos con enfoque 100% táctico y 'Zero Fluff' (cero relleno teórico). El comprador no quiere leer 200 páginas de historia; quiere abrir el documento y obtener una victoria medible en los primeros 15 minutos.*
> *Cada fase y cada bono debe incluir:*
> 1. *Diagnóstico inicial o autoevaluación puntuada.*
> 2. *Protocolo paso a paso con tiempos exactos de ejecución.*
> 3. *Plantillas listas para copiar/pegar, tablas comparativas de errores comunes vs. ejecución correcta y checklists de verificación.*
> 4. *Plan de contingencia ('Qué hacer en días de emergencia o falta de tiempo')."*

---

## 2. Reglas Anti-Genéricas de Contenido (Cero Hardcoding y Cero "21 Días" Forzado)

- **Prohibido mezclar industrias**: Ningún documento puede contener vestigios de otros nichos (cero referencias a hormonas, tiroides o espalda si el nicho activo es otro).
- **Fases Lógicas y Herramientas Tangibles**:
  - **Fase 1**: Auditoría de punto de partida, eliminación de fugas críticas y victoria en las primeras 24-48 horas.
  - **Fase 2**: Instalación paso a paso del **Mecanismo Único** con protocolos de mañana, tarde y cierre.
  - **Fase 3**: Automatización del sistema, prevención de recaídas y escalamiento de resultados.
- **Cada Bono es una Herramienta Independiente (Prohibido Clonar Contenido o Repetir Ejemplos de este `.md`)**:
  - ⚠️ **REGLA CRÍTICA (Regla #24)**: Los nombres de bonos listados a continuación son **ÚNICAMENTE EJEMPLOS ILUSTRATIVOS** de cómo diferenciar entregables. **Queda estrictamente prohibido usar estos mismos nombres de bonos en todos los nichos**. El generador siempre debe leer los títulos y propósitos reales definidos para el nicho activo en `data/active_offer.json` (`offer.bonuses`).
  - Queda terminantemente prohibido usar una misma plantilla de texto para los 4 bonos. Cada archivo en `products/<niche-slug>/bonuses/` debe desarrollar su propia herramienta especializada de alto valor percibido (por ejemplo, a modo meramente ilustrativo:
    1. *Ejemplo de Bono de Acción Rápida*: Secuencia cronometrada minuto a minuto + tabla de respuesta inmediata ante el síntoma agudo del nicho.
    2. *Ejemplo de Bono de Recursos / Plantillas*: Marcos de trabajo, guiones o recetas listas para copiar y rellenar según la actividad del cliente.
    3. *Ejemplo de Bono de Diagnóstico / Medición*: Test puntuado de 10 indicadores (0 a 100 puntos), ecuación de retorno y registro de evolución de 4 semanas.
    4. *Ejemplo de Bono de Continuidad / Casos Difíciles*: Sistema de 3 marchas operativas para días complicados y protocolo de prevención de abandono).

---

## 3. Entregables Físicos, Exportación a HTML/PDF y Publicación en `/funnel/public/docs`

1. Ejecutar el generador de producto:
   ```bash
   node agents/skills/product-generator/scripts/generate-product.js
   ```
2. Compilar las versiones maquetadas listas para descargar o guardar como PDF (`window.print()`) y publicarlas en `/funnel/public/docs/`:
   ```bash
   npm run export:docs
   ```
3. Archivos generados en `products/<niche-slug>/` y `/funnel/public/docs/`:
   - `master-guide.md` → `dist_html/master-guide.html` y `/funnel/public/docs/master-guide.html`
   - `bonuses/bono-1-*.md` ... `bono-4-*.md` → `dist_html/bono-1.html` ... `bono-4.html` y `/funnel/public/docs/bono-1.html` ... `bono-4.html` (accesibles directamente desde la App Móvil y la página de confirmación de compra).
