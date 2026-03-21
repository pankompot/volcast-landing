---
title: "Nowcasting vs Day-Ahead vs Weekly — Accuracy at Every Time Horizon"
description: "A 15-minute forecast and a 7-day forecast are fundamentally different problems. Here's what each time horizon can realistically deliver and where accuracy breaks down."
date: 2026-04-24
tags: ["nowcasting", "forecast-horizon", "accuracy", "time-series", "forecasting"]
series: "deep-dives"
seriesOrder: 6
lang: en
draft: true
seo:
  ogTitle: "Solar Forecast Accuracy by Time Horizon — Nowcasting to Weekly"
  keywords: ["solar nowcasting", "day ahead solar forecast accuracy", "solar forecast time horizon", "short term solar prediction"]
relatedPosts: ["physics-vs-ml-solar-forecasting", "why-cloud-cover-hardest-variable", "where-weather-forecasts-come-from"]
---

Not all forecasts are the same problem. Predicting your solar production for the next 30 minutes, for tomorrow, and for next week require different data sources, different methods, and deliver very different levels of accuracy.

Understanding what each time horizon can realistically offer helps you use the forecast effectively — and stops you from being disappointed when a 5-day forecast isn't precise to the kilowatt-hour.

## Nowcasting: The Next 0-6 Hours

Nowcasting is the shortest horizon. It answers: "What will my panels produce in the next few minutes to hours?"

The best nowcasting approaches don't rely on NWP models at all. Instead, they use:

**Satellite imagery** — geostationary satellites photograph cloud fields every 5-15 minutes. By tracking how clouds move between frames, you can extrapolate their position 30-120 minutes ahead. This "cloud motion vector" approach captures current conditions far better than a weather model that was initialized 3-6 hours ago.

**Sky cameras** — a ground-based fisheye camera at or near the installation photographs the sky every minute. Image processing detects clouds, estimates their speed and direction, and predicts when they'll shade your specific panels. This gives hyper-local nowcasts down to 1-5 minute resolution.

**Real-time production data** — if your current production is 3.8 kW and conditions are stable, the next 15 minutes will likely be close to 3.8 kW. Persistence models (assuming current conditions continue) are surprisingly effective for very short horizons.

**Accuracy:** For the 0-30 minute window, persistence and satellite-based methods can achieve mean absolute errors of 5-10% of installed capacity under stable conditions. During cloud transitions, errors spike but recover quickly.

**Limitation:** Nowcasting can't predict weather changes that haven't started yet. A cloud system forming 50 km away won't appear in satellite extrapolation until it's much closer.

## Intraday: 6-24 Hours Ahead

This horizon covers "today's remaining production" and "tomorrow morning." It's where NWP models become the primary data source, but their most recent run is still reasonably fresh.

The atmosphere has limited predictability at this scale — the current state constrains what can happen in the next 12-24 hours, but mesoscale processes (convective cloud development, sea breezes, mountain effects) introduce significant uncertainty.

**Accuracy:** Day-ahead forecasts for daily total energy are typically within 15-25% of actual production as a percentage of installed capacity. Individual hours can be off by more — especially in the 11 AM to 3 PM window when convective clouds are most likely.

**What works:** Physics-based models shine here because they correctly predict the shape of the production curve (morning ramp, peak timing, evening decline) from geometry. Even if the total energy is off due to cloud errors, the curve shape is physically constrained and usually correct.

**What fails:** Specific cloud timing. The forecast might predict a 40% production drop at 2 PM when it actually happens at 11 AM, or vice versa. The total cloud impact over the day might be similar, but the timing shifts are frustrating for anyone planning specific hourly actions.

## Short-Range: 1-3 Days Ahead

At this range, NWP models still provide useful guidance but cloud-scale predictions are increasingly uncertain. Temperature forecasts remain good (within 2-3°C). Large-scale weather patterns (high pressure = sunny, frontal passage = cloudy) are well-captured.

**Accuracy:** Daily totals are within 20-30% for days 2-3. Hourly profiles become guidance rather than predictions — "mostly sunny with possible afternoon clouds" rather than "peak at 1:47 PM."

**What it's good for:** Planning which day to run the washing machine, whether tomorrow is worth delaying an energy-intensive task for, general consumption planning for the next few days.

## Medium-Range: 4-7 Days Ahead

Weather models at this range capture large-scale patterns but struggle with specifics. The atmosphere's chaotic nature means small errors in initial conditions grow exponentially — a phenomenon known as the "butterfly effect" that isn't just a metaphor but a real mathematical property of atmospheric dynamics.

**Accuracy:** Daily totals might be within 30-40%. Individual hours are essentially noise. The forecast can tell you "Thursday will be sunnier than Wednesday" but not "Thursday will produce 22.3 kWh."

**What it's good for:** Weekly energy planning, deciding whether to expect a generally sunny or cloudy week, rough scheduling of maintenance or panel cleaning.

## Extended Range: 1-2 Weeks and Beyond

Beyond a week, deterministic weather forecasts lose most specific skill. Ensemble forecasts (running the model multiple times with slightly different initial conditions) provide probabilistic guidance — "70% chance of above-average solar conditions next week" — but not specific production numbers.

Seasonal forecasts (1-3 months) exist for general trends but are even less specific. They might indicate "warmer and drier than average" for the upcoming season, which loosely translates to "probably decent solar production."

**What it's good for:** Long-term energy budgeting, comparing expected vs actual cumulative production, understanding seasonal patterns.

## What Volcast Delivers

Volcast focuses on the day-ahead horizon — the sweet spot where physics-based forecasting provides the most practical value. You get an hourly production curve for the next day, updated as fresh weather data becomes available.

This is the actionable horizon: close enough that weather models provide useful cloud predictions, far enough ahead that you can plan tomorrow's consumption, and spanning a full day so you can see the complete production curve shape.

The forecast doesn't pretend to be precise at longer horizons where the physics doesn't support it. And it doesn't attempt real-time nowcasting, which requires different infrastructure (satellite feeds, production data telemetry) that's a separate challenge.

Day-ahead, hourly, physics-based. That's where the signal-to-noise ratio is best.
