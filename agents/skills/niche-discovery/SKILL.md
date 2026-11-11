---
name: niche-discovery
description: Descubre nichos emergentes de infoproductos y valida si son ofertas ganadoras comprobadas mediante análisis de volumen de anuncios en Meta Ads Library y tráfico. Úsala para los Pasos #1, #2, #3 y #4 del plan de 48 horas.
allowed-tools: Bash(node:*) Bash(npm:*) read_file write_file search_web
---

# Niche Discovery & Ad Spy Validation (Pasos #1 al #4 del Playbook de 48 Horas)

Esta skill ejecuta la investigación de mercado en tiempo real, el desglose de ángulos publicitarios y la validación empírica en la Biblioteca de Anuncios de Meta antes de construir cualquier activo del embudo.

---

## 1. Super Prompt Maestro — Paso #1: Investigación General del Mercado (Playbook 48hs)

Cuando el usuario solicita descubrir oportunidades de mercado o validar un sector, el agente aplica la directriz maestra del **Paso #1**:

> *"Actúa como un analista senior en tendencias de mercado digitales con más de 15 años de experiencia en marketing de respuesta directa, especializado en la creación y escalamiento de infoproductos millonarios. Estás al tanto de las tendencias más actuales (últimos 180 días) en plataformas como Google Trends, Meta Ads Library, TikTok Creative Center y marketplaces como Hotmart, Udemy, Gumroad y Amazon KDP.*
> *Necesito identificar oportunidades de mercado emergentes o en expansión, con alta demanda comprobada, fuerte intención de compra, alto volumen de búsqueda y audiencias dispuestas a invertir. Deben cumplir con:*
> 1. *Potencial de escalabilidad global y digital (entrega 100% digital e instantánea).*
> 2. *Tendencia de crecimiento comprobable en los últimos 180 días.*
> 3. *Ticket promedio saludable ($17 a $97 USD frontend) con posibilidad de Order Bump, Upsell o recurrencia.*
> 4. *Espacio para un nuevo ángulo de entrada innovador (Mecanismo Único).*
> 5. *Conexión emocional visceral con el avatar (dolor urgente, frustración diaria o deseo de transformación inmediata).*
> *Entrega para cada oportunidad: Nombre específico del sub-nicho, Tendencia detectada, Dolor visceral, Por qué es rentable hoy y Formato óptimo de producto (Sistema interactivo, Kit de plantillas, Protocolo guiado, App de bolsillo + Guía)."*

---

## 2. Super Prompt Maestro — Paso #2: Espionaje de Palabras Clave y Ángulos (Playbook 48hs)

Una vez elegido el sector o palabra clave abierta del usuario, la skill desglosa el mapa de espionaje publicitario siguiendo el **Paso #2**:

> *"Actúa como un especialista en inteligencia competitiva y análisis de campañas publicitarias de respuesta directa. Genera una matriz de palabras clave estratégicas y términos publicitarios de alto rendimiento para auditar este nicho en Meta Ads Library y TikTok Creative Center, segmentada en:*
> 1. *Palabras clave nucleares del nicho.*
> 2. *Síntomas y dolores cotidianos exactos que verbaliza el cliente.*
> 3. *Deseos inmediatos y resultados cuantificables prometidos.*
> 4. *Formatos de entregables de mayor conversión (checklists, plantillas, calculadoras, protocolos rápidos).*
> 5. *Ganchos disruptivos de primeros 3 segundos que están reteniendo la atención hoy."*

---

## 3. Reglas Estrictas de Descubrimiento Abierto (Regla #17)

- **Prohibido presentar menús prefabricados**: Jamás ofrecer listas estáticas ("Opción A, B, C, D").
- **Extracción 100% algorítmica**: Los términos de búsqueda en Meta Ads Library se extraen limpiando conectores de la consulta real del usuario o de las tendencias auditadas en vivo.
- **Cero datos inventados**: Si una búsqueda en Meta Ads Library devuelve menos de 3 anuncios activos, el nicho se marca como rechazado.

---

## 4. Matriz de Validación Empírica en Meta Ads Library (Pasos #3 y #4)

Para confirmar si una oferta vende todos los días, se audita el volumen de anuncios activos mediante `browser-automation`:

| Volumen de Anuncios Activos | Diagnóstico de Mercado | Veredicto | Acción Estratégica |
|---|---|---|---|
| **0 a 2 anuncios** | Sin tracción comercial | 🔴 **Rechazado** | Descartar ángulo; pivotar palabra clave. |
| **3 a 10 anuncios** | Fase de testeo inicial | 🟡 **En Prueba** | Analizar ganchos, pero buscar competidor más fuerte. |
| **10 a 30 anuncios** | **Vende todos los días** | 🟢 **Validado** | Luz verde para modelar y superar la oferta. |
| **30 a 100 anuncios** | **Oferta en escalamiento** | 🟢 **Escalado** | Demanda comprobada y flujo de caja alto. |
| **+100 anuncios activos** | **Super Ganadora (+$100k USD/mes)** | 🏆 **GANADOR ABSOLUTO** | **MODELAR DE INMEDIATO**. Pasar directo a `offer-reengineer`. |

---

## 5. Ejecución y Cadena de Datos (Handoff a `offer-reengineer`)

1. Ejecutar descubrimiento o auditoría puntual:
   ```bash
   node agents/skills/niche-discovery/scripts/discover.js
   node agents/skills/niche-discovery/scripts/audit-niche.js "<keyword>"
   ```
2. Persistir en SQLite (`niches`), `data/discovered_niches.json` y `DATA.md` (`active_niche`), entregando el dossier completo a la skill `offer-reengineer`.
