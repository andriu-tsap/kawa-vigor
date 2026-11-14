Projekt koncepcyjny do portfolio – fikcyjna marka

# Kawa Vigor

**Problem.** Klient potrzebuje prostego wyboru pomiędzy pojedynczą paczką a cykliczną dostawą.

**Rozwiązanie.** Warianty zakupu, dwujęzyczna obsługa oraz lokalny koszyk pokazują cały proces.

**Sekcje.** <span data-de="Kaufen">Zakup</span>, FAQ, <span data-de="Warenkorb">Koszyk</span>.

**Technologie.** HTML, Tailwind CSS, CSS, JavaScript bez frameworków. Font DM Sans z Google Fonts.

**Grafiki.** Własne SVG i zrzuty interfejsu.

**GitHub Pages.** [Adres demo](https://andriu-tsap.github.io/kawa-vigor/).

**Lokalnie.** Uruchom serwer statyczny w katalogu projektu poleceniem python3 -m http.server 8000. Treść jest w HTML, motyw w style.css, zachowanie w app.js. Aby ponownie skompilować Tailwind, zainstaluj tailwindcss@4 i @tailwindcss/cli@4 i uruchom npx @tailwindcss/cli -i tailwind.input.css -o tailwind.css --minify.

## Zrzuty ekranu

[Desktop](screenshots/desktop.png) · [Mobile](screenshots/mobile.png)

## Lighthouse

<!-- AUDIT:START -->
Pomiar strony głównej na lokalnym serwerze statycznym w GitHub Actions (Chromium · Lighthouse 12).

| Tryb | Wydajność | Dostępność | Dobre praktyki | SEO |
| --- | ---: | ---: | ---: | ---: |
| desktop | 100 | 100 | 100 | 100 |
| mobile | 100 | 100 | 100 | 100 |
<!-- AUDIT:END -->

