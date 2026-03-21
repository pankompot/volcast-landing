---
title: "Prognozowanie solarne oparte na fizyce vs uczenie maszynowe — dlaczego podejście ma znaczenie"
description: "Dwa zasadniczo różne podejścia do prognozowania produkcji solarnej. Jedno modeluje fizykę, drugie uczy się z danych. Oto dlaczego ta różnica ma znaczenie."
date: 2026-04-07
tags: ["model-fizyczny", "uczenie-maszynowe", "prognozowanie", "metodologia"]
series: "deep-dives"
seriesOrder: 1
lang: pl
draft: true
seo:
  ogTitle: "Fizyka vs ML w prognozowaniu solarnym — które podejście jest trafniejsze?"
  keywords: ["prognoza solarna oparta na fizyce", "uczenie maszynowe prognoza PV", "porównanie metod prognozy solarnej", "metody prognozowania produkcji PV"]
relatedPosts: ["trzy-liczby-instalacji-pv", "jak-panele-sloneczne-zamieniaja-swiatlo-w-prad", "skad-sie-biora-prognozy-pogody"]
---

Jeśli szukasz „prognozy produkcji solarnej," znajdziesz dziesiątki aplikacji i serwisów. Wszystkie obiecują trafne przewidywania. Ale pod maską używają zasadniczo różnych podejść — a podejście determinuje, kiedy prognoza działa, kiedy zawodzi i czego potrzebuje od Ciebie.

Dwa obozy to **modelowanie fizyczne** i **uczenie maszynowe (ML)**. To nie różne narzędzia do tego samego zadania. One inaczej myślą o problemie.

## Podejście ML: nauka z historii

Prognoza oparta na uczeniu maszynowym działa tak: podajesz modelowi miesiące historycznych danych produkcji z Twojej instalacji wraz z odpowiadającymi danymi pogodowymi. Model znajduje statystyczne wzorce — „gdy temperatura wynosiła X, zachmurzenie Y, a wiatr Z, ta instalacja produkowała W watów."

Im więcej danych dostarczysz, tym lepiej model uczy się specyfiki Twojej instalacji: konkretnych wzorców zacienienia, zachowania falownika, efektów zabrudzenia, strat kablowych. Przy wystarczającej historii może niejawnie uchwycić efekty, które trudno byłoby zamodelować jawnie.

Brzmi potężnie i tak jest — z dwoma krytycznymi zastrzeżeniami.

**Zastrzeżenie pierwsze: problem zimnego startu.** Nowa instalacja nie ma historii. Model nie może nauczyć się tego, czego nie widział. Większość prognoz ML potrzebuje 2-6 miesięcy danych, zanim stanie się wiarygodna. W tym okresie — gdy prognoza jest Ci najbardziej potrzebna, bo dopiero poznajesz swój system — nie dostajesz nic użytecznego.

**Zastrzeżenie drugie: przesunięcie rozkładu.** Modele ML zakładają, że przyszłość przypomina przeszłość. Gdy warunki zmieniają się w sposób, którego model nie widział, ekstrapoluje słabo. Niespodziewana wiosenna śnieżyca, niezwykle pogodny zimowy tydzień, nowy budynek rzucający popołudniowy cień — to dokładnie momenty, w których chcesz trafnej prognozy, i dokładnie wtedy ML jest najmniej przygotowany.

## Podejście fizyczne: modelowanie z pierwszych zasad

Prognoza oparta na fizyce działa inaczej. Zamiast uczyć się statystycznych korelacji, symuluje fizyczny proces produkcji prądu ze światła słonecznego.

Łańcuch wygląda tak: zacznij od pozycji Słońca (obliczonej z astronomii), zamodeluj jak promieniowanie słoneczne przechodzi przez atmosferę (rozpraszanie, absorpcja, tłumienie przez chmury), rozłóż wynik na składniki bezpośredni i rozproszony, transponuj je na Twoją pochyloną powierzchnię panelu, oblicz temperaturę ogniwa i zastosuj konwersję fotowoltaiczną z korekcją temperaturową.

Każdy krok używa ugruntowanych równań fizycznych. Model transpozycji Pereza lub Haya-Daviesa. Transmisja atmosferyczna Beera-Lamberta. Model jedniodiodowy ogniwa PV. To nie zgadywanie — to te same równania, których inżynierowie PV używają do projektowania farm solarnych.

Model potrzebuje od Ciebie zaledwie trzech danych: kąta nachylenia, azymutu i mocy znamionowej. W połączeniu z lokalizacją (dla toru Słońca) i prognozą pogody (dla warunków atmosferycznych) oblicza oczekiwaną produkcję od zera.

## Gdzie każde podejście błyszczy

**ML jest lepszy gdy:**

Masz lata czystych danych produkcji i stabilne warunki. Model widział każdy wzorzec pogodowy, jaki Twoja lokalizacja doświadcza. Nic w instalacji się nie zmieniło. W tym scenariuszu ML może niejawnie uchwycić mikroefekty (częściowe zacienienie o 15:00 w grudniu, clipping falownika w szczycie), które model fizyczny wymagałby jawnej konfiguracji.

ML doskonale radzi sobie też z prognozowaniem bardzo krótkoterminowym (minuty do godzin) używając bieżących danych produkcji. Jeśli panele obecnie produkują 3,2 kW i niebo jest czyste, model ML może dobrze ekstrapolować następną godzinę bez rozumienia dlaczego.

**Fizyka jest lepsza gdy:**

Masz nową instalację. Zmieniłeś coś (dodałeś panele, nowe zacienienie). Warunki są nietypowe. Potrzebujesz prognozy w lokalizacji, której model nigdy nie widział. Chcesz kształt krzywej godzina po godzinie, nie tylko sumy dzienne. Nie chcesz udostępniać miesięcy danych produkcji firmie trzeciej.

Modele fizyczne są też bardziej przejrzyste. Gdy prognoza jest błędna, możesz zdiagnozować dlaczego — czy prognoza pogody się myliła? Czy model temperaturowy był niedokładny? Z ML błędy są nieprzejrzyste: model się mylił, bo model się mylił.

## Możliwość hybrydowa

Najsilniejsze podejście łączy oba. Fizyka jako fundament — daje strukturalne zrozumienie jak światło staje się prądem. Potem ML do kalibracji: jeśli model fizyczny systematycznie zawyża o 5% dla Twojej instalacji, cienka warstwa ML może nauczyć się tej korekty.

Daje to przewagę fizyki w zimnym starcie (działa od pierwszego dnia) z zdolnością ML do adaptacji do efektów specyficznych dla instalacji w czasie.

Volcast zaczyna od fizyki. Od pierwszej prognozy model uruchamia pełny łańcuch symulacji fizycznej. Nie musi widzieć, co Twoje panele robiły w zeszłym miesiącu, żeby przewidzieć, co zrobią jutro. Prawa fizyki nie mają okresu uczenia.

## Pytanie o trafność

Ludzie często pytają: „Które jest trafniejsze?" Szczera odpowiedź — to zależy od horyzontu czasowego i co rozumiesz przez trafność.

Dla **prognoz dzień-naprzód** oba podejścia są ograniczone głównie przez niepewność prognozy pogody — nie przez model PV. Niezależnie czy używasz fizyki czy ML, jeśli prognoza pogody mówi „pogodnie" a pada deszcz, Twoja prognoza produkcji będzie błędna.

Dla **kształtu krzywej godzinowej** fizyka zwykle wygrywa. Poprawnie modeluje poranny wzrost, szczyt w południe i wieczorny spadek na podstawie geometrii.

Dla **długoterminowej estymacji uzysku energii** fizyka jest bardziej solidna, bo nie nadmiernie dopasowuje się do wzorców pogodowych konkretnego okresu.

Dla **nowcastingu** (następne 15-60 minut) ML z danymi w czasie rzeczywistym zwykle wygrywa, bo szybciej reaguje na bieżące warunki.

Prawdziwe pytanie to nie „co jest trafniejsze" ale „co daje mi użyteczną prognozę z tym, co mam teraz." Jeśli zaczynasz od zera lub cenisz przejrzystość, fizyka jest właściwym fundamentem.

## Dlaczego to ma znaczenie dla Ciebie

Z narzędziem fizycznym dostajesz działającą prognozę od pierwszego dnia. Nie musisz czekać. Nie musisz eksportować danych z portalu falownika. Nie musisz powierzać historii produkcji firmie trzeciej.

Dostajesz też prognozę, o której możesz rozumować. Jeśli prognoza mówi 25 kWh jutro a dostajesz 18 kWh, możesz sprawdzić: czy pogoda różniła się od prognozy? Czy było nieoczekiwane zacienienie? Model fizyczny daje ramę do zrozumienia różnicy.

Taki rodzaj prognozy dostarcza Volcast — a w kolejnych wpisach zagłębimy się w każdy krok łańcucha symulacji fizycznej.
