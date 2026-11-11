const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Skills Structure & Zero-Hardcoding Validation', () => {
  const requiredSkills = [
    'orchestrator',
    'browser-automation',
    'niche-discovery',
    'offer-reengineer',
    'funnel-copywriter',
    'prompt-web-maker',
    'product-generator',
    'landing-builder',
    'traffic-launcher',
    'content-creator',
    'dm-automation',
    'cart-recovery',
    'app-maker',
    'video-editor'
  ];

  const skillsDir = path.join(__dirname, '..', 'agents', 'skills');

  test('All required skills must exist in agents/skills/', () => {
    for (const skill of requiredSkills) {
      const skillPath = path.join(skillsDir, skill);
      assert.strictEqual(
        fs.existsSync(skillPath),
        true,
        `Skill directory missing: ${skill}`
      );
    }
  });

  test('Every skill must have a valid SKILL.md with frontmatter', () => {
    for (const skill of requiredSkills) {
      const skillMdPath = path.join(skillsDir, skill, 'SKILL.md');
      assert.strictEqual(
        fs.existsSync(skillMdPath),
        true,
        `SKILL.md missing in: ${skill}`
      );

      const content = fs.readFileSync(skillMdPath, 'utf8');
      assert.match(
        content,
        /^---\r?\nname:\s*[a-z0-9-]+/m,
        `SKILL.md in ${skill} must have YAML frontmatter with 'name'`
      );
      assert.match(
        content,
        /description:\s*.+/m,
        `SKILL.md in ${skill} must have YAML frontmatter with 'description'`
      );
    }
  });

  test('Skills must not have hardcoded fixed niches in operational rules', () => {
    const forbiddenHardcodedWords = [
      'nicho obligatorio',
      'solo para fitness',
      'exclusivo para crypto',
      'hardcoded_niche'
    ];

    for (const skill of requiredSkills) {
      const skillMdPath = path.join(skillsDir, skill, 'SKILL.md');
      const content = fs.readFileSync(skillMdPath, 'utf8').toLowerCase();

      for (const forbidden of forbiddenHardcodedWords) {
        assert.strictEqual(
          content.includes(forbidden),
          false,
          `Skill ${skill} contains hardcoded niche rule: "${forbidden}"`
        );
      }
    }
  });
});
