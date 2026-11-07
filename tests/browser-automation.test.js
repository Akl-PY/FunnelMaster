const { test, describe } = require('node:test');
const assert = require('node:assert');
const { execSync } = require('child_process');
const path = require('path');

describe('Browser Automation Wrapper Smoke Tests', () => {
  const browserScript = path.join(__dirname, '..', 'agents', 'skills', 'browser-automation', 'scripts', 'browser.js');

  test('browser.js status must return valid profile and headless mode info', () => {
    const output = execSync(`node "${browserScript}" status`, { encoding: 'utf8' });
    assert.match(output, /\[browser\] Browser mode:/);
    assert.match(output, /\[browser\] Profile:/);
    assert.match(output, /\.browser-profile/);
  });
});
