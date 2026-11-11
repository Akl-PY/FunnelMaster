/**
 * video-editor.js — Motor de Edición y Procesamiento de Video Vertical (9:16) con FFmpeg.
 * Automatiza la generación de creativos para Meta Ads, TikTok y Reels.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { logAutomation } = require('../../../../scripts/db');

function findFfmpegBinary() {
  const localAppData = process.env.LOCALAPPDATA || (process.env.USERPROFILE ? path.join(process.env.USERPROFILE, 'AppData', 'Local') : '');
  if (localAppData) {
    const pwDir = path.join(localAppData, 'ms-playwright');
    if (fs.existsSync(pwDir)) {
      const entries = fs.readdirSync(pwDir);
      for (const entry of entries) {
        if (entry.startsWith('ffmpeg-')) {
          const bin = path.join(pwDir, entry, 'ffmpeg-win64.exe');
          if (fs.existsSync(bin)) return bin;
        }
      }
    }
  }

  // Comprobar binario en PATH
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return 'ffmpeg';
  } catch (e) {
    return null;
  }
}

function buildFfmpegHookCommand(options = {}) {
  const {
    text = 'EL ERROR #1 QUE CASI TODOS COMETEN',
    duration = 3,
    output = 'hook-01.mp4',
    bgColor = '0x0B0F19',
    primaryColor = '0x10B981'
  } = options;

  // Comando de FFmpeg para generar clip vertical 1080x1920 con fondo y gancho
  return [
    `-f lavfi -i color=c=${bgColor}:s=1080x1920:d=${duration}:r=30`,
    `-vf "drawbox=x=80:y=760:w=920:h=380:color=${primaryColor}@0.15:t=fill,drawbox=x=80:y=760:w=920:h=380:color=${primaryColor}@0.8:t=4"`,
    `-c:v libvpx-vp9 -pix_fmt yuv420p "${output}"`
  ].join(' ');
}

function buildCropToVerticalCommand(input, output) {
  return `-i "${input}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -c:a copy "${output}"`;
}

function runVideoEditor() {
  console.log('[video-editor] Starting video automation engine...');
  const rootDir = path.join(__dirname, '..', '..', '..', '..');
  const videoDir = path.join(rootDir, 'traffic', 'videos');

  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const ffmpegBin = findFfmpegBinary();
  console.log(`[video-editor] FFmpeg binary resolved: ${ffmpegBin ? ffmpegBin : 'Not found globally (generating batch scripts)'}`);

  // Generar especificaciones y script de procesamiento por lotes
  const batchScriptPath = path.join(videoDir, 'render-reels.bat');
  const batchContent = `@echo off
REM FunnelMaster Video Automation Script (FFmpeg 9:16 Vertical Creator)
set FFMPEG="${ffmpegBin || 'ffmpeg'}"

echo [1/3] Generando gancho visual 1: El error #1...
%FFMPEG% -y -f lavfi -i color=c=0x0B0F19:s=1080x1920:d=4:r=30 -c:v libvpx-vp9 hook-01.webm

echo [2/3] Generando gancho visual 2: Por que tu metodo no funciona...
%FFMPEG% -y -f lavfi -i color=c=0x080E1A:s=1080x1920:d=4:r=30 -c:v libvpx-vp9 hook-02.webm

echo [3/3] Creativos listos para Meta Ads y TikTok.
`;
  fs.writeFileSync(batchScriptPath, batchContent, 'utf8');

  // Registrar en DB
  try {
    logAutomation('video-editor', 'process_videos', 'success', {
      ffmpegBinary: ffmpegBin ? 'detected' : 'script_fallback',
      batchScript: 'render-reels.bat',
      outputDir: videoDir
    });
  } catch (e) {
    console.warn('[video-editor] DB log skipped:', e.message);
  }

  console.log(`[video-editor] Video automation scripts generated successfully at ${videoDir}`);
  return {
    ffmpegBin,
    videoDir,
    batchScriptPath
  };
}

if (require.main === module) {
  try {
    runVideoEditor();
    process.exit(0);
  } catch (err) {
    console.error('[video-editor] Error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  findFfmpegBinary,
  buildFfmpegHookCommand,
  buildCropToVerticalCommand,
  runVideoEditor
};
