---
title: "Modele transpozycji: jak Volcast oblicza co trafia na Twój pochylony panel"
description: "Dane pogodowe mówią o powierzchni poziomej. Twoje panele są pochylone. Matematyczny most między nimi to transpozycja — a wybór modelu ma znaczenie."
date: 2026-04-21
tags: ["transpozycja", "model-pereza", "nasłonecznienie", "orientacja-paneli", "prognozowanie"]
series: "deep-dives"
seriesOrder: 5
lang: pl
draft: true
seo:
  ogTitle: "Modele transpozycji — przeliczanie nasłonecznienia na pochylony panel"
  keywords: ["model transpozycji solar", "model Pereza nasłonecznienie", "nasłonecznienie pochyłej powierzchni", "obliczanie POA"]
relatedPosts: ["nachylenie-i-azymut", "swiatlo-bezposrednie-vs-rozproszone", "podroz-naslonecznienia-od-kosmosu-do-panelu"]
---

Stacje pogodowe i modele NWP raportują promieniowanie słoneczne na poziomej powierzchni. Twoje panele są pochylone pod kątem 30°, 45° lub zamontowane na skośnym dachu. Krok matematyczny konwertujący horyzontalne nasłonecznienie na to, co faktycznie otrzymuje Twój konkretny panel, nazywa się **transpozycją** — i to jedno z miejsc, gdzie prognozowanie oparte na fizyce pokazuje swoją wartość.

## Problem

Globalne Nasłonecznienie Horyzontalne (GHI) to standardowy pomiar — to, co rejestrują piranometry na stacjach meteorologicznych i co obliczają modele NWP.

Ale nasłonecznienie na Twoim pochylonym panelu — zwane **nasłonecznieniem płaszczyzny modułu (POA)** — różni się od GHI. W pogodny zimowy dzień panel południowy pochylony pod kątem może otrzymywać znacznie *więcej* nasłonecznienia niż powierzchnia pozioma, bo przechwytuje niskie zimowe słońce bardziej bezpośrednio.

Zależność między GHI a POA zależy od pozycji Słońca (zmienia się co minutę), nachylenia i azymutu panelu oraz — co kluczowe — proporcji między promieniowaniem bezpośrednim a rozproszonym.

## Krok 1: Dekompozycja

Przed transpozycją trzeba rozdzielić GHI na składniki: Bezpośrednie Nasłonecznienie Normalne (DNI) i Rozproszone Nasłonecznienie Horyzontalne (DHI). Jeśli źródło pogodowe podaje je oddzielnie, świetnie. Jeśli podaje tylko GHI, potrzebny jest **model dekompozycji** do estymacji podziału.

Modele dekompozycji używają indeksu czystości (stosunku GHI na powierzchni do nasłonecznienia pozaatmosferycznego). Czyste niebo ma wysoki indeks i wysoką frakcję bezpośrednią. Pochmurne niebo ma niski indeks i wysoką frakcję rozproszoną.

Ten krok wprowadza niepewność — to samo GHI może wynikać z różnych kombinacji bezpośredniego i rozproszonego promieniowania.

## Krok 2: Transpozycja promieniowania bezpośredniego

Składnik bezpośredni to prosta geometria. DNI przychodzi z kierunku Słońca. Frakcja przechwycona przez pochyloną powierzchnię podąża za **cosinusem kąta padania** — kąta między promieniami Słońca a normalną do powierzchni panelu.

Gdy Słońce jest wprost naprzeciwko panelu (kąt padania = 0°), przechwycujesz 100% DNI. W miarę wzrostu kąta, przechwycujesz mniej, zgodnie z krzywą cosinusową. Przy 60° przechwycujesz 50%. Przy 90° — nic.

Ten składnik transpozycji jest zasadniczo dokładny.

## Krok 3: Transpozycja rozproszona — gdzie modele się różnią

To jest trudna część. Promieniowanie rozproszone przychodzi z całego nieba — ale nie równomiernie. Niebo w pobliżu Słońca jest jaśniejsze niż niebo po przeciwnej stronie. Horyzont jest jaśniejszy niż zenit w pewnych warunkach. Chmury tworzą jasne i ciemne plamy.

Pochylony panel widzi tylko część kopuły nieba. Różne modele transpozycji przyjmują różne założenia o rozkładzie jasności nieba:

**Model izotropowy** — najprostszy. Zakłada, że promieniowanie rozproszone jest równomierne na całej kopule nieba. Pochylona powierzchnia otrzymuje frakcję proporcjonalną do współczynnika widoczności nieba: (1 + cos(nachylenie)) / 2.

Ten model jest trywialny obliczeniowo, ale systematycznie błędny. Prawdziwe niebo nie jest równomierne.

**Model Haya-Daviesa** — dodaje składnik obwódki słonecznej. Traktuje część promieniowania rozproszonego jako przychodzącą z kierunku Słońca, a resztę jako izotropową. Trafniejszy niż izotropowy, szczególnie przy czystym i częściowo czystym niebie.

**Model Pereza** — najszerzej stosowany w branży PV. Rozkłada promieniowanie rozproszone na trzy składniki: izotropowe tło, rozjaśnienie obwódki słonecznej (region wokół Słońca) i rozjaśnienie horyzontu (jasne pasmo wzdłuż horyzontu). Używa współczynników empirycznych z rozległych kampanii pomiarowych.

Model Pereza osiąga typowo 5-10% lepszą trafność niż izotropowy dla pochylonych powierzchni, z największą poprawą dla stromych nachyleń i czystego nieba. Dla płaskich paneli lub pełnego zachmurzenia wszystkie modele zbiegają się.

## Krok 4: Składnik odbity od podłoża

Światło odbijające się od ziemi i uderzające w panel od dołu dodaje trzeci wkład. Oblicza się go jako: GHI × albedo × (1 - cos(nachylenie)) / 2.

Albedo podłoża różni się: świeży śnieg 0,6-0,8, zielona trawa 0,2, ciemna gleba 0,1, beton 0,3. Większy kąt nachylenia przechwytuje więcej odbitego światła.

Dla większości instalacji odbicie od podłoża wnosi 2-5% łącznego POA. W środowiskach pokrytych śniegiem przy stromym nachyleniu może osiągnąć 10-15%.

## Składając całość

Łączne nasłonecznienie POA = transponowane bezpośrednie + transponowane rozproszone + odbite od podłoża.

Ta pojedyncza liczba, obliczona dla każdej godziny prognozy, zasila model ogniwa PV do obliczenia mocy elektrycznej. Krok transpozycji to miejsce, gdzie Twoje dane o nachyleniu i azymucie stają się krytyczne — kształtują całą dzienną krzywą produkcji.

Panel południowy pod 35° w Warszawie szczytuje ostro około południa słonecznego. Panel wschodni szczytuje o 9-10 rano. Płaski panel ma szeroką, niższą krzywą. Te kształty bezpośrednio decydują, kiedy planować ciężkie zużycie, ładować EV czy oczekiwać nadwyżki do eksportu.

Volcast implementuje model transpozycji Pereza. Dla każdej godziny prognozy rozkłada nasłonecznienie z modelu pogodowego, oblicza pozycję Słońca, wyznacza kąt padania na Twój panel, stosuje model Pereza z jego składnikami obwódki i horyzontu, dodaje odbicie od podłoża — i uzyskuje nasłonecznienie POA zasilające krok konwersji PV.

Dlatego prognoza poprawnie oddaje kształt Twojej dziennej krzywej produkcji — nie tylko sumę.
