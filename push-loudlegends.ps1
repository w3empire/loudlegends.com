# push-loudlegends.ps1 — auto builds with Hugo, then deploys using git worktree and force push

# Define paths
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Public = Join-Path $Root "public"
$DeployDir = Join-Path $Root ".deploy"
$Branch = "gh-pages"

# Ensure git and hugo are available
foreach ($cmd in @("git", "hugo")) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        Write-Host "$cmd is not installed or not in PATH. Aborting."
        exit 1
    }
}

# Run Hugo to rebuild the site
Write-Host "Building site with Hugo..."
hugo

# Exit early if public folder doesn't exist or is empty
if (!(Test-Path $Public) -or !(Get-ChildItem $Public -Recurse | Where-Object { -not $_.PSIsContainer })) {
    Write-Host "Hugo build produced no output. Skipping deploy."
    exit 0
}

# Remove existing deploy worktree if it exists
if (Test-Path $DeployDir) {
    git worktree remove --force $DeployDir 2>$null
    Remove-Item -Recurse -Force $DeployDir -ErrorAction SilentlyContinue
}

# Add fresh worktree for gh-pages
git worktree add --force $DeployDir $Branch

# Ensure .git folder isn't copied (just in case)
$GitInPublic = Join-Path $Public ".git"
if (Test-Path $GitInPublic) {
    Remove-Item -Recurse -Force $GitInPublic
}

# Add .nojekyll to prevent GitHub from breaking URLs
New-Item -ItemType File -Path (Join-Path $Public ".nojekyll") -Force | Out-Null

# Clear deploy folder except .git
Get-ChildItem -Path $DeployDir -Exclude ".git" | Remove-Item -Recurse -Force

# Copy the new build
Copy-Item -Path "$Public\*" -Destination $DeployDir -Recurse -Force

# Commit and force-push to gh-pages
Set-Location $DeployDir
git add .
$hasChanges = git diff --cached --quiet ; $exitCode = $LASTEXITCODE

if ($exitCode -ne 0) {
    git commit -m "Deploy at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git push origin $Branch --force
} else {
    Write-Host "No changes to deploy."
}

# Return to root
Set-Location $Root