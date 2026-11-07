---
name: dm-automation
description: Genera flujos de automatización para Instagram DMs y ManyChat. Captura leads desde comentarios de Reels y mensajes directos con entrega instantánea de enlaces y tags de segmentación.
allowed-tools: read_file write_file
---

# DM Automation Agent (ManyChat & Instagram Direct) 💬

Esta skill genera los flujos de mensajería directa y automatización de comentarios para Instagram y WhatsApp a través de ManyChat.

---

## 1. Disparadores Soportados (Triggers)
- **Palabra clave en comentarios**: Comentarios con palabras como `RESET`, `SUEÑO` o `GUIA` en Reels y publicaciones.
- **Mensaje directo (DM)**: El usuario escribe directamente al perfil pidiendo la guía o el quiz.
- **Mención en Stories**: Respuesta automática de agradecimiento con enlace al test diagnóstico.

## 2. Flujo de Conversación
1. **Paso 1 (Inmediato - 0s)**: Mensaje privado amigable confirmando la solicitud.
2. **Paso 2 (Filtro / Calificación)**: Pregunta rápida de segmentación o solicitud de email.
3. **Paso 3 (Entrega del Enlace)**: Envío del enlace hacia la landing page o el quiz con etiquetas UTM dinámicas (`utm_source=instagram&utm_medium=dm_automation`).
4. **Paso 4 (Follow-up a las 2 horas)**: Recordatorio automático si el usuario no ha abierto el enlace.
