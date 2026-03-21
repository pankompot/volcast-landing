---
title: "Skąd się biorą prognozy pogody: modele NWP wyjaśnione dla właścicieli PV"
description: "Twoja prognoza solarna jest tak dobra, jak dane pogodowe na jej wejściu. Jak działają modele numerycznej prognozy pogody i gdzie zawodzą dla energii słonecznej."
date: 2026-04-10
tags: ["nwp", "modele-pogodowe", "gfs", "ecmwf", "icon", "prognozowanie"]
series: "deep-dives"
seriesOrder: 2
lang: pl
draft: true
seo:
  ogTitle: "Modele prognozy pogody wyjaśnione dla energii solarnej — GFS, ECMWF, ICON"
  keywords: ["numeryczna prognoza pogody a fotowoltaika", "GFS ECMWF prognoza solarna", "rozdzielczość modeli pogodowych", "modele NWP", "dane pogodowe dla PV"]
relatedPosts: ["fizyka-vs-ml-prognozowanie-solarne", "dlaczego-zachmurzenie-najtrudniejsza-zmienna", "nowcasting-vs-prognoza-dniowa"]
---

Każda prognoza produkcji solarnej to w swej istocie prognoza pogody z dodatkowymi krokami. Możesz mieć najbardziej wyrafinowany model PV na świecie, ale jeśli dane pogodowe mówią „słonecznie" a w rzeczywistości pada, Twoja prognoza produkcji będzie błędna.

Skąd więc pochodzą dane pogodowe? I dlaczego różne źródła pogody dają różne wyniki?

## Globalna maszyna pogodowa

Współczesne prognozowanie pogody opiera się na **Numerycznej Prognozie Pogody (NWP)** — masywnych symulacjach komputerowych modelujących całą atmosferę za pomocą równań fizycznych. To nie proste ekstrapolacje bieżących warunków. To pełne symulacje dynamiki płynów rozwiązujące równania Naviera-Stokesa dla przepływu atmosferycznego, sprzężone z termodynamiką, fizyką promieniowania i procesami wilgotnościowymi.

Proces zaczyna się od **asymilacji danych**: miliardy obserwacji z satelitów, stacji pogodowych, radiosond (balonów meteorologicznych), samolotów, statków i boi oceanicznych zasilają model, tworząc obraz aktualnego stanu atmosfery. Potem model kroczy naprzód w czasie, obliczając jak atmosfera ewoluuje minuta po minucie.

Główne globalne modele zasilające większość prognoz solarnych:

**GFS (Global Forecast System)** — prowadzony przez NOAA (USA). Darmowy i otwarty. Rozdzielczość siatki: ~13 km (0,25°). Aktualizacja co 6 godzin. Prognozy do 16 dni. GFS to koń roboczy darmowych danych pogodowych. Jego istotne dla fotowoltaiki wyjścia obejmują zachmurzenie całkowite, temperaturę, prędkość wiatru i strumień promieniowania krótkofalowego (zasadniczo GHI na powierzchni).

**ECMWF (Europejskie Centrum Średnioterminowych Prognoz Pogody)** — powszechnie uważany za najlepszy model globalny. Rozdzielczość: ~9 km (0,1°). Aktualizacja co 6 godzin. Lepsze odwzorowanie europejskich wzorców pogodowych. Dane ECMWF są częściowo komercyjne — pełna rozdzielczość wymaga płatnej licencji, choć produkty niższej rozdzielczości są dostępne za darmo.

**ICON (Icosahedral Nonhydrostatic)** — prowadzony przez DWD (Niemiecki Serwis Meteorologiczny). Otwarte dane od 2023 roku. Wersja globalna ~13 km, zagnieżdżenie europejskie ~6,5 km, zagnieżdżenie niemieckie ~2,2 km. Szczególnie dobry dla prognozowania w Europie Środkowej — istotne jeśli jesteś w Polsce, Niemczech lub krajach sąsiednich.

## Co modele NWP faktycznie generują

Dla prognozowania solarnego krytyczne wyjścia NWP to:

**Zachmurzenie** — zwykle podawane jako całkowity współczynnik zachmurzenia (0-100%), czasem z podziałem na chmury wysokie, średnie i niskie. To najważniejsza zmienna dla prognozowania PV i jednocześnie najtrudniejsza do trafnego przewidzenia.

**Temperatura** — temperatura powietrza na wysokości 2 metrów, używana do estymacji temperatury ogniwa i stosowania korekty temperaturowej.

**Prędkość i kierunek wiatru** — wpływa na temperaturę ogniwa przez chłodzenie konwekcyjne. Wietrzny dzień oznacza chłodniejsze panele i nieco wyższą sprawność.

**Promieniowanie słoneczne na powierzchni** — niektóre modele bezpośrednio generują GHI lub jego składniki. To najbardziej użyteczna zmienna, ale jest obliczana wewnątrz modelu z tych samych danych o zachmurzeniu i atmosferze, więc dziedziczy te niepewności.

## Problem rozdzielczości

Gdy mówimy, że GFS ma „rozdzielczość 13 km," oznacza to, że każda komórka siatki ma w przybliżeniu 13 km × 13 km. Model oblicza jeden zestaw warunków atmosferycznych dla całego tego obszaru.

Twoja instalacja solarna zajmuje może 40 metrów kwadratowych.

Ta różnica skali ma realne konsekwencje. Chmura cumulusowa o szerokości 2 km może zacieniać Twoje panele przez 20 minut, ale jeśli znajduje się wewnątrz komórki siatki, która jest poza tym bezchmurna, model może raportować 10% zachmurzenia dla całej komórki — co przekłada się na łagodną, uśrednioną redukcję nasłonecznienia, a nie ostry wzorzec włącz-wyłącz, którego faktycznie doświadczasz.

Wyższa rozdzielczość pomaga. Niemieckie zagnieżdżenie ICON-a o 2,2 km zaczyna rozwiązywać pojedyncze komórki konwekcyjne. Ale nawet 2 km to ogrom w porównaniu z Twoim dachem.

Dlatego **wszystkie prognozy solarne mają dolną granicę niepewności**, której żadna sofistykacja modelu PV nie może pokonać. Model pogodowy po prostu nie widzi tego, co dzieje się w Twojej konkretnej lokalizacji z precyzją, jakiej doświadczają Twoje panele.

## Horyzont prognozy i degradacja trafności

Trafność NWP degraduje się z czasem, a tempo degradacji różni się w zależności od zmiennej:

**Prognozy temperatury** są stosunkowo stabilne. Przewidywania temperatury dzień-naprzód mieszczą się zwykle w 1-2°C, a nawet prognozy trzydniowe są rozsądne.

**Zachmurzenie** degraduje się znacznie szybciej. Prognozy zachmurzenia dzień-naprzód są użyteczne, ale często błędne co do timingu i pokrycia. Do trzeciego dnia konkretne przewidywania chmur są niewiarygodne.

**Nasłonecznienie** dziedziczy niepewność zachmurzenia. Przewidywania dziennych sum dzień-naprzód mogą mieścić się średnio w 15-20%. Prognozy godzinowe mogą być błędne o 50% lub więcej przy częściowym zachmurzeniu.

Ten wzorzec degradacji ma znaczenie dla tego, jak używasz prognozy. Dzień-naprzód: planuj zużycie. Trzy dni naprzód: tylko orientacyjne planowanie. Tydzień naprzód: co najwyżej ogólny trend.

## Cykle aktualizacji modeli

Globalne modele NWP uruchamiają się typowo co 6 godzin (00, 06, 12, 18 UTC). Każdy przebieg zajmuje 1-3 godziny obliczeń, więc zanim dane są dostępne, mają już kilka godzin. Prognoza z przebiegu 00 UTC może być dostępna dopiero o 03-04 UTC.

Dla prognozowania solarnego oznacza to, że poranne prognozy na „dziś" bazują na danych atmosferycznych sprzed kilku godzin. Warunki mogą się zmienić, szczególnie dla chmur konwekcyjnych, które rozwijają się szybko w wiosenne i letnie popołudnia.

## Dlaczego wiele modeli ma znaczenie

Żaden pojedynczy model NWP nie jest najlepszy wszędzie i zawsze. GFS może przewyższyć ECMWF dla konkretnego toru burzy. ICON może trafić zachmurzenie nad Europą Środkową, gdy GFS je mija.

Zaawansowane systemy prognostyczne używają **zespołów wielu modeli** — mieszając wyjścia z kilku modeli NWP, aby zredukować systematyczne odchylenia. Niektóre uruchamiają też **prognozy zespołowe** w ramach jednego modelu: zaburzają warunki początkowe i uruchamiają symulację wielokrotnie, by oszacować niepewność prognozy.

Zrozumienie skąd pochodzą dane pogodowe nie uczyni Twojej prognozy trafniejszą — ale pomoże zrozumieć, dlaczego niektóre dni prognoza trafia idealnie, a inne dni mija się z rzeczywistością. Model PV nie jest słabym ogniwem. Atmosfera jest.
