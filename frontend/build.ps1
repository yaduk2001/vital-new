# Build script to handle Windows file system issues
Write-Host "Cleaning build cache..." -ForegroundColor Yellow

# Stop any running Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Remove .next directory
if (Test-Path .next) {
    Write-Host "Removing .next directory..." -ForegroundColor Yellow
    Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# Remove node_modules cache
if (Test-Path node_modules\.cache) {
    Write-Host "Removing node_modules cache..." -ForegroundColor Yellow
    Remove-Item -Path node_modules\.cache -Recurse -Force -ErrorAction SilentlyContinue
}

# Create .next directory structure manually
Write-Host "Creating .next directory structure..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path ".next" -Force | Out-Null
New-Item -ItemType Directory -Path ".next\server" -Force | Out-Null

# Set environment variables
$env:NODE_OPTIONS = "--max-old-space-size=4096"
$env:CI = "true"

Write-Host "Starting build..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!" -ForegroundColor Green
} else {
    Write-Host "Build failed. Try running as Administrator or check Windows Defender settings." -ForegroundColor Red
}

