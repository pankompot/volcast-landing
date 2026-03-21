# Forecasting Deep Dives — Schedule & Frontmatter Reference

All 14 files (7 topics × 2 languages) have correct frontmatter and are ready to commit.
All posts have `draft: true` — they'll be published by the GitHub Actions workflow.

## Updated schedule.json

Merge these entries into the existing `src/content/schedule.json`:

```json
[
  {
    "date": "2026-03-31",
    "files": [
      "en/03-direct-vs-diffuse-sunlight.md",
      "pl/03-swiatlo-bezposrednie-vs-rozproszone.md"
    ]
  },
  {
    "date": "2026-04-03",
    "files": [
      "en/04-tilt-and-azimuth-explained.md",
      "pl/04-nachylenie-i-azymut.md"
    ]
  },
  {
    "date": "2026-04-07",
    "files": [
      "en/physics-vs-ml-solar-forecasting.md",
      "pl/fizyka-vs-ml-prognozowanie-solarne.md"
    ]
  },
  {
    "date": "2026-04-10",
    "files": [
      "en/where-weather-forecasts-come-from.md",
      "pl/skad-sie-biora-prognozy-pogody.md"
    ]
  },
  {
    "date": "2026-04-14",
    "files": [
      "en/why-cloud-cover-hardest-variable.md",
      "pl/dlaczego-zachmurzenie-najtrudniejsza-zmienna.md"
    ]
  },
  {
    "date": "2026-04-17",
    "files": [
      "en/irradiance-journey-space-to-panel.md",
      "pl/podroz-naslonecznienia-od-kosmosu-do-panelu.md"
    ]
  },
  {
    "date": "2026-04-21",
    "files": [
      "en/transposition-models.md",
      "pl/modele-transpozycji.md"
    ]
  },
  {
    "date": "2026-04-24",
    "files": [
      "en/nowcasting-vs-day-ahead.md",
      "pl/nowcasting-vs-prognoza-dniowa.md"
    ]
  },
  {
    "date": "2026-04-28",
    "files": [
      "en/why-no-training-data-needed.md",
      "pl/dlaczego-nowe-instalacje-nie-potrzebuja-danych-treningowych.md"
    ]
  }
]
```

## Publication timeline

| Date | Day | Post # | EN Title | PL Title |
|------|-----|--------|----------|----------|
| Mar 24 | Mon | #1,#2,#5 | Launch batch (already live) | Launch batch (already live) |
| Mar 31 | Mon | #3 | Direct vs Diffuse Sunlight | Światło bezpośrednie vs rozproszone |
| Apr 3 | Thu | #4 | Tilt and Azimuth | Nachylenie i azymut |
| Apr 7 | Mon | #6 | Physics vs ML Forecasting | Fizyka vs ML prognozowanie |
| Apr 10 | Thu | #7 | Where Weather Forecasts Come From | Skąd się biorą prognozy pogody |
| Apr 14 | Mon | #8 | Why Cloud Cover Is Hardest | Dlaczego zachmurzenie najtrudniejsze |
| Apr 17 | Thu | #9 | Irradiance Journey | Podróż nasłonecznienia |
| Apr 21 | Mon | #10 | Transposition Models | Modele transpozycji |
| Apr 24 | Thu | #11 | Nowcasting vs Day-Ahead | Nowcasting vs prognoza dniowa |
| Apr 28 | Mon | #12 | Why No Training Data | Dlaczego bez danych treningowych |

## Series metadata needed

Add to `src/data/series.ts`:

```ts
'deep-dives': {
  en: { title: "Forecasting Deep Dives", description: "Technical deep dives into how physics-based solar forecasting works — from weather models to transposition to accuracy analysis." },
  pl: { title: "Prognozowanie — w głąb tematu", description: "Techniczne zagłębienia w działanie prognozowania solarnego opartego na fizyce — od modeli pogodowych przez transpozycję po analizę trafności." },
},
```

## File list

```
src/content/blog/
├── en/
│   ├── physics-vs-ml-solar-forecasting.md
│   ├── where-weather-forecasts-come-from.md
│   ├── why-cloud-cover-hardest-variable.md
│   ├── irradiance-journey-space-to-panel.md
│   ├── transposition-models.md
│   ├── nowcasting-vs-day-ahead.md
│   └── why-no-training-data-needed.md
└── pl/
    ├── fizyka-vs-ml-prognozowanie-solarne.md
    ├── skad-sie-biora-prognozy-pogody.md
    ├── dlaczego-zachmurzenie-najtrudniejsza-zmienna.md
    ├── podroz-naslonecznienia-od-kosmosu-do-panelu.md
    ├── modele-transpozycji.md
    ├── nowcasting-vs-prognoza-dniowa.md
    └── dlaczego-nowe-instalacje-nie-potrzebuja-danych-treningowych.md
```
