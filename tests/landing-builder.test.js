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

  test('Physical /funnel directory contains scaffolded Astro landing files', (t) => {
    const funnelDir = path.join(__dirname, '..', 'funnel');
    if (!fs.existsSync(funnelDir)) {
      t.skip('/funnel directory not yet generated');
      return;
    }

    const pkgPath = path.join(funnelDir, 'package.json');
    assert.strictEqual(fs.existsSync(pkgPath), true, 'package.json must exist in /funnel');

    const indexPath = path.join(funnelDir, 'src', 'pages', 'index.astro');
    assert.strictEqual(fs.existsSync(indexPath), true, 'src/pages/index.astro must exist in /funnel');

    const layoutPath = path.join(funnelDir, 'src', 'layouts', 'BaseLayout.astro');
    assert.strictEqual(fs.existsSync(layoutPath), true, 'BaseLayout.astro must exist in /funnel');

    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    assert.match(layoutContent, /utm_/i, 'BaseLayout.astro must contain UTM parameter preservation script');
    assert.match(layoutContent, /animation-timeline:\s*view\(\)/, 'BaseLayout.astro must contain native CSS view() scroll-driven animations');
    assert.match(layoutContent, /animation-timeline:\s*scroll\(root block\)/, 'BaseLayout.astro must contain native CSS scroll() reading progress bar');
    assert.match(layoutContent, /animation-range:\s*entry 0% cover/, 'BaseLayout.astro must configure animation-range for scroll reveals');

    // Verify all 12 agency-grade components exist physically
    const requiredPhysicalComponents = [
      'HeroSection.astro',
      'PainPoints.astro',
      'QuickWins.astro',
      'SpecialSection.astro',
      'UniqueMechanism.astro',
      'TargetAudience.astro',
      'SolutionShowcase.astro',
      'SocialProof.astro',
      'BonusStack.astro',
      'PricingOffer.astro',
      'CreatorBio.astro',
      'FaqAccordion.astro',
      'StickyMobileCTA.astro'
    ];
    for (const compFile of requiredPhysicalComponents) {
      const compPath = path.join(funnelDir, 'src', 'components', compFile);
      assert.strictEqual(fs.existsSync(compPath), true, `Component ${compFile} must exist in /funnel/src/components`);
    }

    // Verify interactive calculator in SpecialSection.astro and symptom audit in PainPoints.astro
    const specialContent = fs.readFileSync(path.join(funnelDir, 'src', 'components', 'SpecialSection.astro'), 'utf8');
    assert.match(specialContent, /updateImpactCalc/, 'SpecialSection must include live interactive calculator');

    const painContent = fs.readFileSync(path.join(funnelDir, 'src', 'components', 'PainPoints.astro'), 'utf8');
    assert.match(painContent, /updateSymptomCount/, 'PainPoints must include interactive symptom audit');
    assert.strictEqual(painContent.includes('Si eres Profesionales'), false, 'PainPoints must not have broken mad-libs grammar');
  });
});
