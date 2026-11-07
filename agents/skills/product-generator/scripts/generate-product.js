/**
 * agents/skills/product-generator/scripts/generate-product.js
 * Generador autónomo y agnóstico de contenidos de infoproductos (Paso #9).
 * Lee los datos de la oferta activa y redacta la guía maestra y los bonos sin fluff ni clichés de IA.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function loadOfferData() {
  const offerJsonPath = path.join(__dirname, '..', '..', '..', '..', 'data', 'active_offer.json');
  if (fs.existsSync(offerJsonPath)) {
    return JSON.parse(fs.readFileSync(offerJsonPath, 'utf8'));
  }
  throw new Error('No se encontro data/active_offer.json. Ejecuta primero offer-reengineer.');
}

function generateMasterGuide(offer, niche) {
  const productName = offer.product_name;
  const uniqueMech = offer.unique_mechanism;
  const promise = offer.main_promise;
  const avatar = offer.target_avatar;

  return `# ${productName}
## Manual Operativo de 21 Días: De la Inflamación a la Vitalidad

**Mecanismo Base**: ${uniqueMech}  
**Promesa Central**: ${promise}  
**Dirigido a**: ${avatar}

---

## 1. Manifiesto de Acción Rápida (Cero Teoría Inútil)

Si tienes esta guía en tus manos, probablemente estás cansada de escuchar frases vacías como "es el estrés" o "es la edad". Este manual no es un tratado médico de endocrinología ni un recetario de dietas restrictivas. 

Es una hoja de ruta diaria dividida en 3 fases de 7 días. Cada fase ataca un interruptor biológico específico para que tu metabolismo vuelva a quemar grasa y producir energía sin forzarte a pasar hambre.

### Las 3 Reglas de Oro del Protocolo:
1. **Comer con saciedad**: Reducir calorías de forma drástica eleva el cortisol y bloquea tu tiroides. Aquí priorizamos densidad nutricional, no inanición.
2. **Respetar la cadencia circadiana**: Tu metabolismo responde a la luz solar y al descanso nocturno más que a cualquier suplemento mágico.
3. **Medir victorias funcionales, no solo la balanza**: La desinflamación abdominal, la desaparición de la niebla mental y el sueño continuo son los primeros indicadores de que el sistema se activó.

---

## 2. Fase 1 (Días 1 al 7): Drenaje y Reseteo Hepático

### Objetivo de la Fase
Descongestionar el hígado y el tracto digestivo para permitir que los metabolitos estrogénicos acumulados salgan de tu cuerpo en lugar de recircular en sangre.

### Protocolo Diario Paso a Paso

#### Mañana (Primeros 30 minutos)
- **Hidratación celular**: 400 ml de agua tibia con una pizca de sal marina integral y unas gotas de limón. Estimula la motilidad gástrica y apoya a las glándulas suprarrenales sin alterar la glucosa.
- **Luz solar directa**: 10 a 15 minutos de exposición a la luz natural matutina (sin gafas de sol) antes de mirar pantallas. Esto sincroniza tu reloj biológico y suprime la melatonina residual.

#### Alimentación de la Fase 1
- **Alimentos Estrella**: Hortalizas crucíferas (brócoli, coliflor, rúcula), alcachofas, aceite de oliva virgen extra, semillas de lino molidas (fitoestrógenos moduladores) y proteínas magras limpias (huevos, pescado azul pequeño, pollo de pastura).
- **Alimentos en Pausa Estratégica (7 días)**:
  - Alcohol de cualquier tipo.
  - Azúcares refinados y edulcorantes artificiales.
  - Lácteos ultraprocesados comerciales.
  - Aceites de semillas refinados (soja, maíz, girasol común).

#### Noche (Preparación del Reseteo)
- Cenar al menos 2 horas y media antes de acostarte.
- Apagar luces blancas directas a partir de las 21:00 y sustituir por luz cálida y tenue.

### Checklist Diario - Fase 1
- [ ] 400 ml de agua matutina con sal marina tomada.
- [ ] 10 min de sol en los ojos antes de las 10:00 AM.
- [ ] 2 porciones de vegetales crucíferos o verdes amargos incluidos en el día.
- [ ] Cero consumo de azúcar ni alcohol.
- [ ] Última ingesta finalizada 2.5h antes de dormir.

---

## 3. Fase 2 (Días 8 al 14): Calibración Glucémica Inteligente

### Objetivo de la Fase
Estabilizar la curva de insulina postprandial para frenar el almacenamiento de grasa abdominal y erradicar los bajones de energía y antojos de las 16:00.

### La Regla del Orden de Ingesta
No solo importa qué comes, sino en qué secuencia entra a tu estómago. La ciencia digestiva confirma que cambiar el orden aplana los picos de glucosa hasta un 40%:
1. **Primero**: Fibra vegetal (ensaladas, verduras cocidas).
2. **Segundo**: Proteína y grasas saludables (pescado, carne, huevos, aguacate).
3. **Tercero**: Carbohidratos complejos o almidones (boniato, legumbres, arroz integral).

### Protocolo de Manejo de Antojos Dulces
Si a media tarde sientes la necesidad imperiosa de azúcar, es señal de deshidratación o fatiga suprarrenal, no debilidad de carácter:
- Toma 1 vaso de agua con 1 cucharada sopera de vinagre de manzana sin filtrar.
- Come 1 puñado pequeño de frutos secos crudos (nueces o almendras) con una pizca de canela Ceilán.
- Espera 15 minutos: el 90% de los antojos por dopamina se desvanecen.

### Checklist Diario - Fase 2
- [ ] Regla de ingesta aplicada en comida y cena (fibra -> proteína -> carbohidrato).
- [ ] Ningún carbohidrato consumido "desnudo" (siempre acompañado de grasa o proteína).
- [ ] Caminata suave de 10 minutos tras la comida principal (activa transportadores GLUT-4 sin sudar).
- [ ] Registro de nivel de energía a las 16:00 (escala del 1 al 10).

---

## 4. Fase 3 (Días 15 al 21): Blindaje Mitocondrial y Hábitos Definitivos

### Objetivo de la Fase
Aumentar la densidad mitocondrial y la sensibilidad muscular a los nutrientes mediante micropíldoras de movimiento de bajo cortisol.

### Rutina de Activación Muscular Suave (8 Minutos Diarios)
Nada de entrenamientos extenuantes de CrossFit que eleven el cortisol al cielo. Necesitas señalizar a tus músculos que retengan masa magra:
- **Minuto 0 a 2**: Sentadillas lentas asistidas o libres (15 repeticiones controladas).
- **Minuto 2 a 4**: Flexiones de brazos en pared o mesa (12 repeticiones).
- **Minuto 4 a 6**: Puente de glúteos en el suelo con contracción isométrica de 2 segundos (15 repeticiones).
- **Minuto 6 a 8**: Plancha abdominal suave sobre antebrazos (3 series de 25 segundos con descanso).

### Plan de Sostenibilidad (Día 22 en adelante)
Has reprogramado la respuesta basal de tu organismo. Para mantener los resultados:
- Aplica la regla 85/15: mantén estas pautas el 85% del tiempo y disfruta de eventos sociales o comidas libres en el 15% restante sin culpa.
- Repite la Fase 1 (Drenaje Hepático) durante 3 días una vez al mes si sientes que la hinchazón o el estrés vuelven a acumularse.

---

## 5. Matriz de Resolución de Obstáculos Frecuentes

| Síntoma o Dificultad | Causa Probable | Solución Inmediata |
| :--- | :--- | :--- |
| Dolor de cabeza en días 2 o 3 | Retiro de azúcares y pérdida de electrolitos | Aumenta el agua con sal marina e incluye caldo de huesos |
| Estreñimiento temporal | Aumento repentino de fibra sin suficiente agua | Añade 1 cucharada de semillas de chía hidratadas en agua tibia |
| Despertar a las 3:00 AM con calor | Descenso de glucosa nocturno y pico de cortisol | Toma 1 cucharadita de aceite de coco o crema de almendras antes de dormir |
| Resistencia a cocinar a diario | Falta de planificación previa | Utiliza el Bono 2 (Recetas de 15 Minutos) para cocinar en lotes |
`;
}

function generateBonusContent(bonus) {
  const { id, name, purpose, perceivedValue } = bonus;

  if (id === 1 || name.toLowerCase().includes('insomnio') || name.toLowerCase().includes('sos')) {
    return `# ${name}
### Bono de Acompañamiento · Valor Percibido: $${perceivedValue} USD

**Propósito**: ${purpose}

---

## 1. El Interruptor del Sueño Profundo: Protocolo 3-2-1

El insomnio y los sofocos nocturnos en la perimenopausia no son casualidad: ocurren cuando la caída de estrógenos descalibra el termostato del hipotálamo y el cortisol nocturno sube a deshora.

Aplica esta regla cada noche:
- **3 Horas Antes**: Cierra la cocina. Cero alimentos sólidos para permitir que la sangre vaya a reparar tejidos y no a digerir.
- **2 Horas Antes**: Cierra el trabajo y conversaciones estresantes. Pasa al modo reposo.
- **1 Hora Antes**: Cierra pantallas con luz azul (móvil, televisión, tablets) o usa modo nocturno cálido.

---

## 2. La Bebida Termorreguladora Nocturna

Prepara esta infusión 45 minutos antes de dormir para bajar la temperatura central y estimular receptores GABA:
- 250 ml de agua caliente (sin hervir a borbotones).
- 1 sobre de manzanilla pura o pasiflora.
- 1/4 cucharadita de canela Ceilán en polvo.
- 1 cápsula abierta de citrato o bisglicinato de magnesio (o 200 mg).

*Tómala despacio, a sorbos pequeños mientras lees un libro físico.*

---

## 3. Ejercicio de Regulación Vagal (Técnica 4-7-8)

Acuéstate boca arriba con una mano en el abdomen y otra en el pecho:
1. Inhala suavemente por la nariz contando hasta **4** (sintiendo que el vientre se infla).
2. Retén el aire en tus pulmones contando hasta **7**.
3. Exhala lentamente por la boca con un suave sonido sibilante contando hasta **8**.
4. Repite este ciclo 4 veces consecutivas. Sentirás cómo la frecuencia cardíaca disminuye y el sistema nervioso simpático se apaga.
`;
  }

  if (id === 2 || name.toLowerCase().includes('recetario') || name.toLowerCase().includes('15')) {
    return `# ${name}
### Bono de Acompañamiento · Valor Percibido: $${perceivedValue} USD

**Propósito**: ${purpose}

---

## Filosofía: Cero Horas en la Cocina

Cocinar sano no debe convertirse en un segundo empleo. Estas 6 preparaciones base se arman en 15 minutos exactos y utilizan ingredientes que encuentras en cualquier supermercado estándar.

---

### Desayunos Anti-Picos de Insulina (5 a 7 Minutos)

#### 1. Huevos Revueltos Proteicos con Espinacas y Cúrcuma
- **Ingredientes**: 2 huevos enteros camperos, 1 puñado grande de espinacas frescas baby, 1 cucharadita de aceite de oliva virgen extra, pizca de cúrcuma y pimienta negra molida.
- **Preparación**: Saltea las espinacas 1 minuto en la sartén con el aceite. Vierte los huevos batidos con la cúrcuma y sal marina. Revuelve a fuego medio durante 3 minutos. Listo.

#### 2. Bowl Cremoso de Yogur Griego, Lino y Frutos Rojos
- **Ingredientes**: 150 g de yogur griego entero natural (sin azúcar añadido), 1 cucharada sopera de semillas de lino molidas, 1 cucharada de nueces picadas, 1/2 taza de arándanos o fresas frescas.
- **Preparación**: Mezcla en un tazón. El lino aporta lignanos (fitoestrógenos naturales) y la grasa del yogur mantiene tu apetito saciado hasta el almuerzo.

---

### Almuerzos Rápidos de Alta Energía (10 a 12 Minutos)

#### 3. Ensalada Templada de Salmón o Caballa con Aguacate y Rúcula
- **Ingredientes**: 1 lata de salmón salvaje o caballa al natural (excelente fuente de Omega-3 antiinflamatorio), 2 tazas de rúcula o canónigos, 1/2 aguacate maduro en cubos, 1 cucharada de semillas de calabaza, aliño de aceite de oliva virgen extra y zumo de limón.
- **Preparación**: Coloca los verdes en la base, añade la proteína en conserva escurrida, el aguacate y las semillas. Aliña y disfruta de un plato rico en nutrientes sin encender fogones.

#### 4. Salteado Express de Pechuga con Brócoli y Aceite de Sésamo
- **Ingredientes**: 150 g de tiras de pollo previamente cocidas o solomillos de pavo finos, flores de brócoli precocidas al vapor (puedes usar las de bolsa ultracongelada en 4 min de microondas), 1 diente de ajo laminado, 1 cucharadita de semillas de sésamo y tamari (salsa de soja sin gluten).
- **Preparación**: Dora el ajo en la sartén 30 segundos, incorpora el pollo y el brócoli, añade el tamari y saltea a fuego vivo 3 minutos. Termina con sésamo por encima.

---

### Cenas Livianas de Reparación Digestiva (10 a 15 Minutos)

#### 5. Crema Reconfortante de Calabacín y Almendras
- **Ingredientes**: 1 calabacín mediano cortado en rodajas, 1/2 cebolla dulce, 1 taza de caldo de verduras casero o bajo en sodio, 1 cucharada de puré de almendras 100% puro.
- **Preparación**: Hierve el calabacín y la cebolla en el caldo durante 8 minutos. Tritura en batidora junto con la cucharada de crema de almendras hasta obtener textura aterciopelada.

#### 6. Tortilla Francesa Doble con Espárragos Verdes y Champiñones
- **Ingredientes**: 2 huevos, 4 espárragos trigueros cortados en trozos pequeños, 3 champiñones laminados, aceite de oliva virgen extra.
- **Preparación**: Saltea los espárragos y champiñones 4 minutos. Añade los huevos batidos, dobla la tortilla por la mitad y cocina 1 minuto más.
`;
  }

  if (id === 3 || name.toLowerCase().includes('calculadora') || name.toLowerCase().includes('supermercado')) {
    return `# ${name}
### Bono de Acompañamiento · Valor Percibido: $${perceivedValue} USD

**Propósito**: ${purpose}

---

## 1. Semáforo de Carbohidratos y Carga Glucémica

Usa esta guía rápida para tomar decisiones al instante frente a la despensa o la carta de un restaurante:

### Zona Verde (Consumo Libre y Diario)
- **Verduras de hoja y crucíferas**: Espinacas, acelgas, col rizada, brócoli, repollo, espárragos, calabacín, pepino, pimientos.
- **Frutas de baja carga glucémica**: Arándanos, frambuesas, moras, fresas, limones, aguacate.

### Zona Amarilla (Consumo Consciente con Proteína o Grasa)
- **Tubérculos y legumbres**: Boniato, zanahoria cocida, lentejas, garbanzos, quinoa, avena integral en copos gruesos.
- **Regla**: Siempre acompáñalos con proteína limpia y aliño de aceite de oliva o frutos secos para retrasar la absorción gástrica.

### Zona Roja (Pausa Estratégica en los 21 Días)
- **Refinados y ultraprocesados**: Harinas blancas, panes comerciales de molde, refrescos, galletas "digestive", zumos envasados y alcohol.

---

## 2. Lista Maestra de Supermercado por Pasillos

Lleva esta lista en tu móvil para evitar caer en compras impulsivas:

### Pasillo 1: Frutería y Verduras Frescas
- [ ] 2 bolsas de espinacas o rúcula fresca
- [ ] 2 piezas de brócoli o coliflor
- [ ] 3 aguacates en su punto
- [ ] 1 caja de frutos rojos frescos o congelados
- [ ] 1 red de limones
- [ ] 1 bulbo de jengibre fresco

### Pasillo 2: Pescadería, Carnicería y Huevos
- [ ] 2 docenas de huevos ecológicos o camperos (código 0 o 1)
- [ ] Lomo o filetes de salmón / trucha
- [ ] Pechugas de pollo o solomillos de pavo
- [ ] Latas de sardinillas o melva en aceite de oliva virgen extra

### Pasillo 3: Frutos Secos y Despensa Sana
- [ ] Semillas de lino marrón o dorado entero (moler en casa para conservar aceites)
- [ ] Nueces de nogal crudas
- [ ] Aceite de oliva virgen extra de primera presión en frío
- [ ] Vinagre de manzana con la "madre" (crudo sin pasteurizar)
- [ ] Canela de Ceilán en polvo
- [ ] Sal marina pura o del Himalaya
`;
  }

  // Bono 4 o genérico de soporte médico / checklist
  return `# ${name}
### Bono de Acompañamiento · Valor Percibido: $${perceivedValue} USD

**Propósito**: ${purpose}

---

## 1. El Problema del "Todo Está Bien en tus Análisis"

Muchas mujeres asisten a consulta médica sintiéndose agotadas, pero reciben como única respuesta un escueto: *"Tus analíticas están normales"*. 

El motivo es simple: los rangos estándar de laboratorio miden la ausencia de enfermedad aguda clínica (como diabetes declarada o hipotiroidismo severo), no el estado metabólico óptimo ni los desequilibrios tempranos de la perimenopausia.

---

## 2. Panel Analítico Completo Recomendado

Solicita a tu médico o especialista de confianza incluir estos marcadores en tu próxima analítica de sangre:

### Panel Metabólico y de Glucosa
- **Insulina Basal en ayunas**: El indicador temprano de resistencia a la insulina (el valor ideal óptimo suele situarse por debajo de 6-8 uIU/mL, aun cuando el laboratorio marque hasta 25 como normal).
- **Glucosa basal y Hemoglobina Glicosilada (HbA1c)**.
- **Perfil lipídico completo**: Triglicéridos, HDL, LDL y ratio Triglicéridos/HDL (debe ser menor a 2).

### Panel Tiroideo Completo (No solo TSH)
- **TSH** (Hormona estimulante de tiroides).
- **T4 libre y T3 libre**: Esenciales para ver si tu cuerpo convierte eficientemente la hormona tiroidea inactiva en activa.
- **Anticuerpos anti-TPO y anti-Tiroglobulina**: Para descartar tiroiditis autoinmune subclínica (frecuente a partir de los 35 años).

### Micronutrientes y Co-Factores Clave
- **Vitamina D (25-OH)**: Nivel funcional óptimo > 40-50 ng/mL.
- **Ferritina sérica**: Mide tus reservas de hierro reales (si está por debajo de 40-50 ng/mL genera fatiga profunda y caída de cabello).
- **Vitamina B12 y Ácido Fólico**.

---

## 3. Guion de Preguntas Asertivas para tu Consulta

Usa estas preguntas textuales si te sientes incomprendida:
- *"Doctor/a, aunque los valores no muestren una patología aguda, presento síntomas claros de fatiga, insomnio y niebla mental. ¿Podríamos evaluar mi insulina basal y mis niveles de T3 libre para comparar con mis registros anteriores?"*
- *"¿Considera conveniente revisar mis niveles de ferritina y vitamina D para optimizar mi función metabólica en esta etapa de mi ciclo?"*
`;
}

function runProductGeneration() {
  console.log('[product-generator] Starting product content generation...');
  const data = loadOfferData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche.niche_name || 'salud-hormonal');
  const productsDir = path.join(__dirname, '..', '..', '..', '..', 'products', nicheSlug);
  const bonusesDir = path.join(productsDir, 'bonuses');

  if (!fs.existsSync(bonusesDir)) {
    fs.mkdirSync(bonusesDir, { recursive: true });
  }

  // 1. Generar Guía Maestra
  const masterGuideContent = generateMasterGuide(offer, niche);
  const masterGuidePath = path.join(productsDir, 'master-guide.md');
  fs.writeFileSync(masterGuidePath, masterGuideContent, 'utf8');
  console.log(`[product-generator] Master guide generated at: ${masterGuidePath}`);

  // 2. Generar Bonos
  const generatedBonuses = [];
  const bonuses = offer.bonuses || [];
  bonuses.forEach((bonus, index) => {
    const bonusSlug = `bono-${bonus.id || index + 1}-${slugify(bonus.name).slice(0, 25)}`;
    const bonusContent = generateBonusContent(bonus);
    const bonusFilePath = path.join(bonusesDir, `${bonusSlug}.md`);
    fs.writeFileSync(bonusFilePath, bonusContent, 'utf8');
    generatedBonuses.push({ file: `${bonusSlug}.md`, name: bonus.name });
    console.log(`[product-generator] Bonus generated: ${bonusFilePath}`);
  });

  // 3. Registrar en logs de automatización
  try {
    logAutomation('product-generator', 'generate_product', 'success', {
      productName: offer.product_name,
      nicheSlug,
      bonusesCount: generatedBonuses.length,
      masterGuide: 'master-guide.md'
    });
  } catch (e) {
    console.warn('[product-generator] DB log skipped:', e.message);
  }

  console.log('[product-generator] Product generation completed successfully.');
  return {
    productsDir,
    masterGuidePath,
    generatedBonuses
  };
}

if (require.main === module) {
  try {
    runProductGeneration();
  } catch (err) {
    console.error('[product-generator] Error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  runProductGeneration,
  generateMasterGuide,
  generateBonusContent
};
