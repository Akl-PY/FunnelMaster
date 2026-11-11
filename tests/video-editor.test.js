const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  findFfmpegBinary,
  buildFfmpegHookCommand,
  buildCropToVerticalCommand,
  runVideoEditor
} = require('../agents/skills/video-editor/scripts/video-editor');

describe('Video Editor Agent (FFmpeg & 9:16 Creatives)', () => {
  test('findFfmpegBinary detects FFmpeg or playwright fallback', () => {
    const bin = findFfmpegBinary();
    assert.ok(bin !== undefined);
  });

  test('buildFfmpegHookCommand generates valid 1080x1920 command line', () => {
    const cmd = buildFfmpegHookCommand({
      text: 'EL ERROR CRITICO',
      duration: 3,
      output: 'test-hook.mp4'
    });
    assert.match(cmd, /1080x1920/);
    assert.match(cmd, /lavfi/);
    assert.match(cmd, /drawbox/);
    assert.match(cmd, /test-hook\.mp4/);
  });

  test('buildCropToVerticalCommand generates 9:16 crop filter', () => {
    const cmd = buildCropToVerticalCommand('input.mp4', 'output.mp4');
    assert.match(cmd, /crop=1080:1920/);
    assert.match(cmd, /scale=1080:1920/);
  });

  test('runVideoEditor generates batch rendering scripts in traffic/videos', () => {
    const result = runVideoEditor();
    assert.strictEqual(fs.existsSync(result.videoDir), true);
    assert.strictEqual(fs.existsSync(result.batchScriptPath), true);
    const content = fs.readFileSync(result.batchScriptPath, 'utf8');
    assert.match(content, /1080x1920/);
    assert.match(content, /hook-01/);
  });
});
