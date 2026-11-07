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
