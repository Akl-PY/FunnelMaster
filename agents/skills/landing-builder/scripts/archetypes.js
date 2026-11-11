/**
 * archetypes.js — Motor de Arquetipos Visuales y Componentes Especiales por Nicho.
 * Garantiza que cada embudo tenga una identidad gráfica, paleta cromática,
 * tipografía, sección especializada y preguntas de quiz 100% únicas.
 */

function detectNicheArchetype(nicheName = '', avatar = '', pain = '') {
  const text = `${nicheName} ${avatar} ${pain}`.toLowerCase();

  if (text.includes('lumbar') || text.includes('espalda') || text.includes('postur') || text.includes('ergonom')) {
    return 'biomechanical_ergonomics';
  }
  if (text.includes('hormon') || text.includes('menopaus') || text.includes('mujer') || text.includes('femenin')) {
    return 'serene_clinical_organic';
  }
  if (text.includes('video') || text.includes('creador') || text.includes('capcut') || text.includes('reels')) {
    return 'creator_studio_neon';
  }
  if (text.includes('perro') || text.includes('canin') || text.includes('mascota')) {
    return 'warm_earth_pets';
  }
  if (text.includes('financ') || text.includes('deuda') || text.includes('ahorro') || text.includes('sueldo') || text.includes('liquidez')) {
    return 'wealth_sovereignty';
  }
  if (text.includes('automatiz') || text.includes('no-code') || /\bia\b/.test(text) || text.includes('pyme')) {
    return 'fintech_tech_minimalist';
  }
  return 'high_performance_universal';
}

const ARCHETYPES = {
  biomechanical_ergonomics: {
    id: 'biomechanical_ergonomics',
    name: 'Biomechanical Engineering & Ergonomic Precision',
    badge: 'Protocolo de Biomecánica Ocupacional',
    colors: {
      bgMain: '#080E1A',
      bgCard: '#0F1A2E',
      borderCard: '#1E2F4D',
      accentPrimary: '#00D2FF',      // Cian eléctrico
      accentGradientFrom: '#00D2FF',
      accentGradientTo: '#0077FF',  // Cobalto intenso
      accentGlow: 'rgba(0, 210, 255, 0.3)',
      textPrimary: '#F1F5F9',
      textSecondary: '#94A3B8',
      urgencyAccent: '#38BDF8'
    },
    specialSectionName: 'PressureMapSection.astro',
    specialSectionTitle: 'Comparativa de Presión Intradiscal (L4-L5)',
    specialSectionSubtitle: 'Por qué tu silla actual está multiplicando la carga sobre tus discos intervertebrales:',
    specialMetrics: [
      { label: 'Estar de Pie (Referencia)', value: '100 kg de presión', status: 'normal', color: 'text-slate-400' },
      { label: 'Sentado con Buena Postura', value: '140 kg de presión (+40%)', status: 'elevado', color: 'text-amber-400' },
      { label: 'Sentado Encorvado sobre Teclado', value: '190 kg de presión (+90%)', status: 'crítico', color: 'text-rose-400' },
      { label: 'Con Micro-Descompresión MDAP™', value: '75 kg de presión (-25%)', status: 'alivio', color: 'text-cyan-400' }
    ],
    quizQuestions: [
      {
        id: 'q1',
        title: '1. ¿En qué momento de tu jornada frente a la pantalla comienza la rigidez lumbar?',
        options: [
          { text: 'A las 2 o 3 horas de iniciar el trabajo, como una punzada sorda.', score: 10 },
          { text: 'Únicamente al final de la jornada cuando me levanto de la silla.', score: 6 },
          { text: 'Casi desde que me despierto, antes de sentarme.', score: 8 }
        ]
      },
      {
        id: 'q2',
        title: '2. ¿Cómo suele ser tu postura habitual tras varias horas programando o redactando?',
        options: [
          { text: 'Hombros caídos hacia adelante y pelvis deslizada hacia el borde del asiento.', score: 10 },
          { text: 'Cruzo una pierna bajo el cuerpo o me apoyo sobre un solo lado.', score: 7 },
          { text: 'Intento mantener la espalda recta pero termino con ardor entre los omóplatos.', score: 6 }
        ]
      },
      {
        id: 'q3',
        title: '3. ¿Has sentido adormecimiento o dolor que desciende hacia el glúteo o la pierna?',
        options: [
          { text: 'Sí, un cosquilleo o pinchazo eléctrico hacia la pierna (posible ciática).', score: 10 },
          { text: 'Solo dolor sordo y tensión muscular concentrada en la zona lumbar baja.', score: 6 },
          { text: 'No, únicamente sensación de agarrotamiento al ponerme de pie.', score: 4 }
        ]
      },
      {
        id: 'q4',
        title: '4. ¿Qué soluciones has intentado hasta el momento?',
        options: [
          { text: 'Compré un cojín o cambié de silla, pero la molestia reaparece al rato.', score: 8 },
          { text: 'Tomo analgésicos o antiinflamatorios cuando no aguanto más.', score: 9 },
          { text: 'Hago estiramientos aleatorios que a veces me alivian y a veces empeoran el dolor.', score: 7 }
        ]
      },
      {
        id: 'q5',
        title: '5. ¿Cuánto tiempo real tienes para dedicar a tu descompresión diaria?',
        options: [
          { text: 'Entre 5 y 10 minutos desde mi propia silla o espacio de trabajo.', score: 10 },
          { text: '15 minutos por la mañana o al terminar mi jornada.', score: 8 },
          { text: 'Solo necesito secuencias SOS de 3 minutos para emergencias en medio de llamadas.', score: 9 }
        ]
      }
    ]
  },

  serene_clinical_organic: {
    id: 'serene_clinical_organic',
    name: 'Serene Clinical Organic Glow',
    badge: 'Protocolo de Medicina Funcional Integrativa',
    isLight: true,
    colors: {
      bgMain: '#F8FAF9',
      bgCard: '#FFFFFF',
      borderCard: '#DCE7E1',
      accentPrimary: '#0D9488',      // Esmeralda / Menta clínica
      accentGradientFrom: '#0D9488',
      accentGradientTo: '#10B981',
      accentGlow: 'rgba(13, 148, 136, 0.2)',
      textPrimary: '#132E27',
      textSecondary: '#4A6B62',
      urgencyAccent: '#D97706'
    },
    specialSectionName: 'HormoneTimelineSection.astro',
    specialSectionTitle: 'La Curva de Fluctuación Hormonal Femenina (+35 Años)',
    specialSectionSubtitle: 'Lo que los análisis de laboratorio convencionales no muestran sobre tus síntomas:',
    specialMetrics: [
      { label: 'Progesterona a los 35-45 años', value: 'Caída de hasta el 75%', status: 'déficit', color: 'text-rose-400' },
      { label: 'Resistencia a la Insulina', value: 'Elevación de picos postprandiales', status: 'inflamación', color: 'text-amber-400' },
      { label: 'Cortisol Nocturno (3:00 AM)', value: 'Pico invertido causante de insomnio', status: 'desvelo', color: 'text-rose-300' },
      { label: 'Con Sincronización SMPF™', value: 'Restauración del ritmo circadiano', status: 'óptimo', color: 'text-emerald-400' }
    ],
    quizQuestions: [
      {
        id: 'q1',
        title: '1. ¿Cómo te sientes al despertar por la mañana en un día habitual?',
        options: [
          { text: 'Agotada, como si no hubiera dormido nada aunque pasé 8h en cama.', score: 10 },
          { text: 'Regular, necesito café inmediato para poder arrancar el día.', score: 6 },
          { text: 'Con energía natural y mente despejada.', score: 2 }
        ]
      },
      {
        id: 'q2',
        title: '2. ¿Qué ocurre con tu digestión y tu vientre tras comer?',
        options: [
          { text: 'Inflamación notable e inmediata, la ropa me aprieta por la tarde.', score: 10 },
          { text: 'Pesadez estomacal y somnolencia fuerte.', score: 6 },
          { text: 'Digestión ligera y rápida.', score: 2 }
        ]
      },
      {
        id: 'q3',
        title: '3. ¿Sueles despertarte en mitad de la noche (especialmente entre las 2:00 y las 4:00 AM)?',
        options: [
          { text: 'Sí, casi todas las noches con calor o sensación de alerta.', score: 10 },
          { text: 'A veces, tardo más de 45 minutos en volver a conciliar el sueño.', score: 7 },
          { text: 'Rara vez, duermo continuo.', score: 2 }
        ]
      },
      {
        id: 'q4',
        title: '4. ¿Cómo ha respondido tu cuerpo a las dietas restrictivas últimamente?',
        options: [
          { text: 'El peso no se mueve y solo consigo más fatiga e irritabilidad.', score: 10 },
          { text: 'Bajo poco y lo recupero de inmediato (efecto rebote).', score: 8 },
          { text: 'No hago dietas restrictivas.', score: 3 }
        ]
      },
      {
        id: 'q5',
        title: '5. ¿Qué te han dicho tus médicos en las revisiones recientes?',
        options: [
          { text: '"Tus análisis están normales, es la edad o el estrés".', score: 10 },
          { text: 'Me recetaron pastillas para dormir o antidepresivos suaves.', score: 8 },
          { text: 'Aún no me he realizado chequeos recientes.', score: 5 }
        ]
      }
    ]
  },

  creator_studio_neon: {
    id: 'creator_studio_neon',
    name: 'Creator Studio Cyber Neon',
    badge: 'Laboratorio de Algoritmos y Retención Visual',
    colors: {
      bgMain: '#070510',
      bgCard: '#110C22',
      borderCard: '#2B1E4A',
      accentPrimary: '#A855F7',      // Púrpura eléctrico
      accentGradientFrom: '#A855F7',
      accentGradientTo: '#EC4899',  // Rosa neón
      accentGlow: 'rgba(168, 85, 247, 0.35)',
      textPrimary: '#FAF5FF',
      textSecondary: '#C084FC',
      urgencyAccent: '#F43F5E'
    },
    specialSectionName: 'RetentionCurveSection.astro',
    specialSectionTitle: 'Anatomía de la Curva de Retención de 3 Segundos',
    specialSectionSubtitle: 'Por qué tus videos caen en picada antes de los 5 segundos según datos de TikTok Creative Center:',
    specialMetrics: [
      { label: 'Video Promedio sin Hook Visual', value: '82% abandono al segundo 2.8', status: 'flop', color: 'text-rose-400' },
      { label: 'Video con Hook Estándar Hablado', value: '45% de retención al segundo 5', status: 'regular', color: 'text-amber-400' },
      { label: 'Edición con Patrón de Interrupción Dinámica', value: '78% retención hasta el CTA final', status: 'viral', color: 'text-purple-400' }
    ],
    quizQuestions: [
      {
        id: 'q1',
        title: '1. ¿En qué rango de reproducciones se estancan la mayoría de tus publicaciones?',
        options: [
          { text: 'En la barrera de las 200 a 500 vistas (cárcel del algoritmo).', score: 10 },
          { text: 'Llegan a 1.000 o 2.000 pero nunca convierten seguidores en clientes.', score: 7 },
          { text: 'Varía mucho, no tengo consistencia.', score: 6 }
        ]
      },
      {
        id: 'q2',
        title: '2. ¿Cuánto tiempo tardas actualmente en editar un Reel o TikTok de 30 segundos?',
        options: [
          { text: 'Más de 2 o 3 horas buscando música, b-rolls y subtítulos a mano.', score: 10 },
          { text: 'Alrededor de 1 hora, pero el resultado parece genérico.', score: 7 },
          { text: 'Menos de 20 minutos, pero sin efectos de retención.', score: 5 }
        ]
      },
      {
        id: 'q3',
        title: '3. ¿Qué software o herramienta utilizas principalmente?',
        options: [
          { text: 'CapCut en el móvil o escritorio.', score: 8 },
          { text: 'Premiere Pro / After Effects pero me parece demasiado lento.', score: 8 },
          { text: 'Grabo directamente en la app de Instagram/TikTok sin edición.', score: 9 }
        ]
      },
      {
        id: 'q4',
        title: '4. ¿Cuál es tu objetivo comercial prioritario?',
        options: [
          { text: 'Ofrecer servicios de edición a creadores o marcas por $500-$1.500 USD/mes.', score: 10 },
          { text: 'Vender mis propios productos/servicios a través de videos virales.', score: 9 },
          { text: 'Crecer mi marca personal de forma orgánica.', score: 7 }
        ]
      },
      {
        id: 'q5',
        title: '5. ¿Cuentas con plantillas prediseñadas de transiciones y efectos de sonido?',
        options: [
          { text: 'No, siempre empiezo desde una línea de tiempo vacía.', score: 10 },
          { text: 'Tengo algunos audios guardados pero desordenados.', score: 7 },
          { text: 'Sí, pero no sé cómo estructurar los primeros 3 segundos.', score: 8 }
        ]
      }
    ]
  },

  warm_earth_pets: {
    id: 'warm_earth_pets',
    name: 'Warm Earth & Veterinary Trust',
    badge: 'Protocolo de Bienestar y Etología Positiva',
    isLight: true,
    colors: {
      bgMain: '#FAF6F0',
      bgCard: '#FFFFFF',
      borderCard: '#E8DEC8',
      accentPrimary: '#D97706',      // Ámbar / Caramelo cálido
      accentGradientFrom: '#D97706',
      accentGradientTo: '#EA580C',
      accentGlow: 'rgba(217, 119, 6, 0.2)',
      textPrimary: '#292017',
      textSecondary: '#6B5A4B',
      urgencyAccent: '#DC2626'
    },
    specialSectionName: 'BehaviorMatrixSection.astro',
    specialSectionTitle: 'Matriz de Disparadores de Ansiedad por Separación',
    specialSectionSubtitle: 'Cómo interpreta tu perro cada una de tus acciones antes de cruzar la puerta:',
    specialMetrics: [
      { label: 'Coger las llaves o ponerte los zapatos', value: 'Disparo de taquicardia inmediata', status: 'alerta', color: 'text-amber-400' },
      { label: 'Despedidas efusivas con caricias', value: 'Multiplica la sensación de abandono', status: 'error común', color: 'text-rose-400' },
      { label: 'Con Protocolo de Desensibilización', value: 'Calma basal sin ladridos destructivos', status: 'equilibrio', color: 'text-emerald-400' }
    ],
    quizQuestions: [
      {
        id: 'q1',
        title: '1. ¿Qué hace tu perro en los primeros 10 minutos cuando te vas de casa?',
        options: [
          { text: 'Ladridos continuos, aullidos o rasca la puerta de entrada.', score: 10 },
          { text: 'Se queda inquieto recorriendo la casa y no toca su comida.', score: 7 },
          { text: 'Se echa a descansar con tranquilidad.', score: 2 }
        ]
      },
      {
        id: 'q2',
        title: '2. ¿Has recibido quejas de vecinos o notificaciones por ruidos molestos?',
        options: [
          { text: 'Sí, vecinos molestos o amenazas de la administración del edificio.', score: 10 },
          { text: 'No aún, pero temo que los vecinos empiecen a quejarse.', score: 7 },
          { text: 'Vivo en casa independiente.', score: 3 }
        ]
      },
      {
        id: 'q3',
        title: '3. ¿Ha mostrado conductas destructivas con muebles o ropa?',
        options: [
          { text: 'Muerde puertas, molduras o destroza cojines y zapatos.', score: 10 },
          { text: 'Hace sus necesidades dentro aunque esté educado.', score: 8 },
          { text: 'Solo llora pero no destruye objetos.', score: 6 }
        ]
      },
      {
        id: 'q4',
        title: '4. ¿Cómo son tus salidas diarias habitualmente?',
        options: [
          { text: 'Siento una culpa tremenda y me despido dándole muchos abrazos.', score: 8 },
          { text: 'Intento salir a escondidas para que no se dé cuenta.', score: 7 },
          { text: 'Salgo de forma neutra pero igual se altera.', score: 9 }
        ]
      },
      {
        id: 'q5',
        title: '5. ¿Cuánto tiempo se queda solo habitualmente?',
        options: [
          { text: 'Más de 6 u 8 horas seguidas por mi jornada de trabajo.', score: 10 },
          { text: 'De 2 a 4 horas intermitentes.', score: 7 },
          { text: 'Menos de 2 horas (trabajo desde casa o tengo apoyo).', score: 5 }
        ]
      }
    ]
  },

  fintech_tech_minimalist: {
    id: 'fintech_tech_minimalist',
    name: 'Executive Fintech & High-Tech Minimalist',
    badge: 'Framework de Eficiencia y Automatización No-Code',
    colors: {
      bgMain: '#0A0E17',
      bgCard: '#111827',
      borderCard: '#1F2937',
      accentPrimary: '#10B981',      // Verde esmeralda terminal
      accentGradientFrom: '#10B981',
      accentGradientTo: '#06B6D4',
      accentGlow: 'rgba(16, 185, 129, 0.25)',
      textPrimary: '#F9FAFB',
      textSecondary: '#9CA3AF',
      urgencyAccent: '#F59E0B'
    },
    specialSectionName: 'RoiCalculatorSection.astro',
    specialSectionTitle: 'Calculadora de Ahorro Operativo Semanal',
    specialSectionSubtitle: 'El costo oculto de seguir procesando tareas repetitivas a mano en tu negocio:',
    specialMetrics: [
      { label: 'Tiempo Manual en Tareas Administrativas', value: '15.4 horas / semana perdidas', status: 'fuga', color: 'text-rose-400' },
      { label: 'Costo por Hora Hombre Dedicado a Data-Entry', value: '$25 USD / hora promedio', status: 'gasto', color: 'text-amber-400' },
      { label: 'Ahorro Mensual con Automatización Make/IA', value: '+$1.540 USD / mes en productividad', status: 'retorno', color: 'text-emerald-400' }
    ],
    quizQuestions: [
      {
        id: 'q1',
        title: '1. ¿Cuántas horas a la semana dedicas a copiar datos entre hojas de cálculo y correos?',
        options: [
          { text: 'Más de 10 horas semanales que me roban tiempo de ventas.', score: 10 },
          { text: 'Entre 5 y 10 horas semanales.', score: 7 },
          { text: 'Menos de 5 horas.', score: 3 }
        ]
      },
      {
        id: 'q2',
        title: '2. ¿Qué herramientas utilizas actualmente en tu operativa diaria?',
        options: [
          { text: 'WhatsApp, Gmail, Excel/Sheets y Notion de forma desconectada.', score: 10 },
          { text: 'Uso un CRM pero la mitad de los datos se ingresan a mano.', score: 8 },
          { text: 'Tengo algunas conexiones básicas con Zapier que fallan seguido.', score: 6 }
        ]
      },
      {
        id: 'q3',
        title: '3. ¿Tienes experiencia en programación o código?',
        options: [
          { text: 'Cero código, necesito soluciones visuales de arrastrar y soltar.', score: 10 },
          { text: 'Conocimientos básicos pero me cuesta depurar errores en APIs.', score: 7 },
          { text: 'Sé programar pero no tengo tiempo de mantener servidores.', score: 5 }
        ]
      },
      {
        id: 'q4',
        title: '4. ¿Qué proceso te genera mayor cuello de botella?',
        options: [
          { text: 'Responder leads de WhatsApp y redes fuera de horario comercial.', score: 10 },
          { text: 'Generación y envío de presupuestos o facturas a clientes.', score: 8 },
          { text: 'Seguimiento de clientes que no cierran la compra.', score: 9 }
        ]
      },
      {
        id: 'q5',
        title: '5. ¿En cuánto tiempo necesitas tener tus flujos operativos?',
        options: [
          { text: 'En menos de 48 horas con plantillas listas para clonar.', score: 10 },
          { text: 'En 1 o 2 semanas.', score: 7 },
          { text: 'No tengo urgencia inmediata.', score: 4 }
        ]
      }
    ]
  },

  wealth_sovereignty: {
    id: 'wealth_sovereignty',
    name: 'Executive Wealth Sovereignty & Cashflow Architecture',
    badge: 'Ingeniería de Liquidez y Desbloqueo Patrimonial',
    isLight: false,
    colors: {
      bgMain: '#050D0A',
      bgCard: '#0C1A15',
      borderCard: '#18382E',
      accentPrimary: '#10B981',      // Esmeralda soberano
      accentGradientFrom: '#10B981',
      accentGradientTo: '#F59E0B',  // Oro cepillado
      accentGlow: 'rgba(16, 185, 129, 0.32)',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      urgencyAccent: '#F59E0B'
    },
    specialSectionName: 'CashflowMatrixSection.astro',
    specialSectionTitle: 'Radiografía de Fugas de Liquidez e Interés Compuesto Bancario',
    specialSectionSubtitle: 'Por qué tu sueldo desaparece en los primeros 10 días del mes aunque trabajes más horas:',
    specialMetrics: [
      { label: 'Drenaje por Pagos Mínimos y Gastos Hormiga', value: '34% del ingreso neto mensual perdido', status: 'fuga crítica', color: 'text-rose-400' },
      { label: 'Primeras 48 Horas (Auditoría de Sangrado)', value: 'Corte inmediato de suscripciones y fugas invisibles', status: 'liquidez', color: 'text-amber-400' },
      { label: 'Con Arquitectura de Liquidez Activa', value: '+$380 a $850 USD/mes liberados sin ganar más', status: 'superávit', color: 'text-emerald-400' }
    ],
    quizQuestions: [
      {
        id: 'q1',
        title: '1. ¿Qué ocurre con tu cuenta bancaria entre el día 10 y el día 20 de cada mes?',
        options: [
          { text: 'Se vacía pagando tarjetas y cuentas fijas; llego a fin de mes contando monedas.', score: 10 },
          { text: 'Cubro mis gastos pero me queda cero margen para ahorrar o imprevistos.', score: 8 },
          { text: 'Ahorro algo al principio pero termino gastándolo antes de cobrar de nuevo.', score: 7 }
        ]
      },
      {
        id: 'q2',
        title: '2. ¿Cuál es tu situación actual con las tarjetas de crédito o préstamos personales?',
        options: [
          { text: 'Pago el mínimo o refinancio saldos que parecen no bajar nunca por los intereses.', score: 10 },
          { text: 'Uso la tarjeta para tapar baches del mes y el resumen se lleva gran parte de mi sueldo.', score: 9 },
          { text: 'No tengo grandes deudas, pero el dinero se me escurre en gastos invisibles.', score: 6 }
        ]
      },
      {
        id: 'q3',
        title: '3. ¿Qué métodos has intentado antes para ordenar tus finanzas?',
        options: [
          { text: 'Planillas de Excel donde anoto cafés y gastos durante 4 días y luego abandono.', score: 10 },
          { text: 'Intentar recortar todos mis gustos de golpe y terminar gastando por ansiedad.', score: 9 },
          { text: 'Apps bancarias complejas que solo muestran lo que ya gasté tarde.', score: 8 }
        ]
      },
      {
        id: 'q4',
        title: '4. ¿Cuánto tiempo puedes dedicar para blindar tu sueldo y acelerar tu salida de deudas?',
        options: [
          { text: '15 minutos al cobrar y 5 minutos semanales desde la App Móvil.', score: 10 },
          { text: 'Necesito una configuración rápida en 48 horas con plantillas automáticas.', score: 9 },
          { text: '30 minutos este fin de semana para reestructurar todas mis cuentas.', score: 8 }
        ]
      },
      {
        id: 'q5',
        title: '5. ¿Cuál sería tu mayor alivio financiero en los próximos 30 días?',
        options: [
          { text: 'Cortar el sangrado de intereses, liberar entre $300 y $600 USD/mes y dormir en paz.', score: 10 },
          { text: 'Tener un fondo de tranquilidad separado automáticamente antes de gastar.', score: 9 },
          { text: 'Liquidar mi tarjeta más cara con un plan matemático exacto.', score: 10 }
        ]
      }
    ]
  },

  high_performance_universal: {
    id: 'high_performance_universal',
    name: 'High Performance Direct Response Universal',
    badge: 'Sistema Operativo de Alto Rendimiento',
    colors: {
      bgMain: '#090D16',
      bgCard: '#111827',
      borderCard: '#1E293B',
      accentPrimary: '#3B82F6',      // Azul cobalto
      accentGradientFrom: '#3B82F6',
      accentGradientTo: '#06B6D4',  // Cian ejecutivo
      accentGlow: 'rgba(59, 130, 246, 0.3)',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      urgencyAccent: '#F59E0B'
    },
    specialSectionName: 'TransformationMatrixSection.astro',
    specialSectionTitle: 'Simulador de Impacto y Recuperación de Capacidad Operativa',
    specialSectionSubtitle: 'El costo real de operar con fricción diaria frente a un sistema sincronizado de 15 minutos:',
    specialMetrics: [
      { label: 'Fuga Diaria por Interrupciones y Fatiga', value: '2.7 horas netas perdidas / día', status: 'fuga crítica', color: 'text-rose-400' },
      { label: 'Primeras 48 Horas (Fase 1 de Choque)', value: 'Eliminación del 80% de la fricción aguda', status: 'desbloqueo', color: 'text-amber-400' },
      { label: 'Día 7 (Sistema Instalado + App Móvil)', value: '+14.5 horas productivas recuperadas / semana', status: 'óptimo', color: 'text-emerald-400' }
    ],
    quizQuestions: [
      {
        id: 'q1',
        title: '1. ¿En qué momento del día sientes con mayor fuerza el bloqueo o pérdida de enfoque?',
        options: [
          { text: 'A media mañana, tras las primeras interrupciones y mensajes urgentes.', score: 10 },
          { text: 'Después del mediodía, cuando cae mi energía física y mental.', score: 8 },
          { text: 'Desde que abro la pantalla sin una ruta crítica clara.', score: 9 }
        ]
      },
      {
        id: 'q2',
        title: '2. ¿Qué ocurre actualmente con tus tareas más importantes al terminar la jornada?',
        options: [
          { text: 'Estuve ocupado todo el día pero lo más estratégico quedó pendiente para mañana.', score: 10 },
          { text: 'Avanzo a costa de extender mi horario y terminar completamente agotado.', score: 9 },
          { text: 'Logro avanzar solo algunos días de forma inconsistente.', score: 6 }
        ]
      },
      {
        id: 'q3',
        title: '3. ¿Qué métodos has intentado aplicar anteriormente sin éxito duradero?',
        options: [
          { text: 'Listas de tareas infinitas o apps complejas que terminé abandonando.', score: 10 },
          { text: 'Fuerza de voluntad pura y más café para aguantar el ritmo.', score: 9 },
          { text: 'Cursos largos llenos de teoría que no tuve tiempo de terminar.', score: 8 }
        ]
      },
      {
        id: 'q4',
        title: '4. ¿Cuánto tiempo diario puedes dedicar a un sistema si te da resultados desde las primeras 48h?',
        options: [
          { text: '15 minutos tácticos al día guiados paso a paso.', score: 10 },
          { text: 'Solo bloques cortos de 5 a 10 minutos con plantillas listas.', score: 9 },
          { text: '30 minutos diarios para transformar mi estructura completa.', score: 8 }
        ]
      },
      {
        id: 'q5',
        title: '5. ¿Qué herramienta te ayudaría más a sostener los resultados sin recaer?',
        options: [
          { text: 'El sistema paso a paso + una App Móvil con temporizador táctico y protocolos SOS.', score: 10 },
          { text: 'Plantillas ejecutables listas para copiar y pegar hoy mismo.', score: 9 },
          { text: 'Un plan de blindaje rápido para días de máxima presión.', score: 8 }
        ]
      }
    ]
  }
};

function getArchetypeForNiche(nicheName = '', avatar = '', pain = '') {
  const typeKey = detectNicheArchetype(nicheName, avatar, pain);
  const base = ARCHETYPES[typeKey] || ARCHETYPES.high_performance_universal;

  if (typeKey === 'high_performance_universal' && nicheName) {
    const cleanNiche = nicheName.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, '').trim();
    const cleanPain = (pain || 'la fricción diaria').charAt(0).toLowerCase() + (pain || 'la fricción diaria').slice(1);
    return {
      ...base,
      badge: `Arquitectura Táctica · ${cleanNiche}`,
      specialSectionTitle: `Simulador de Impacto Real en ${cleanNiche}`,
      specialSectionSubtitle: `Cómo impacta ${cleanPain} en tu semana y cuánto recuperas al instalar el sistema:`,
      specialMetrics: [
        { label: `Desgaste Actual por ${cleanNiche}`, value: '2.8 horas / día perdidas en fricción', status: 'fuga crítica', color: 'text-rose-400' },
        { label: 'Primeras 48 Horas (Protocolo de Choque)', value: 'Reducción del 80% en bloqueos agudos', status: 'desbloqueo', color: 'text-amber-400' },
        { label: 'Con Sistema + App Móvil Activa', value: '+15 horas netas recuperadas / semana', status: 'óptimo', color: 'text-emerald-400' }
      ]
    };
  }

  return base;
}

module.exports = {
  detectNicheArchetype,
  getArchetypeForNiche,
  ARCHETYPES
};
