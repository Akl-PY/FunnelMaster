# ADR — Architecture Decision Records

Registro de decisiones arquitectónicas adoptadas para FunnelMaster.

---

## ADR-001: Estructura Modular de Skills en `agents/skills/`

- **Contexto**: El repositorio debe ser operado por diferentes agentes de IA (Antigravity, Claude Code, Devin, CLI runners) sin quedar atado a la sintaxis propietaria de una sola plataforma.
- **Decisión**: Centralizar las capacidades en `agents/skills/<skill-name>/` siguiendo la especificación estándar con `SKILL.md` (frontmatter YAML + instrucciones markdown claras + scripts ejecutables).
- **Consecuencias**: Portabilidad total, mantenibilidad y facilidad para incorporar nuevas habilidades (scraping, validación de landing pages, analítica, mensajería).

---

## ADR-002: Motor de Automatización Web con Playwright CLI y Wrapper

- **Contexto**: Los agentes necesitan explorar páginas web, validar formularios de conversión, auditar funnels de venta e interactuar con servicios externos consumiendo la menor cantidad posible de tokens y dependencias pesadas.
- **Decisión**: Emplear Playwright CLI orquestado a través del script wrapper `agents/skills/browser-automation/scripts/browser.js`.
- **Consecuencias**:
  - Evita sobrecarga de servidores MCP o extensiones de navegador invasivas.
  - Permite control fino de parámetros CLI y captura de snapshots DOM directos.

---

## ADR-003: Persistencia de Sesiones y Política Headless / Headed

- **Contexto**: Las auditorías y ejecuciones automáticas de funnels deben ser rápidas, pero algunos sitios exigen autenticación o resolución de desafíos interactivos.
- **Decisión**:
  - **Headless por defecto**: Máxima velocidad y bajo consumo de recursos para scraping, verificaciones HTTP y navegación básica.
  - **Headed condicional**: Activación de ventana visible cuando se requiere intervención del usuario (2FA, logins manuales o captchas).
  - **Directorio de perfil dedicado**: Todas las cookies y estado local se almacenan en `.browser-profile/` (excluido de git).
- **Consecuencias**: Seguridad de credenciales, rapidez operativa y soporte confiable para flujos con autenticación requerida.

---

## ADR-004: Separación de Lógica y Datos Sensibles

- **Contexto**: Los embudos manejan información de clientes, leads y métricas privadas de negocio.
- **Decisión**: El repositorio no contiene información personal identificable (PII) en control de versiones. Todas las configuraciones y accesos a bases de datos se leen desde variables de entorno (`.env`) y schemas estructurados descritos en `DATA.md`.
- **Consecuencias**: El repositorio es seguro para compartir, clonar o publicar sin riesgo de fuga de datos sensibles.

---

## ADR-005: Desacoplamiento Total de Nichos (Cero Hardcoding en Skills)

- **Contexto**: Un framework de funnels no debe estar restringido a un solo producto, nicho o campaña específica. Si los nichos se hardcodean en el código, el sistema pierde escalabilidad y se rompe al cambiar de cliente o industria.
- **Decisión**: Todas las skills y scripts son procesadores neutros. Los parámetros de nicho, nombres de ofertas, URLs de referencia y avatares se leen en tiempo de ejecución desde `DATA.md` (`active_niche`) o mediante argumentos de entrada.
- **Consecuencias**: El sistema es 100% reutilizable para cualquier nicho (fitness, espiritualidad, finanzas, software, infoproductos B2B/B2C).

---

## ADR-006: Verificación de Mercado en Tiempo Real vs. Datos Sintéticos

- **Contexto**: Los modelos de lenguaje tienden a inventar o extrapolar cifras ("este competidor tiene 80 anuncios activos y factura \$50k") si no se les impone una disciplina de validación empírica.
- **Decisión**: Las skills de validación (`niche-discovery`, `offer-reengineer`) deben realizar inspecciones en vivo mediante `browser-automation`. Toda afirmación sobre volumen de anuncios o páginas de venta debe estar respaldada por datos extraídos del DOM real de Meta Ads Library y de los sitios objetivo.
- **Consecuencias**: Cero decisiones de negocio basadas en alucinaciones o datos desactualizados. Se asegura que la oferta elegida sea verdaderamente ganadora en el mercado real.

---

## ADR-007: Validación Obligatoria Mediante Tests Automatizados

- **Contexto**: Los agentes autónomos generan código, copys, estructuras y configs que pueden romperse con modificaciones imprevistas o degradarse hacia alucinaciones y formatos inválidos.
- **Decisión**: Integrar un framework de testing nativo en Node.js (`node:test`) sin dependencias pesadas. Todas las skills y generadores deben tener tests asociados (`tests/*.test.js`) que validen schemas, ausencia de hardcoding, reglas Anti-LLM y generación de páginas.
- **Consecuencias**: Ciclo de feedback instantáneo y garantía de estabilidad sin intervención manual del usuario.
