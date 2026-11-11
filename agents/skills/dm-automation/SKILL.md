---
name: dm-automation
description: Genera flujos de automatización para Instagram DMs y ManyChat. Captura leads desde comentarios de Reels y mensajes directos con entrega instantánea de enlaces y tags de segmentación.
allowed-tools: read_file write_file
---

# DM Automation Agent 💬 — Embudos Conversacionales para Instagram y ManyChat

Esta skill convierte la interacción orgánica y publicitaria en Instagram/WhatsApp en un flujo automatizado de captura de leads y ventas hacia `/quiz` y `/funnel`.

---

## 1. Arquitectura del Flujo Conversacional en 4 Nodos (`manychat-flow.json` y `manychat-guide.md`)

1. **Nodo 1 — Disparador Inteligente (Trigger)**:
   - Se activa cuando un usuario comenta la palabra clave del nicho en un Reel/Post, responde a una Historia o envía un Mensaje Directo.
2. **Nodo 2 — Respuesta Pública + Apertura en DM (0 segundos)**:
   - Respuesta automática al comentario para impulsar el algoritmo de Instagram + envío inmediato de un mensaje privado cálido y humano que valida el dolor principal del nicho.
3. **Nodo 3 — Micro-Compromiso y Entrega con UTMs**:
   - Entrega del acceso directo al **Test de Diagnóstico de 60 Segundos (`/quiz`)** y a la **Página de Ventas (`/funnel`)** inyectando parámetros de rastreo (`?utm_source=instagram&utm_medium=manychat_dm&utm_campaign=<slug>`).
   - Asignación automática de etiquetas de segmentación (`tag:lead_interesado`, `tag:<niche_slug>`).
4. **Nodo 4 — Seguimiento Inteligente a las 2 Horas (Smart Delay)**:
   - Verifica si el usuario hizo clic; si no completó el diagnóstico, envía un recordatorio conversacional de una línea destacando la victoria rápida que obtendrá.

---

## 2. Entregables de la Skill

- `automations/<niche-slug>/manychat-flow.json`: Esquema estructurado con nodos, textos, botones, delays y etiquetas listo para importar o replicar.
- `automations/<niche-slug>/manychat-guide.md`: Guía paso a paso en lenguaje sencillo (cero programación) para dejar la automatización activa en 5 minutos.

---

## 3. Ejecución

```bash
node agents/skills/dm-automation/scripts/generate-flows.js
```
