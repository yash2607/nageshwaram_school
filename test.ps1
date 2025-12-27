
$Uri = "https://www.dpspatna.com/"
$DestinationPath = "C:\Users\yasha\gks\website\dps-patna"
$Depth = 2
$ExcludeExtensions = @(".zip", ".rar", ".exe", ".pdf")
$NoParent = $true

if (-not (Test-Path $DestinationPath)) {
    New-Item -Path $DestinationPath -ItemType Directory -Force | Out-Null
}

if (-not (Get-Variable -Name 'global:VisitedUrls' -ErrorAction SilentlyContinue)) {
    $global:VisitedUrls = New-Object System.Collections.Generic.HashSet[string]
}

if ($global:VisitedUrls.Contains($Uri)) {
    Write-Verbose "Already visited: $Uri"
    return
}
$global:VisitedUrls.Add($Uri) | Out-Null

Write-Host "Processing: $Uri (Depth: $Depth)" -ForegroundColor Cyan

try {
    $webResponse = Invoke-WebRequest -Uri $Uri -UseBasicParsing -ErrorAction Stop
}
catch {
    $errorMessage = $_.Exception.Message
    Write-Warning "Error processing $Uri: $errorMessage"
}
