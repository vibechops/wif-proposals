# Charter image manifest

Extracted from `partner/WIF_Charter 2026_Updated.pdf` via `pdfimages -all`.

**Note:** `img-000` and `img-001` are both logo variants from page 1, so pillar indices start at `img-002`.

## Pillar pages (PDF has one photo each)

| File | PDF page | Content |
|------|----------|---------|
| img-002.jpg | 3 | Exposure: Cannes delegation (WIF sweatshirts) |
| img-003.jpg | 4 | Education: Soho House masterclass panel |
| img-004.jpg | 5 | Employment: large group workshop photo |

## Our Team (PDF page 13, top to bottom)

| File | Person | Notes |
|------|--------|-------|
| img-006.jpg | Rabia Chopra | Purple WIF sweatshirt portrait |
| img-007.jpg | Shefali Saxena | White top, wavy hair |
| img-005.jpg | Trisha Sinha | Floral dress, glasses |

`img-005` is also embedded on page 13 as a tall left-column crop; the square crop above Trisha's bio is the correct headshot.

## Advisory Board (PDF pages 14–15)

| File | Person |
|------|--------|
| img-008.jpg | Anupama Chopra |
| img-009.jpg | Aparna Purohit (tall studio portrait) |
| img-010.jpg | Ekta Kapoor |
| img-011.jpg | Faye D'Souza |
| img-012.png | Gayatri Yadav |
| img-013.jpg | Gauri Shinde |
| img-014.jpg | Guneet Monga Kapoor |
| img-015.jpg | Jyoti Deshpande |
| img-016.jpg | Kanika Dhillon |
| img-017.jpg | Karan Johar (formal tux) |
| img-018.jpg | Siddharth Roy Kapur |
| img-019.png | Miriam Joseph |
| img-020.jpg | Nikhil Advani |
| img-021.jpg | Tahira Kashyap |
| img-022.jpg | Twinkle Khanna |
| img-023.jpg | Varun Grover |
| img-024.jpg | Vani Tripathi |

Advisory headshots in the deck viewer use `assets/advisors/` (higher quality, named files).

## Closing

| File | PDF page | Content |
|------|----------|---------|
| img-025.png, img-026.png | 16 | Logo variants |

## Viewer page assignments (`pages.js`)

| Page | File | Why |
|------|------|-----|
| Why we exist | img-006 | WIF-branded community portrait (PDF p2 has no photo) |
| Exposure | img-002 | PDF p3 |
| Education | img-003 | PDF p4 |
| Employment | img-003 | Masterclass / training pipeline |
| Exhibition | img-014 | No photo on PDF p6; Guneet Monga, Oscar-winning producer |
| Why partner | img-004 | Large workshop group; program scale, not team/advisor |
| Team | `team/rabia-chopra.jpg` etc. | Face crops from img-006, img-007, img-005 |
