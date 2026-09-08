$ErrorActionPreference = 'Stop'
$destination = Join-Path $PSScriptRoot '../public/images'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
$photos = @{
  'category-pendants' = 8542167
  'category-bracelets' = 12194239
  'category-chains' = 14111392
  'collection-festive' = 36762663
  'collection-modern' = 29502931
  'product-ring' = 15684121
  'product-earrings' = 10475792
  'product-pendant' = 4595723
  'product-bracelet' = 25810584
  'bestseller-earrings' = 2849743
  'bestseller-bracelet' = 12194316
  'bestseller-pendant' = 4735887
  'bestseller-chain' = 19025993
  'occasion-wedding' = 11784752
  'occasion-engagement' = 7700270
  'occasion-anniversary' = 16346890
  'occasion-birthday' = 16664386
  'occasion-festive' = 6011777
  'occasion-everyday' = 12145316
  'experience-fashion' = 33327425
  'experience-beauty' = 3736520
  'experience-lifestyle' = 13066684
  'experience-dining' = 260922
  'experience-entertainment' = 7991318
  'experience-events' = 109669
  'journal-bridal' = 13162236
  'journal-tradition' = 5595730
  'journal-colour' = 30780328
  'journal-heritage' = 13748456
  'journal-silver' = 10772765
  'journal-minimal' = 12194337
  'journal-mixed' = 12194237
  'journal-layering' = 38909338
}
foreach ($entry in $photos.GetEnumerator()) {
  $target = Join-Path $destination ($entry.Key + '.jpg')
  if (!(Test-Path -LiteralPath $target)) {
    try {
      Invoke-WebRequest -Uri "https://images.pexels.com/photos/$($entry.Value)/pexels-photo-$($entry.Value).jpeg?auto=compress&cs=tinysrgb&w=900" -OutFile $target
    } catch {
      Write-Warning "Failed: $($entry.Key) ($($entry.Value))"
      continue
    }
  }
  Write-Output "$($entry.Key): $((Get-Item -LiteralPath $target).Length) bytes"
}
$credits = @('# Image sources', '', 'Replacement editorial stock photography from Pexels. These are illustrative images, not verified DC inventory or venue photography.', '', 'License: https://www.pexels.com/license/', '', '| Local file | Source |', '| --- | --- |')
foreach ($entry in ($photos.GetEnumerator() | Sort-Object Name)) {
  $credits += "| $($entry.Key).jpg | https://www.pexels.com/photo/$($entry.Value)/ |"
}
$credits | Set-Content -Encoding UTF8 (Join-Path $destination 'README.md')
