const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  detectNicheArchetype,
  getArchetypeForNiche,
  ARCHETYPES
} = require('../agents/skills/landing-builder/scripts/archetypes');

describe('Niche Visual Archetypes & Rule #15 Validation', () => {
  test('Rule #15 must be documented in AGENTS.md', () => {
    const agentsMd = fs.readFileSync(path.join(__dirname, '..', 'AGENTS.md'), 'utf8');
    assert.match(agentsMd, /Regla.*15|15 — Diseño Visual y Estructura Hiper-Personalizada/i);
    assert.match(agentsMd, /Zero Repetitive Templates/i);
  });

  test('detectNicheArchetype maps different niches to unique archetypes', () => {
    assert.strictEqual(
      detectNicheArchetype('Alivio Lumbar y Descompresión', 'Programadores', 'Dolor lumbar'),
      'biomechanical_ergonomics'
    );
    assert.strictEqual(
      detectNicheArchetype('Salud Hormonal y Perimenopausia', 'Mujeres +35', 'Fatiga e insomnio'),
      'serene_clinical_organic'
    );
    assert.strictEqual(
      detectNicheArchetype('Edición Dinámica de Video Corto', 'Creadores', 'Baja retención'),
      'creator_studio_neon'
    );
    assert.strictEqual(
      detectNicheArchetype('Conducta Canina y Ansiedad', 'Dueños de perros', 'Ladridos continuos'),
      'warm_earth_pets'
    );
    assert.strictEqual(
      detectNicheArchetype('Automatización No-Code con IA', 'Dueños de agencias', 'Tareas manuales'),
      'fintech_tech_minimalist'
    );
  });

  test('Each archetype has distinct color tokens, specialized sections and quiz questions', () => {
    const archetypesList = Object.values(ARCHETYPES);
    assert.ok(archetypesList.length >= 5);

    const colorsSet = new Set();
    for (const arc of archetypesList) {
      assert.ok(arc.id, 'Archetype must have an id');
      assert.ok(arc.badge, 'Archetype must have a unique badge');
      assert.ok(arc.colors.accentPrimary, 'Archetype must have an accent color');
      assert.ok(arc.specialSectionTitle, 'Archetype must define a specialized section');
      assert.ok(arc.specialMetrics.length >= 3, 'Special section must have at least 3 metric cards');
      assert.strictEqual(arc.quizQuestions.length, 5, 'Archetype must have 5 specific quiz questions');

      colorsSet.add(arc.colors.accentPrimary);
    }

    // Colors must not all be identical
    assert.ok(colorsSet.size >= 4, 'Archetypes must have diverse color palettes');
  });
});
