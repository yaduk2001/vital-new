@echo off
echo Video Logo Optimization Script
echo =============================
echo.

echo Checking if FFmpeg is installed...
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: FFmpeg is not installed or not in PATH
    echo Please install FFmpeg from: https://ffmpeg.org/download.html
    echo.
    pause
    exit /b 1
)

echo FFmpeg found! Starting optimization...
echo.

echo Optimizing Tpwhote.mp4...
ffmpeg -i public/videos/Tpwhote.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k -movflags +faststart -vf "scale=480:480:force_original_aspect_ratio=decrease,pad=480:480:(ow-iw)/2:(oh-ih)/2" public/videos/Tpwhote-optimized.mp4

if %errorlevel% neq 0 (
    echo ERROR: Failed to optimize Tpwhote.mp4
    pause
    exit /b 1
)

echo Optimizing SupeAI.mp4...
ffmpeg -i public/videos/SupeAI.mp4 -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k -movflags +faststart -vf "scale=480:480:force_original_aspect_ratio=decrease,pad=480:480:(ow-iw)/2:(oh-ih)/2" public/videos/SupeAI-optimized.mp4

if %errorlevel% neq 0 (
    echo ERROR: Failed to optimize SupeAI.mp4
    pause
    exit /b 1
)

echo Creating WebM versions for better compression...
echo Creating Tpwhote.webm...
ffmpeg -i public/videos/Tpwhote.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf "scale=480:480:force_original_aspect_ratio=decrease,pad=480:480:(ow-iw)/2:(oh-ih)/2" public/videos/Tpwhote.webm

echo Creating SupeAI.webm...
ffmpeg -i public/videos/SupeAI.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf "scale=480:480:force_original_aspect_ratio=decrease,pad=480:480:(ow-iw)/2:(oh-ih)/2" public/videos/SupeAI.webm

echo.
echo Optimization complete!
echo.
echo Original file sizes:
dir public\videos\*.mp4 | findstr "Tpwhote\|SupeAI"
echo.
echo Optimized file sizes:
dir public\videos\*-optimized.mp4
echo.
echo WebM file sizes:
dir public\videos\*.webm
echo.
echo Next steps:
echo 1. Review the optimized files
echo 2. Replace original files with optimized versions:
echo    copy public\videos\Tpwhote-optimized.mp4 public\videos\Tpwhote.mp4
echo    copy public\videos\SupeAI-optimized.mp4 public\videos\SupeAI.mp4
echo 3. Test the video logo performance
echo.
pause
