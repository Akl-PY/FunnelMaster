@echo off
REM FunnelMaster Video Automation Script (FFmpeg 9:16 Vertical Creator)
set FFMPEG="C:\Users\danie\AppData\Local\ms-playwright\ffmpeg-1013\ffmpeg-win64.exe"

echo [1/3] Generando gancho visual 1: El error #1...
%FFMPEG% -y -f lavfi -i color=c=0x0B0F19:s=1080x1920:d=4:r=30 -c:v libvpx-vp9 hook-01.webm

echo [2/3] Generando gancho visual 2: Por que tu metodo no funciona...
%FFMPEG% -y -f lavfi -i color=c=0x080E1A:s=1080x1920:d=4:r=30 -c:v libvpx-vp9 hook-02.webm

echo [3/3] Creativos listos para Meta Ads y TikTok.
