---
title: "Nowcasting vs prognoza dniowa vs tygodniowa — trafność w każdym horyzoncie"
description: "Prognoza na 15 minut i prognoza na 7 dni to fundamentalnie różne problemy. Co każdy horyzont może realistycznie dostarczyć i gdzie trafność się załamuje."
date: 2026-04-24
tags: ["nowcasting", "horyzont-prognozy", "trafność", "szeregi-czasowe", "prognozowanie"]
series: "deep-dives"
seriesOrder: 6
lang: pl
draft: true
seo:
  ogTitle: "Trafność prognozy solarnej według horyzontu — od nowcastingu do tygodniowej"
  keywords: ["nowcasting solarny", "trafność prognozy dzień naprzód", "horyzont prognozy solarnej", "krótkoterminowa prognoza PV"]
relatedPosts: ["fizyka-vs-ml-prognozowanie-solarne", "dlaczego-zachmurzenie-najtrudniejsza-zmienna", "skad-sie-biora-prognozy-pogody"]
---

Nie wszystkie prognozy to ten sam problem. Przewidywanie produkcji solarnej na następne 30 minut, na jutro i na przyszły tydzień wymaga różnych źródeł danych, różnych metod i dostarcza bardzo różnych poziomów trafności.

Zrozumienie, co każdy horyzont czasowy może realistycznie zaoferować, pomaga efektywnie korzystać z prognozy — i chroni przed rozczarowaniem, gdy 5-dniowa prognoza nie jest precyzyjna do kilowatogodziny.

## Nowcasting: następne 0-6 godzin

Nowcasting to najkrótszy horyzont. Odpowiada na pytanie: „Co moje panele wyprodukują w następnych minutach do godzin?"

Najlepsze podejścia do nowcastingu nie polegają w ogóle na modelach NWP. Zamiast tego używają:

**Obrazów satelitarnych** — satelity geostacjonarne fotografują pola chmur co 5-15 minut. Śledząc ruch chmur między klatkami, można ekstrapolować ich pozycję 30-120 minut naprzód. To podejście „wektora ruchu chmur" uchwytuje bieżące warunki znacznie lepiej niż model pogodowy zainicjalizowany 3-6 godzin temu.

**Kamer nieba** — naziemna kamera typu rybie oko fotografuje niebo co minutę. Przetwarzanie obrazu wykrywa chmury, estymuje ich prędkość i kierunek, i przewiduje, kiedy zacienią Twoje konkretne panele.

**Bieżących danych produkcji** — jeśli aktualna produkcja to 3,8 kW i warunki są stabilne, następne 15 minut będzie prawdopodobnie blisko 3,8 kW. Modele persystencji (zakładające kontynuację bieżących warunków) są zaskakująco skuteczne dla bardzo krótkich horyzontów.

**Trafność:** Dla okna 0-30 minut, metody persystencji i satelitarne mogą osiągnąć średnie błędy bezwzględne 5-10% mocy zainstalowanej przy stabilnych warunkach.

## Prognoza śróddniowa: 6-24 godziny naprzód

Ten horyzont obejmuje „resztę dzisiejszej produkcji" i „jutrzejszy poranek." Modele NWP stają się głównym źródłem danych, ale ich najnowszy przebieg jest jeszcze dość świeży.

**Trafność:** Prognozy dzień-naprzód dla dziennej sumy energii mieszczą się typowo w 15-25% rzeczywistej produkcji. Pojedyncze godziny mogą odchylać się bardziej — szczególnie w oknie 11:00-15:00, gdy chmury konwekcyjne są najbardziejprawdopodobne.

**Co działa:** Modele fizyczne błyszczą tu, bo poprawnie przewidują kształt krzywej produkcji (poranny wzrost, timing szczytu, wieczorny spadek) z geometrii. Nawet jeśli łączna energia jest błędna przez chmury, kształt krzywej jest fizycznie ograniczony i zwykle poprawny.

**Co zawodzi:** Konkretny timing chmur. Prognoza może przewidywać 40% spadek produkcji o 14:00, gdy faktycznie zdarza się o 11:00.

## Prognoza krótkoterminowa: 1-3 dni naprzód

W tym zakresie modele NWP nadal dostarczają użytecznych wskazówek, ale przewidywania zachmurzenia stają się coraz bardziej niepewne. Prognozy temperatury pozostają dobre (w granicach 2-3°C). Wielkoskalowe wzorce pogodowe są dobrze uchwycone.

**Trafność:** Sumy dzienne w granicach 20-30% dla dni 2-3. Profile godzinowe stają się wskazówkami, nie przewidywaniami.

**Do czego się nadaje:** Planowanie dnia na pranie, czy jutro warto odłożyć energochłonne zadanie, ogólne planowanie zużycia na kilka dni.

## Prognoza średnioterminowa: 4-7 dni naprzód

Modele pogodowe w tym zakresie uchwytują wielkoskalowe wzorce, ale mają trudności ze szczegółami. Chaotyczna natura atmosfery sprawia, że małe błędy warunków początkowych rosną wykładniczo — zjawisko znane jako „efekt motyla."

**Trafność:** Sumy dzienne mogą mieścić się w 30-40%. Pojedyncze godziny to zasadniczo szum. Prognoza może powiedzieć „czwartek będzie słoneczniejszy niż środa," ale nie „czwartek wyprodukuje 22,3 kWh."

## Zakres rozszerzony: 1-2 tygodnie i dalej

Powyżej tygodnia deterministyczne prognozy pogody tracą większość konkretnej trafności. Prognozy zespołowe dostarczają wskazówek probabilistycznych — „70% szans na ponadprzeciętne warunki słoneczne w przyszłym tygodniu" — ale nie konkretnych liczb produkcji.

## Co dostarcza Volcast

Volcast skupia się na horyzoncie dzień-naprzód — punkcie optymalnym, gdzie prognozowanie oparte na fizyce dostarcza największą praktyczną wartość. Dostajesz godzinową krzywą produkcji na następny dzień, aktualizowaną gdy pojawiają się świeże dane pogodowe.

To jest actionable horyzont: wystarczająco bliski, że modele pogodowe dostarczają użyteczne przewidywania chmur, wystarczająco daleki, że możesz zaplanować jutrzejsze zużycie, i obejmujący cały dzień, żebyś widział kompletny kształt krzywej produkcji.

Prognoza nie udaje precyzyjnej w dłuższych horyzontach, gdzie fizyka tego nie wspiera. I nie próbuje nowcastingu w czasie rzeczywistym, który wymaga innej infrastruktury.

Dzień-naprzód, godzinowo, oparta na fizyce. Tam stosunek sygnału do szumu jest najlepszy.
