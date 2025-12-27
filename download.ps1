
function Download-WebsiteRecursively {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true)]
        [string]$Uri,

        [Parameter(Mandatory=$true)]
        [string]$DestinationPath,

        [Parameter(Mandatory=$false)]
        [int]$Depth = 3,

        [Parameter(Mandatory=$false)]
        [string[]]$ExcludeExtensions = @(".zip", ".rar", ".exe", ".pdf"),

        [Parameter(Mandatory=$false)]
        [switch]$NoParent
    )

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

        $uriObject = New-Object System.Uri($Uri)
        $uriPath = $uriObject.AbsolutePath
        
        if ([string]::IsNullOrEmpty($uriPath)) {
            Write-Warning "URI path is empty for: $Uri"
            return
        }

        $localPath = Join-Path $DestinationPath (Split-Path $uriPath -Leaf)

        if ($webResponse.Headers.'Content-Type' -and $webResponse.Headers.'Content-Type' -notlike '*text/html*' -and $webResponse.Headers.'Content-Type' -notlike '*application/xhtml+xml*') {
            $fileName = (Split-Path $Uri -Leaf)
            if ($fileName -and $ExcludeExtensions -notcontains ([System.IO.Path]::GetExtension($fileName))) {
                $fileDestination = Join-Path $DestinationPath $fileName
                if (-not (Test-Path (Split-Path $fileDestination -Parent))) {
                    New-Item -Path (Split-Path $fileDestination -Parent) -ItemType Directory -Force | Out-Null
                }
                Write-Host "Downloading file: $fileName to $fileDestination" -ForegroundColor Green
                Invoke-WebRequest -Uri $Uri -OutFile $fileDestination -ErrorAction Stop
            } else {
                Write-Verbose "Skipping file (excluded extension or no filename): $Uri"
            }
            return
        }

        if ($webResponse.Links) {
            foreach ($link in $webResponse.Links) {
                if ($link.href) {
                    try {
                        $absoluteUri = New-Object System.Uri($uriObject, $link.href)
                    } catch {
                        Write-Warning "Could not create a valid URI from $($link.href) on page $Uri"
                        continue
                    }

                    if ($absoluteUri.Host -ne $uriObject.Host) {
                        Write-Verbose "Skipping external link: $($absoluteUri.AbsoluteUri)"
                        continue
                    }

                    if ($NoParent) {
                        $baseUriSegments = $uriObject.Segments
                        $linkUriSegments = $absoluteUri.Segments
                        if ($linkUriSegments.Length -lt $baseUriSegments.Length) {
                            Write-Verbose "Skipping parent directory link: $($absoluteUri.AbsoluteUri)"
                            continue
                        }
                        $isParent = $false
                        for ($i = 0; $i -lt $baseUriSegments.Length; $i++) {
                            if ($baseUriSegments[$i] -ne $linkUriSegments[$i]) {
                                if ($i -lt $baseUriSegments.Length -1) {
                                    $isParent = $true
                                }
                                break
                            }
                        }
                        if ($isParent) {
                            Write-Verbose "Skipping parent path link: $($absoluteUri.AbsoluteUri)"
                            continue
                        }
                    }

                    $localResourcePath = Join-Path $DestinationPath ($absoluteUri.Segments -join '')
                    $localResourceDir = Split-Path $localResourcePath -Parent
                    $localResourceFile = $localResourcePath

                    if (-not (Test-Path $localResourceDir)) {
                        New-Item -Path $localResourceDir -ItemType Directory -Force | Out-Null
                    }

                    $fileExtension = [System.IO.Path]::GetExtension($absoluteUri.AbsoluteUri)
                    if ($absoluteUri.AbsoluteUri.EndsWith('/') -or [string]::IsNullOrEmpty($fileExtension)) {
                        if ($Depth -gt 0 -and (-not $global:VisitedUrls.Contains($absoluteUri.AbsoluteUri))) {
                            Download-WebsiteRecursively -Uri $absoluteUri.AbsoluteUri -DestinationPath $DestinationPath -Depth ($Depth - 1) -ExcludeExtensions $ExcludeExtensions -NoParent:$NoParent
                        } else {
                            Write-Verbose "Max depth reached or already visited directory: $($absoluteUri.AbsoluteUri)"
                        }
                    }
                    else {
                        if ($ExcludeExtensions -notcontains $fileExtension) {
                             if (-not (Test-Path (Split-Path $localResourceFile -Parent))) {
                                New-Item -Path (Split-Path $localResourceFile -Parent) -ItemType Directory -Force | Out-Null
                            }
                            Write-Host "Downloading linked file: $($absoluteUri.AbsoluteUri) to $localResourceFile" -ForegroundColor Green
                            Invoke-WebRequest -Uri $absoluteUri.AbsoluteUri -OutFile $localResourceFile -ErrorAction Stop
                        } else {
                            Write-Verbose "Skipping linked file (excluded extension): $($absoluteUri.AbsoluteUri)"
                        }
                    }
                }
            }
        }
    }
    catch {
        Write-Warning "Error processing ${Uri}:"
        Write-Warning $_.Exception.Message
    }
}

# --- Example Usage ---
# To use this script:
# 1. Save it as a .ps1 file (e.g., Download-Website.ps1).
# 2. Open PowerShell.
# 3. Run the script, providing the URL and a destination folder.

# Example 1: Download a simple website to a local folder with default depth
# Download-WebsiteRecursively -Uri "http://example.com" -DestinationPath "C:\DownloadedSites\ExampleCom"

# Example 2: Download with a specific depth and exclude certain file types
# Download-WebsiteRecursively -Uri "https://www.iana.org/" -DestinationPath "C:\DownloadedSites\IANA" -Depth 2 -ExcludeExtensions @(".pdf", ".jpg", ".png")

# Example 3: Download without ascending to parent directories
# Download-WebsiteRecursively -Uri "http://example.com/path/to/start/" -DestinationPath "C:\DownloadedSites\ExampleSubpath" -NoParent

# Clear the global visited URLs for a fresh run if you call the function multiple times in the same session
Remove-Variable -Name 'global:VisitedUrls' -ErrorAction SilentlyContinue

# Define your target URL and destination path
$targetUrl = "https://www.dpspatna.com/" # Replace with the actual URL you want to download
$outputFolder = "C:\Users\yasha\gks\website\dps-patna" # Replace with your desired local path

# Run the function
Download-WebsiteRecursively -Uri $targetUrl -DestinationPath $outputFolder -Depth 4 -ExcludeExtensions @(".zip", ".rar", ".exe")
