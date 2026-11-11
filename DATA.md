# FunnelMaster — Estado Operativo y Datos del Proyecto

Este archivo centraliza la información del nicho activo, ofertas rediseñadas, copys y métricas de validación. **Ninguna skill debe hardcodear valores fuera de este esquema.**

---

## 2. Nicho y Oferta Activa (`active_niche`)

- **Nicho Activo**: Finanzas Personales y Eliminación de Deudas
- **Avatar Target**: Profesionales y trabajadores independientes que ven su sueldo evaporarse cada mes en pagos de tarjeta, intereses y gastos invisibles
- **Dolor Principal**: asfixia financiera a mitad de mes, intereses bancarios que crecen sin control y frustración de cobrar el sueldo solo para pagar deudas sin capacidad de ahorro
- **Volumen de Anuncios Activos**: ~100 anuncios detectados en Meta Ads Library
- **Veredicto**: Oferta Escalada (scaled)
- **Acción Estratégica**: Demanda comprobada y flujo de caja alto. Modelar y superar la oferta con nuevo mecanismo.
- **Competidor / Landing de Referencia**: https://finanzas-personales-y-eliminacion-de-deudas.com/vsl
- **Fecha de Validación**: 2026-11-10T18:02:33.000Z

## 2.1 Oferta Rediseñada Activa (`active_offer`)

- **Producto**: Sistema Liquidez Soberana & Cero Deudas™
- **Nueva Promesa Transformadora**: Corta el sangrado de intereses bancarios, libera entre $300 y $650 USD al mes de tu mismo sueldo desde tus primeras 48 horas y liquida tus tarjetas en la mitad de tiempo sin usar planillas de Excel eternas
- **Mecanismo Único**: Arquitectura de Blindaje de Sueldo y Avalancha Inversa (ABAI)™
- **Enemigo Común Derribado**: Las planillas de presupuesto donde anotas cada café y el consejo bancario de pagar el mínimo, diseñados para mantenerte atrapado en intereses rotativos mientras te quedas sin efectivo el día 15 del mes
- **Precio Frontend**: $37 USD (Valor total acumulado: $237 USD - Descuento del 84%)
- **Garantía Incondicional**: 30 días de riesgo cero
- **Fases del Sistema**:
  - **Fase 1 · Primeras 48 Horas (Auditoría Forense de Fugas y Corte de Sangrado Bancario)**: Detecta y congela las 5 fugas silenciosas de tu tarjeta, comisiones ocultas y débitos automáticos, liberando tus primeros $150 a $300 USD de liquidez en el mismo fin de semana.
  - **Fase 2 · Días 3 al 7 (Instalación de la Arquitectura de Blindaje de Sueldo y Avalancha Inversa (ABAI)™)**: Divide tu ingreso en 4 Bóvedas Automáticas el día que cobras y aplica el acelerador matemático que destruye primero la deuda que más flujo mensual te roba.
  - **Fase 3 · Consolidación Permanente (Piloto Automático de Liquidez y Blindaje Anti-Deudas)**: Instala el ritual quincenal de 10 minutos que blinda tu fondo de paz mental y hace crecer tu excedente mes a mes sin depender de fuerza de voluntad ni privaciones extremas.
- **Pila de Bonos Mata-Objeciones**:
  1. **Guiones de Negociación Bancaria para Congelar Intereses y Quitas de Deuda** (Valor: $29 USD) — *Destruye objeción: “El banco me cobra tasas impagables y no sé cómo negociar un plan fijo sin que me rechacen”* — Plantillas palabra por palabra para hablar con el área de retención y cobranzas del banco, frenar la bola de nieve de intereses rotativos y conseguir quitas o tasas fijas en una llamada de 15 minutos.
  2. **Kit de Automatización de Sueldo en 4 Bóvedas (Sin Excel ni Anotar Gastos Diarios)** (Valor: $37 USD) — *Destruye objeción: “Odio anotar cada gasto hormiga en hojas de cálculo y siempre abandono al cuarto día”* — Configuración paso a paso de 4 cuentas o subcuentas automáticas que separan tu liquidez vital, tu cuota de desendeudamiento y tu margen libre el mismo día que cobras.
  3. **Simulador Matemático de Liquidación Acelerada: Bola de Nieve vs. Avalancha Inversa** (Valor: $27 USD) — *Destruye objeción: “Tengo varias tarjetas y préstamos a la vez y no sé a cuál inyectarle dinero primero”* — Matriz de priorización exacta para ordenar tus deudas por costo financiero total y liberar flujo de caja mensual desde los primeros 30 días.
  4. **Protocolo de Blindaje para Meses de Vacas Flacas, Imprevistos o Ingresos Variables** (Valor: $47 USD) — *Destruye objeción: “¿Qué hago si cobro comisiones variables o me surge una urgencia a mitad de mes?”* — El sistema de 3 marchas financieras (Mes de Abundancia, Mes Estándar y Modo Escudo de Emergencia) para no volver a endeudarte con la tarjeta cuando aparece un gasto inesperado.

## 3. Variables de Entorno y Configuración
- Base de Datos: `data/funnel_master.db` (SQLite activa)
