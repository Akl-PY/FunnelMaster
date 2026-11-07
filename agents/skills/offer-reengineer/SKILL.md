---
name: offer-reengineer
description: Captura páginas de venta de competidores validados y aplica ingeniería inversa para rediseñar una oferta superior con nuevo mecanismo único, pila de bonos y gatillos de conversión (Pasos #5 y #6 del plan de 48h).
allowed-tools: Bash(node:*) read_file write_file
---

# Offer Re-Engineer (Pasos #5 y #6)

Esta skill toma la URL de la página de venta del competidor validado (obtenida en `DATA.md` o pasada como argumento), extrae su estructura completa usando `browser-automation` y rediseña una oferta superior, visceral y de alta conversión.

> [!IMPORTANT]
> **Regla de oro**: No hardcodear nichos ni inventar información de competidores. La URL de la página y el nicho deben leerse de `DATA.md` (`active_niche`) o recibirse por parámetro. La extracción debe provenir del DOM real del sitio.

---

## Flujo Operativo

### Fase 1: Captura e Inspección de la Página Ganadora (Paso #5)
1. Leer `DATA.md` para obtener `competitor_landing_url` del nicho activo.
2. Abrir la página usando el wrapper del navegador:
   ```bash
   node agents/skills/browser-automation/scripts/browser.js open "<competitor_landing_url>" --headless
   ```
3. Extraer el texto y estructura del DOM:
   ```bash
   node agents/skills/browser-automation/scripts/browser.js exec snapshot
   ```
4. Identificar los componentes clave de la oferta actual:
   - **Promesa principal**: ¿Qué transformación promete en el titular?
   - **Subpromesas y bullets**: ¿Qué beneficios específicos menciona?
   - **Mecanismo único actual** (si existe): ¿Con qué método o vehículo promete lograrlo?
   - **Avatar target**: ¿A quién le habla y qué dolor ataca?
   - **Gatillos mentales**: Autoridad, prueba social, escasez, garantía.
   - **Precio y bonos actuales**: Precio de entrada, descuentos y extras incluidos.

---

### Fase 2: Rediseño Estratégico de la Oferta (Paso #6)
Con los datos reales extraídos, reestructurar la oferta superando a la competencia en 4 dimensiones críticas:

1. **Mayor Conexión Emocional**:
   - Agregar storytelling empático y conexión visceral con el dolor reprimido del avatar.
   - Activar gatillos primarios (seguridad, estatus, control, pertenencia, certidumbre).
2. **Mayor Sofisticación (Mecanismo Único)**:
   - Crear un nombre propio y memorable para el método/sistema (ejemplo de estructura: *Protocolo [Nombre]™, Método [Nombre]™*).
   - Explicar **por qué** los métodos tradicionales han fallado y por qué este mecanismo nuevo sí funciona.
3. **Pila de Bonos Irresistibles**:
   - Diseñar entre 3 y 5 bonos complementarios de alto valor percibido que eliminen objeciones (plantillas, hojas de trabajo, checklists, masterclass extra).
   - Asignar un valor percibido monetario a cada bono para inflar el empilamiento de valor.
4. **Anclaje de Valor y Justificación de Precio**:
   - Contrastar el valor total acumulado (producto + bonos) frente al precio de oferta especial.
   - Llamado a la acción (CTA) con urgencia real o justificación emocional convincente.

---

## Salida y Persistencia en `DATA.md`

El resultado del rediseño debe presentarse estructurado y persistirse en `DATA.md` bajo `active_offer`:

```markdown
### Oferta Rediseñada: [Nombre del Producto]
- **Nicho**: Leído dinámicamente de DATA.md
- **Nueva Promesa Principal**: [Transformación concreta en X tiempo sin fricción Y]
- **Mecanismo Único**: [Nombre del Método con marca registrada ficticia/conceptual]
- **Pila de Bonos**:
  1. Bono 1: [Nombre] (Valor percibido: $XX) — Elimina objeción A
  2. Bono 2: [Nombre] (Valor percibido: $XX) — Acelera resultado B
  3. Bono 3: [Nombre] (Valor percibido: $XX) — Automatiza paso C
- **Precio Frontend Propuesto**: [$XX USD]
- **Garantía Incondicional**: [7 a 30 días de riesgo cero]
```
