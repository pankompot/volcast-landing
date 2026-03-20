---
title: "Światło bezpośrednie a rozproszone — dlaczego pochmurne dni nadal generują prąd"
description: "Nie całe promieniowanie słoneczne jest takie samo. Zrozumienie trzech składników światła docierającego do paneli wyjaśnia, dlaczego zachmurzone dni wciąż produkują prąd — i dlaczego prognozowanie musi uwzględniać każdy z nich."
date: 2026-04-07
author: Michal
tags: ["nasłonecznienie", "promieniowanie-rozproszone", "promieniowanie-bezpośrednie", "fizyka-pv", "początkujący"]
series: "fundamentals"
seriesOrder: 3
lang: pl
seo:
  ogTitle: "Światło bezpośrednie vs rozproszone — dlaczego panele działają w pochmurne dni"
  ogDescription: "Twoje panele otrzymują trzy rodzaje światła: bezpośrednie, rozproszone i odbite. Dowiedz się, dlaczego każdy ma znaczenie."
  keywords: ["promieniowanie bezpośrednie vs rozproszone", "dlaczego panele działają w pochmurny dzień", "nasłonecznienie rozproszone", "GHI DNI DHI", "składniki promieniowania słonecznego"]
relatedPosts:
  - "jak-panele-sloneczne-zamieniaja-swiatlo-w-prad"
  - "dlaczego-panele-produkuja-wiecej-wiosna"
  - "nachylenie-i-azymut"
---

Jedno z najczęstszych pytań nowych właścicieli instalacji PV: „Czy moje panele produkują cokolwiek, gdy jest pochmurno?" Odpowiedź brzmi: tak — czasem zaskakująco dużo. Żeby zrozumieć dlaczego, musisz wiedzieć, że światło słoneczne docierające na Twój dach to nie jedna rzecz. To trzy rzeczy.

## Trzy składniki promieniowania słonecznego

Każdy wat energii słonecznej trafiający na Twój panel dociera jedną z trzech dróg.

### Bezpośrednie nasłonecznienie normalne (DNI)

To światło, które podróżuje w linii prostej od Słońca do panelu bez rozproszenia czy absorpcji. W pogodny dzień to dominujący składnik — ostre światło rzucające wyraźne cienie, które grzeje powierzchnie i zmusza do mrużenia oczu.

DNI jest silnie kierunkowe. Zależy mu na kącie między panelem a Słońcem. Panele skierowane prosto na Słońce odbierają maksymalne DNI; panele pod kątem ukośnym — proporcjonalnie mniej (zgodnie z prawem cosinusa).

W idealnie pogodny dzień w południe słoneczne w Europie Środkowej, DNI może przekroczyć 800-900 W/m² na powierzchni prostopadłej do Słońca.

### Rozproszone nasłonecznienie horyzontalne (DHI)

To światło, które zostało rozproszone przez atmosferę — przez cząsteczki powietrza (rozproszenie Rayleigha), aerozole (pył, zanieczyszczenia) i przede wszystkim chmury. Zamiast docierać z jednego kierunku, światło rozproszone przybywa z całej kopuły nieba.

W pogodny dzień DHI jest stosunkowo skromne — około 80-150 W/m². Ale w pochmurny dzień staje się **jedynym** źródłem nasłonecznienia i może nadal dostarczać 100-300 W/m² w zależności od grubości i rodzaju chmur.

Dlatego Twoje panele nadal produkują w pochmurne dni. Nawet gdy gęste chmury blokują każdy ślad bezpośredniego światła, niebo wciąż rozprasza światło w dół ze wszystkich kierunków.

### Nasłonecznienie odbite od podłoża

Trzeci składnik to światło, które odbija się od ziemi lub otaczających powierzchni, zanim trafi na panel. Jest mniejszy od pozostałych dwóch, ale nie jest pomijalny — szczególnie jeśli panele są pochylone (co przechwytuje więcej odbitego światła), a podłoże jest silnie odblaskowe.

Świeży śnieg może odbijać 60-80% padającego światła. Zielona trawa — około 20%. Ciemna gleba lub asfalt: 10-15%. W krajach nordyckich zimą odbicie od podłoża może znacząco zwiększyć produkcję.

Współczynnik odbicia powierzchni nazywa się **albedo**, a jego geograficzne znaczenie omówimy w późniejszym wpisie.

## GHI: liczba, którą zwykle widzisz

Większość stacji meteorologicznych i źródeł danych solarnych raportuje **Globalne Nasłonecznienie Horyzontalne (GHI)** — całkowitą moc słoneczną padającą na płaską poziomą powierzchnię. GHI to po prostu:

**GHI = DNI × cos(kąt zenitalny) + DHI**

To standardowa metryka, ale to nie jest to, co odbiera Twój pochylony panel. Przeliczenie GHI na nasłonecznienie Twojej konkretnej pochylonej powierzchni wymaga **modelu transpozycji** — matematycznego kroku, który rozdziela składniki i łączy je ponownie dla orientacji Twojego panelu. Więcej o tym w późniejszym wpisie.

## Jak zmiana proporcji zmienia wszystko

Podział między promieniowaniem bezpośrednim i rozproszonym zmienia się dramatycznie z warunkami, i tu prognozowanie staje się interesujące.

**Czyste niebo:** 70-85% bezpośrednie, 15-30% rozproszone. Orientacja panelu ma ogromne znaczenie.

**Częściowe zachmurzenie:** 30-60% bezpośrednie, 40-70% rozproszone. Gwałtowne wahania, gdy chmury przechodzą. Możesz zobaczyć skoki mocy o 50% w ciągu minut.

**Pełne zachmurzenie:** 0-10% bezpośrednie, 90-100% rozproszone. Kąt nachylenia panelu ma znacznie mniejsze znaczenie — światło przychodzi zewsząd. Płaski panel i panel pod kątem 35° otrzymują podobne ilości.

**Cienkie wysokie chmury (cirrusy):** 50-70% bezpośrednie, 30-50% rozproszone. Działają jak naturalny filtr, łagodnie redukując DNI przy jednoczesnym zwiększaniu DHI.

Ma to praktyczną konsekwencję: w klimatach z dużą ilością pochmurnych dni (witaj, północna Polska w listopadzie) optymalny kąt nachylenia paneli jest faktycznie mniejszy niż sugerowałyby teoretyczne obliczenia dla czystego nieba, ponieważ zbierasz głównie światło rozproszone.

## Niespodzianka pochmurnego dnia

W niektóre częściowo pochmurne dni możesz zobaczyć chwilowy skok mocy *powyżej* wartości dla czystego nieba. Nazywa się to **wzmocnienie chmurowe** — gdy światło odbite od krawędzi chmur łączy się z promieniowaniem bezpośrednim, chwilowo tworząc nasłonecznienie przekraczające to, co możliwe w bezchmurznych warunkach.

To prawdziwe zjawisko, dobrze udokumentowane w literaturze. Twój falownik może chwilowo raportować moc powyżej znamionowej panelu. To nie błąd pomiarowy — to fizyka robiąca coś użytecznego.

## Dlaczego to ma znaczenie dla prognozowania

Model prognostyczny, który przewiduje tylko „ile łącznie światła" bez rozkładu na składnik bezpośredni i rozproszony, będzie popełniał systematyczne błędy:

**Zawyży** produkcję w pochmurne dni dla stromo pochylonych paneli (które tracą większość rozproszonego światła z przeciwnej strony nieba).

**Zaniży** produkcję w pochmurne dni dla bardziej płaskich paneli (które efektywnie zbierają rozproszone światło z pełnej kopuły nieba).

Całkowicie pominie **zmienność przy częściowym zachmurzeniu**, która powoduje szybkie wahania produkcji.

Volcast radzi sobie z tym, modelując każdy składnik oddzielnie. Prognoza pogody dostarcza dane o zachmurzeniu i atmosferze; silnik fizyczny rozkłada je na DNI i DHI; model transpozycji przelicza je na Twoją pochyloną powierzchnię; a model PV oblicza wynikową moc elektryczną.

To bardziej złożone niż prosta tabela, ale tak właśnie działa fizyka — i dlatego prognoza pozostaje trafna niezależnie od tego, czy dzień jest słoneczny, pochmurny, czy chaotycznie mieszany.

<!-- internal-link: Czytaj dalej: [Nachylenie i azymut — co naprawdę robią z Twoim rocznym uzyskiem](/blog/nachylenie-i-azymut) -->

---

*Volcast rozkłada promieniowanie na składniki fizyczne dla Twojej konkretnej orientacji paneli. [Wypróbuj za darmo w Sklepie Play](https://play.google.com/store/apps/details?id=app.volcast).*
