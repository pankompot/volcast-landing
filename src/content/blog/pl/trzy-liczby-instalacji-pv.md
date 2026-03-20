---
title: "Trzy liczby, które definiują Twoją instalację PV (i dlaczego Volcast potrzebuje tylko ich)"
description: "Nachylenie, azymut i moc znamionowa — te trzy parametry wystarczą prognozie opartej na fizyce do przewidywania produkcji."
date: 2026-03-24
tags: ["konfiguracja", "parametry", "pierwsze-kroki", "podstawy-pv", "początkujący"]
series: "fundamentals"
seriesOrder: 5
lang: pl
draft: false
seo:
  ogTitle: "Trzy liczby definiujące Twoją instalację solarną — i dlaczego to wystarczy"
  keywords: ["parametry instalacji PV", "konfiguracja systemu fotowoltaicznego", "dane do prognozy solarnej", "konfiguracja Volcast"]
relatedPosts: ["nachylenie-i-azymut", "jak-panele-sloneczne-zamieniaja-swiatlo-w-prad"]
---

Większość narzędzi do prognozowania solarnego wymaga długiej listy danych wejściowych lub tygodni historii produkcji, zanim wygeneruje przydatną prognozę. Volcast pyta o trzy liczby plus Twoją lokalizację (którą telefon już zna). To wszystko.

To nie ograniczenie — to świadoma decyzja projektowa wynikająca ze sposobu działania modelowania fizycznego. Przejdźmy przez to, co każda liczba mówi modelowi i dlaczego trzy wystarczą.

## Liczba 1: Kąt nachylenia

**Co to jest:** Kąt Twoich paneli względem poziomego gruntu, w stopniach. 0° to płasko, 90° to pionowo.

**Co mówi modelowi:** Jak obliczyć kąt padania — kąt między padającymi promieniami słonecznymi a powierzchnią panelu — w każdym momencie dnia. To bezpośrednio określa, ile dostępnego bezpośredniego nasłonecznienia Twój panel przechwytuje.

Kąt padania zasila również obliczenie **odbicia Fresnela**. Przy stromych kątach padania (światło uderzające w szkło niemal bokiem) więcej światła odbija się od powierzchni zamiast wnikać do ogniwa. To ta sama fizyka, która sprawia, że powierzchnia jeziora wygląda jak lustro o zachodzie słońca.

**Jak go znaleźć:** Jeśli panele są na skośnym dachu, nachylenie równa się kątowi dachu. Typowe wartości w Europie: 15-45°. Jeśli nie znasz kąta dachu, aplikacja inklinometr na smartfonie przyłożona do panelu daje odpowiedź w kilka sekund. Dla instalacji na płaskim dachu lub naziemnych, nachylenie odpowiada ustawieniu ramy montażowej.

**Wrażliwość:** Roczny uzysk zmienia się powoli z nachyleniem. Błąd o 5° zmienia produkcję o około 1-2%. Nie przemyślaj tego — rozsądne przybliżenie wystarczy.

## Liczba 2: Kąt azymutu

**Co to jest:** Kierunek kompasowy, w którym zwrócony jest panel. 180° to czyste południe (optimum na półkuli północnej), 90° to wschód, 270° to zachód.

**Co mówi modelowi:** Kiedy w ciągu dnia panele odbierają najwięcej bezpośredniego światła. Panel południowy szczytuje w południe słoneczne. Wschodni — rano. To kształtuje całą dzienną krzywą produkcji.

Azymut wpływa też na ilość światła odbitego od podłoża docierającego do panelu oraz na rozkład rozproszonego promieniowania nieba w polu widzenia panelu.

**Jak go znaleźć:** Aplikacja kompas na telefonie skierowana na panele daje azymut. Lub spójrz na dach w Google Maps — na półkuli północnej południe jest na dole. Jeśli masz instalację wschód-zachód, możesz skonfigurować dwie grupy w Volcast.

**Wrażliwość:** Jak nachylenie, roczny uzysk zmienia się łagodnie. Odchylenie o 30° od południa kosztuje około 3-5%. Nawet panele wschodnie czy zachodnie zbierają 80-85% teoretycznego maksimum.

## Liczba 3: Moc znamionowa (kWp)

**Co to jest:** Moc nominalna instalacji w kilowatach szczytowych (kWp). To łączna moc wyjściowa w Standardowych Warunkach Testowych (STC): 1000 W/m² nasłonecznienia, 25°C temperatura ogniwa, widmo słoneczne AM1.5.

**Co mówi modelowi:** Współczynnik skalowania dla całego obliczenia. Silnik fizyczny oblicza, jaka część nasłonecznienia STC dociera do Twojej pochylonej powierzchni w danym momencie, stosuje korekty temperaturowe i straty optyczne, i mnoży przez moc znamionową, aby uzyskać oczekiwaną moc w watach.

W modelu fizycznym kWp to most między modelem nasłonecznienia (który daje W/m² użytecznej energii) a wyjściem elektrycznym (o które Ci chodzi). Zawiera w sobie sprawność panelu, łączną powierzchnię i charakterystykę ogniw w jednej liczbie.

**Jak ją znaleźć:** Jest na umowie instalacyjnej, wyświetlaczu falownika lub tabliczkach znamionowych paneli. Typowe wartości mieszkaniowe: 3-15 kWp. System z 10 paneli po 400W to 4,0 kWp.

**Wrażliwość:** To jedyna liczba, którą powinieneś podać dokładnie. Błąd o 10% w mocy znamionowej oznacza 10% błędu w prognozie — zależność jest liniowa. Ale to też najłatwiejsza liczba do precyzyjnego ustalenia, bo jest zapisana w Twoich dokumentach.

## A co z lokalizacją?

Lokalizacja to technicznie czwarte wejście, ale Volcast pobiera ją automatycznie z GPS telefonu lub pozwala wskazać ją na mapie. Z Twoich współrzędnych model wyprowadza wszystko o torze Słońca: deklinację słoneczną, kąty godzinne, wschody i zachody, elewację i azymut Słońca w każdym momencie roku.

Lokalizacja wybiera też odpowiedni punkt siatki prognozy pogody. Dane modeli pogodowych są na siatce geograficznej (typowo 0,1-0,25° dla modeli regionalnych), a Twoja lokalizacja określa, które komórki są używane i jak są interpolowane.

## Dlaczego nie więcej parametrów?

Możesz się zastanawiać: czy model nie powinien znać konkretnej marki panelu, sprawności falownika, strat kablowych czy wzorców zacienienia?

Rzecz w tym, że dla **prognozy** dodatkowe parametry dają malejące zyski:

**Marka/model panelu** głównie wpływa na moc znamionową (którą już podajesz) i współczynnik temperaturowy. Współczynniki temperaturowe paneli krzemowych skupiają się ciasno między -0,35% a -0,45%/°C. Użycie średniej wprowadza może 1-2% błędu w gorące dni. Dla celów prognostycznych to szum wobec niepewności pogodowej.

**Sprawność falownika** powyżej 96-98% dla nowoczesnych urządzeń oznacza straty 2-4%. Różnica między markami jest niewielka. Znów poniżej szumu prognozy pogody.

**Straty kablowe** to typowo 1-3% i są dość stałe. Skalują wszystko równomiernie bez wpływu na kształt prognozy.

**Zacienienie** to jedyny parametr, który naprawdę ma znaczenie i nie jest uchwycony przez trzy liczby. Jeśli masz istotne zacienienie (drzewa, kominy, sąsiednie budynki), Twoja rzeczywista produkcja będzie systematycznie niższa od prognozy. To znane ograniczenie — Volcast podaje teoretyczne maksimum dla Twojej orientacji, a Ty możesz mentalnie skorygować o znane zacienienie.

Filozofia: **uchwycić fizykę, która ma największe znaczenie, przy najmniejszej liczbie danych**. Nachylenie, azymut i moc dają dokładność 90-95%. Pozostałe 5-10% wynika z czynników, które są albo trudne do zmierzenia (zacienienie, zabrudzenie), albo tak mało różnią się między instalacjami, że uśrednienie jest OK.

## Porównanie z ML

Ta prostota to bezpośrednia przewaga nad podejściami opartymi na uczeniu maszynowym. Model ML potrzebuje tygodni lub miesięcy historii produkcji, by nauczyć się, jak Twoja instalacja zachowuje się w różnych warunkach. Dopóki nie ma tych danych, nie może prognozować. A gdy warunki się zmieniają (nowe zacienienie od rosnącego drzewa, degradacja paneli, dodane moduły), model potrzebuje czasu na ponowną naukę.

Fizyka nie ma okresu uczenia. Mając trzy liczby i prognozę pogody, oblicza oczekiwaną produkcję z pierwszych zasad — tych samych zasad, które rządziły energią słoneczną, zanim Twoje panele zostały wyprodukowane.

Na tym polega siła modelowania fizyki zamiast dopasowywania danych.

