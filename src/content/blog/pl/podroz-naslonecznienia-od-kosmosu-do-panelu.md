---
title: "Podróż nasłonecznienia: od kosmosu do Twojego panelu w 8 krokach"
description: "Podążaj za promieniem słońca od krawędzi atmosfery przez rozpraszanie, absorpcję, chmury i odbicia aż do Twojego pochylonego panelu, gdzie staje się prądem."
date: 2026-04-17
tags: ["nasłonecznienie", "fizyka-atmosfery", "widmo-słoneczne", "fizyka-pv", "prognozowanie"]
series: "deep-dives"
seriesOrder: 4
lang: pl
draft: true
seo:
  ogTitle: "Od kosmosu do panelu słonecznego — kompletna podróż nasłonecznienia"
  keywords: ["nasłonecznienie atmosfera", "jak światło dociera do paneli", "tłumienie atmosferyczne", "modelowanie nasłonecznienia"]
relatedPosts: ["swiatlo-bezposrednie-vs-rozproszone", "dlaczego-zachmurzenie-najtrudniejsza-zmienna", "modele-transpozycji"]
---

Foton opuszcza powierzchnię Słońca podróżując z prędkością 300 000 km/s. Osiem minut i dwadzieścia sekund później wchodzi w atmosferę Ziemi. To, co dzieje się potem — w ostatnich stu kilometrach 150-milionowej podróży — decyduje, czy stanie się prądem na Twoim dachu czy ciepłem na chodniku.

Oto kompletny łańcuch, który prognoza oparta na fizyce musi modelować.

## Krok 1: Nasłonecznienie pozaatmosferyczne

Powyżej atmosfery promieniowanie słoneczne jest niezwykle przewidywalne. **Stała słoneczna** — moc na metr kwadratowy prostopadły do promieni słonecznych w średniej odległości Ziemi — wynosi około 1361 W/m².

Wartość ta zmienia się nieznacznie (~3,4%) z powodu eliptycznej orbity Ziemi. Jesteśmy najbliżej Słońca na początku stycznia (peryhelium) i najdalej na początku lipca (afelium). Nieintuicyjnie, półkula północna otrzymuje nieco więcej nasłonecznienia pozaatmosferycznego zimą niż latem. Efekt jest mały, ale model fizyczny go uwzględnia.

## Krok 2: Masa powietrza i długość drogi

Światło wchodzi w atmosferę pod kątem określonym przez elewację Słońca. Gdy Słońce jest bezpośrednio nad głową (kąt zenitalny = 0°), światło pokonuje najkrótszą drogę przez atmosferę — definiowaną jako Masa Powietrza 1,0 (AM1,0).

Gdy Słońce opada ku horyzontowi, droga się wydłuża. Przy kącie zenitalnym 60° światło przechodzi przez dwa razy więcej atmosfery (AM2,0). Przy zachodzie masa powietrza może przekroczyć 30.

Więcej atmosfery oznacza więcej tłumienia. Dlatego panele produkują znacznie mniej o 7 rano niż w południe — światło zostało przefiltrowane przez więcej powietrza.

## Krok 3: Rozpraszanie Rayleigha

Cząsteczki powietrza (azot, tlen) rozpraszają światło. Krótsze długości fali (niebieskie, fioletowe) rozpraszają się bardziej niż dłuższe (czerwone). Dlatego niebo jest niebieskie — widzisz rozproszone krótkofalowe światło ze wszystkich kierunków.

Dla PV, rozpraszanie Rayleigha przekierowuje część promieniowania bezpośredniego w rozproszone promieniowanie nieba. Efekt jest obliczalny z ciśnienia atmosferycznego i kąta Słońca. Redukuje bezpośrednie nasłonecznienie o około 10-15% przy czystym niebie i przekierowuje tę energię w składnik rozproszony.

## Krok 4: Absorpcja i rozpraszanie na aerozolach

Aerozole — pył, cząstki zanieczyszczeń, sól morska, dym, pyłki — rozpraszają i absorbują światło znacznie bardziej niż czyste cząsteczki powietrza.

W czystym powietrzu morskim optyczna grubość aerozolu (AOD) może wynosić 0,05 — ledwo zauważalna. W zanieczyszczonym kontynentalnym mieście podczas smogu AOD może osiągnąć 0,5-1,0, redukując bezpośrednie nasłonecznienie o 30-50%.

Dla Polski typowe wartości AOD wahają się od 0,1 (czyste powietrze zimowe) do 0,3 (letni pył, wypalanie rolnicze). Epizody pyłu saharyjskiego sporadycznie docierają do Europy Środkowej, znacząco zwiększając AOD na kilka dni.

## Krok 5: Absorpcja przez ozon i gazy

Ozon w stratosferze absorbuje promieniowanie UV. Para wodna w troposferze absorbuje specyficzne długości fali w podczerwieni, tworząc pasma absorpcji. CO₂, metan i inne gazy cieplarniane mają niewielkie efekty absorpcyjne — zasadniczo stałe i wbudowane w standardowe modele atmosferyczne.

## Krok 6: Tłumienie przez chmury

Chmury to dominujący modyfikator nasłonecznienia powierzchniowego. Działają zarówno jako absorbery, jak i rozpraszacze, dramatycznie redukując promieniowanie bezpośrednie, jednocześnie częściowo konwertując je na rozproszone.

Fizyka jest złożona: optyczna grubość chmury zależy od zawartości wody ciekłej, rozkładu wielkości kropelek i pionowej rozciągłości chmury. Cienkie cirrusy mogą mieć grubość optyczną 0,5-2, przepuszczając większość światła. Gęste cumulonimbusy mogą przekroczyć grubość optyczną 100, blokując zasadniczo całe promieniowanie bezpośrednie.

## Krok 7: Dotarcie do powierzchni — GHI

Po przetrwaniu atmosfery promieniowanie dociera do powierzchni jako **Globalne Nasłonecznienie Horyzontalne (GHI)** — całkowita moc słoneczna na płaskiej poziomej powierzchni. To suma promieniowania bezpośredniego (rzutowanego na poziom) i rozproszonego promieniowania nieba.

W pogodny letni dzień na polskich szerokościach szczytowe GHI osiąga około 800-950 W/m². W pochmurny dzień może wynosić 100-300 W/m².

Ale GHI to nie to, co odbierają Twoje panele — bo Twoje panele nie są poziome.

## Krok 8: Transpozycja na Twoją pochyloną powierzchnię

Ten ostatni krok — omówiony szczegółowo w następnym wpisie — bierze horyzontalne składniki nasłonecznienia i oblicza, co dociera do Twojej konkretnej orientacji panelu. Uwzględnia kąt padania dla promieniowania bezpośredniego, współczynnik widoczności nieba dla promieniowania rozproszonego i promieniowanie odbite od podłoża.

Panel południowy pod 35° w Warszawie otrzymuje zupełnie inny profil nasłonecznienia niż panel zachodni pod 20°, choć są pod tym samym niebem.

## Kompletny łańcuch

Składając to razem: nasłonecznienie pozaatmosferyczne → tłumienie przez masę powietrza → rozpraszanie Rayleigha → efekty aerozoli → absorpcja gazowa → tłumienie chmurowe → GHI na powierzchni → transpozycja na pochyloną powierzchnię → korekta temperatury ogniwa → moc elektryczna.

Każdy krok jest rządzony przez fizykę. Każdy krok wprowadza pewną niepewność. Łączny efekt to prognoza uchwytująca fundamentalne zachowanie systemu, jednocześnie dziedzicząca ograniczenia prognozy pogody.

To właśnie oblicza Volcast dla każdej godziny każdej prognozy. Nie tabela odniesień. Nie regresja statystyczna. Rzeczywisty łańcuch fizyczny, kalkulowany z Twoich trzech parametrów wejściowych i najlepszych dostępnych danych pogodowych.
