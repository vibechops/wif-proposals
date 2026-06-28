# Charter image manifest

Extracted from `partner/WIF_Charter 2026_Updated.pdf` via `pdfimages -all`.

**Note:** `img-000` and `img-001` are both logo variants from page 1, so pillar indices start at `img-002`.

## Pillar pages (PDF has one photo each)

| File | PDF page | Content |
|------|----------|---------|
| img-002.jpg | 3 | Exposure: Cannes delegation (WIF sweatshirts) |
| img-003.jpg | 4 | Education: Soho House masterclass panel |
| img-004.jpg | 5 | Employment: large group workshop photo |

## Our Team (PDF page 13)

| File | Person |
|------|--------|
| img-006.jpg | Rabia Chopra (purple WIF sweatshirt) |
| img-007.jpg | Shefali Saxena |
| img-005.jpg | Trisha Sinha |

Team page uses cropped `team/*.webp` exports, not these raw files.

## Advisory Board (PDF pages 14–15)

| File | Person |
|------|--------|
| img-008.jpg | Anupama Chopra |
| img-009.jpg | Aparna Purohit |
| img-010.jpg | Ekta Kapoor |
| img-011.jpg | Faye D'Souza |
| img-012.png | Gayatri Yadav |
| img-013.jpg | Gauri Shinde |
| img-014.jpg | Guneet Monga Kapoor |
| img-015.jpg | Jyoti Deshpande |
| img-016.jpg | Kanika Dhillon |
| img-017.jpg | Karan Johar |
| img-018.jpg | Siddharth Roy Kapur |
| img-019.png | Miriam Joseph |
| img-020.jpg | Nikhil Advani |
| img-021.jpg | Tahira Kashyap |
| img-022.jpg | Twinkle Khanna |
| img-023.jpg | Varun Grover |
| img-024.jpg | Vani Tripathi |

Advisory strip on team page uses `assets/advisors/` (named headshots).

## Viewer page assignments (`pages.js`)

Each charter photo used **at most once** on split pages.

| Page | Asset | Source |
|------|-------|--------|
| Why we exist | img-006.jpg | WIF-branded community (PDF p13) |
| Exposure | img-002.jpg | PDF p3 |
| Education | img-003.jpg | PDF p4 |
| Employment | img-004.jpg | PDF p5 |
| Exhibition | img-014.jpg | PDF p6 has no photo; Oscar-winning producer |
| Why partner | why-partner.png | Custom industry gathering photo |
| Team | team/*.webp | Cropped headshots |
| Board strip | assets/advisors/*.jpg | Named advisory headshots |

## Unused on split pages

img-005, img-007, img-008–img-013, img-015–img-024, img-025/026 (logos). Reserved for future use or reference only.
