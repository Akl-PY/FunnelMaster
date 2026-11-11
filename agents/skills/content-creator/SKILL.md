---
name: content-creator
description: Agente creador de contenidos orgánicos, secuencias de nutrición y maquetación de infoproductos (Instagram Reels, TikTok, carruseles educativos, secuencias de email de 5 días y prompts para Gamma.app).
allowed-tools: read_file write_file
---

# Content Creator Agent ✍️ — Atracción Orgánica, Nutrición por Email y Maquetación Editorial

Esta skill transforma la promesa, el dolor central y el Mecanismo Único de [`DATA.md`](../../../DATA.md) en un ecosistema completo de contenido orgánico y seguimiento automatizado por correo, 100% adaptado al nicho activo y bajo reglas estrictas Anti-LLM.

---

## 1. Batería de Guiones para Reels y TikTok con Disparo ManyChat (`social-reels-scripts.md`)

Genera 5 guiones verticales de alta retención (30-45 segundos) diseñados para convertir visualizaciones orgánicas en leads calificados:
- **Hook 0-3s (Interrupción de Patrón)**: Declaración contraintuitiva o diagnóstico visual del problema del avatar.
- **Micro-Valor Accionable**: Explicación rápida de 1 principio del Mecanismo Único sin regalar todo el sistema.
- **Call-To-Action Conversacional (Trigger ManyChat)**: Instrucción para comentar una palabra clave específica del nicho (ej.: `FOCO`, `SISTEMA`, `ALIVIO`, `PLAN`) y recibir el enlace al Test de Diagnóstico de 60 segundos por Mensaje Directo.

---

## 2. Carruseles Educativos de Alta Guardabilidad (`instagram-carousels.md`)

Diseña 3 carruseles de 8 láminas optimizados para el algoritmo de Instagram ("Guardar" y "Compartir"):
- **Lámina 1 (Portada Magnética)**: Titular de alto contraste que promete resolver una fricción aguda.
- **Láminas 2 y 3 (El Error Silencioso)**: Por qué lo que hace el 90% de las personas en este nicho empeora el síntoma.
- **Láminas 4 a 6 (El Nuevo Mecanismo en 3 Pasos)**: Diagrama práctico y aplicable hoy mismo.
- **Lámina 7 (Resumen / Cheat Sheet)**: Cuadro comparativo digno de guardar en favoritos.
- **Lámina 8 (CTA Directo)**: Invitación a comentar la palabra clave o entrar al diagnóstico del perfil.

---

## 3. Secuencia de Nutrición y Conversión por Email de 5 Días (`email-sequence-5days.md`)

Para los leads que completan el Quiz en `/quiz` pero no compran en el primer impacto, la skill genera una secuencia de 5 correos persuasivos (100% dinámica según el nicho activo):

- **Día 1 — Entrega de Diagnóstico + Victoria Rápida**: Análisis del resultado de su test y el primer ajuste de 5 minutos que puede aplicar hoy.
- **Día 2 — El Enemigo Común Desenmascarado**: Por qué los métodos convencionales le han hecho perder tiempo y energía, y cómo funciona realmente la raíz del problema.
- **Día 3 — El Mecanismo Único por Dentro**: Cómo la arquitectura de 3 fases resuelve el cuello de botella sin exigir horas libres ni fuerza de voluntad.
- **Día 4 — Caso de Estudio Real + Destrucción de Objeciones**: La historia de un perfil idéntico al avatar y cómo superó el escepticismo inicial.
- **Día 5 — Cierre de Pila de Valor + Garantía de 30 Días**: Resumen de los 4 bonos gratuitos + App móvil incluida y recordatorio de riesgo cero.

---

## 4. Super Prompt de Maquetación Editorial para Gamma.app / Nova Creator (`gamma-presentation-prompt.md`)

Genera un prompt técnico listo para pegar en **Gamma.app** o **Nova Creator** que estructura el producto principal en diapositivas o eBook interactivo con paleta cromática del arquetipo, tarjetas visuales, tablas de diagnóstico y checklists ejecutables.

---

## 5. Ejecución

```bash
node agents/skills/content-creator/scripts/generate-content.js
```
