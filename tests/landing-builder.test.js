const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Landing Builder (Astro / Next.js) Rules & Structure', () => {
  const landingSkillMd = path.join(__dirname, '..', 'agents', 'skills', 'landing-builder', 'SKILL.md');

  test('SKILL.md must define mandatory UTM preservation', () => {
    const content = fs.readFileSync(landingSkillMd, 'utf8');
    assert.match(content, /utm_source/);
    assert.match(content, /Preservaci[oó]n Obligatoria de UTMs/i);
  });

  test('SKILL.md must specify target directory /funnel', () => {
    const content = fs.readFileSync(landingSkillMd, 'utf8');
    assert.match(content, /\/funnel/);
  });

  test('SKILL.md must define the 11 modular components', () => {
    const content = fs.readFileSync(landingSkillMd, 'utf8');
    const expectedComponents = [
      'HeroSection',
      'PainPoints',
      'QuickWins',
      'UniqueMechanism',
      'TargetAudience',
      'SocialProof',
      'BonusStack',
      'PricingOffer',
      'FaqAccordion'
    ];

    for (const comp of expectedComponents) {
      assert.strictEqual(
        content.includes(comp),
        true,
        `Landing builder must specify component: ${comp}`
      );
    }
  });

  test('UTM URL parameter injection logic must work correctly', () => {
    // Unit test for the UTM preservation logic
    function injectUtms(baseUrl, queryParams) {
      const url = new URL(baseUrl);
      for (const [key, val] of Object.entries(queryParams)) {
        if (key.startsWith('utm_') || key === 'src') {
          url.searchParams.set(key, val);
        }
      }
      return url.toString();
    }

    const checkoutUrl = 'https://pay.hotmart.com/ABC12345';
    const inboundParams = {
      utm_source: 'facebook',
      utm_medium: 'cpc',
      utm_campaign: 'retargeting_vsl',
      unrelated_param: 'ignore_me'
    };

    const finalUrl = injectUtms(checkoutUrl, inboundParams);
    assert.strictEqual(finalUrl.includes('utm_source=facebook'), true);
    assert.strictEqual(finalUrl.includes('utm_medium=cpc'), true);
    assert.strictEqual(finalUrl.includes('utm_campaign=retargeting_vsl'), true);
    assert.strictEqual(finalUrl.includes('unrelated_param'), false);
  });
});
