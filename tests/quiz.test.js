const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Interactive Quiz Funnel (quiz.astro)', () => {
  const quizPath = path.join(__dirname, '..', 'funnel', 'src', 'pages', 'quiz.astro');

  test('quiz.astro must exist in /funnel/src/pages/', () => {
    assert.strictEqual(fs.existsSync(quizPath), true);
  });

  test('quiz.astro must contain 5 questions, lead capture, and result screen', () => {
    const content = fs.readFileSync(quizPath, 'utf8');
    assert.match(content, /id="q1"/);
    assert.match(content, /id="q2"/);
    assert.match(content, /id="q3"/);
    assert.match(content, /id="q4"/);
    assert.match(content, /id="q5"/);
    assert.match(content, /id="lead-step"/);
    assert.match(content, /id="result-screen"/);
    assert.match(content, /progress-bar/);
  });

  test('quiz.astro must preserve UTM parameters towards the result CTA', () => {
    const content = fs.readFileSync(quizPath, 'utf8');
    assert.match(content, /window\.location\.search/);
    assert.match(content, /result-cta/);
  });
});
