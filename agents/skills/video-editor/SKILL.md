---
name: video-editor
description: Editor y procesador automatizado de video para anuncios y reels verticales 9:16 mediante FFmpeg. Agrega ganchos de texto, subtítulos, barras de progreso y adapta formatos para Meta Ads y TikTok.
allowed-tools: Bash(node:*) Bash(ffmpeg:*) read_file write_file edit_file
---

# Video Editor con FFmpeg 🎬 — Ingeniería de Creativos Verticales 9:16 de Alta Retención

Esta skill automatiza la producción y edición de creativos publicitarios en formato vertical (`1080x1920`, `9:16`) para Meta Ads (Reels/Stories) y TikTok mediante **FFmpeg**, inyectando los ganchos persuasivos del nicho activo.

---

## 1. Arquitectura de Video de Respuesta Directa (9:16 Safe Zones)

Todo video procesado o script de renderizado generado por esta skill respeta la anatomía de anuncios ganadores:

1. **Detección Automática del Motor FFmpeg**:
   - Localiza el binario de FFmpeg en el sistema o utiliza automáticamente el binario integrado de Playwright Chromium sin pedir instalaciones manuales al usuario.
2. **Banner de Hook Superior en Zona Segura (`y=200px - 380px`)**:
   - Sobreimprime el gancho de interrupción de patrón de los primeros 3 segundos con caja de alto contraste y tipografía legible en móviles, evitando las zonas tapadas por la interfaz de Instagram/TikTok.
3. **Reencuadre Inteligente 16:9 → 9:16 (`crop=ih*9/16:ih`)**:
   - Convierte grabaciones horizontales o de escritorio al formato vertical nativo de anuncios móviles a `30fps` con codificación `H.264 (libx264)` y audio `AAC 128kbps`.
4. **Barra de Progreso de Retención Visual**:
   - Incorpora una barra de avance inferior con el color de acento del arquetipo del nicho para mantener al espectador hasta el llamado a la acción final.

---

## 2. Entregables Generados en `traffic/videos/`

- `render-creatives.ps1` y `render-creatives.sh`: Scripts de procesamiento por lotes con los 5 ganchos reales extraídos de la oferta activa.
- `ffmpeg-guide.md`: Manual práctico con los comandos exactos para procesar videos crudos y un video de prueba renderizado automáticamente cuando el binario está presente.

---

## 3. Ejecución

```bash
node agents/skills/video-editor/scripts/video-editor.js
```
