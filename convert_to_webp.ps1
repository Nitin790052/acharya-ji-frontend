$assetsDir = "d:\Acharya_Ji_Onilne_website\frontend\src\assets"
$images = Get-ChildItem -Path $assetsDir -Recurse -File | Where-Object { $_.Extension -match "png|jpg|jpeg" }

foreach ($img in $images) {
    $outPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    Write-Host "Converting $($img.FullName) to $outPath"
    npx -y sharp-cli -i $img.FullName -o $outPath
}
