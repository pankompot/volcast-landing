---
title: "Where Weather Forecasts Come From: NWP Models Explained for PV Owners"
description: "Your solar forecast is only as good as its weather input. Here's how numerical weather prediction models work, what they get right, and where they fall short for solar energy."
date: 2026-04-10
tags: ["nwp", "weather-models", "gfs", "ecmwf", "icon", "forecasting"]
series: "deep-dives"
seriesOrder: 2
lang: en
draft: true
seo:
  ogTitle: "Weather Forecast Models Explained for Solar Energy — GFS, ECMWF, ICON"
  keywords: ["numerical weather prediction solar", "GFS ECMWF solar forecast", "weather model resolution", "NWP models explained", "weather data for solar"]
relatedPosts: ["physics-vs-ml-solar-forecasting", "why-cloud-cover-hardest-variable", "nowcasting-vs-day-ahead"]
---

Every solar production forecast is, at its core, a weather forecast with extra steps. You can have the most sophisticated PV model in the world, but if the weather input says "sunny" when it's actually raining, your production forecast will be wrong.

So where does the weather data come from? And why do different weather sources give different results?

## The Global Weather Machine

Modern weather forecasting runs on **Numerical Weather Prediction (NWP)** — massive computer simulations that model the entire atmosphere using physics equations. These aren't simple extrapolations of current conditions. They're full fluid dynamics simulations that solve the Navier-Stokes equations for atmospheric flow, coupled with thermodynamics, radiation physics, and moisture processes.

The process starts with **data assimilation**: billions of observations from satellites, weather stations, radiosondes (weather balloons), aircraft, ships, and ocean buoys are fed into the model to create a snapshot of the current atmospheric state. Then the model steps forward in time, computing how the atmosphere evolves minute by minute.

The major global models that feed most solar forecasts are:

**GFS (Global Forecast System)** — run by NOAA (USA). Free and open. Grid resolution: ~13 km (0.25°). Updates every 6 hours. Forecasts out to 16 days. GFS is the workhorse of free weather data. Its solar-relevant outputs include total cloud cover, temperature, wind speed, and downward shortwave radiation flux (essentially GHI at the surface).

**ECMWF (European Centre for Medium-Range Weather Forecasts)** — widely considered the world's best global model. Grid resolution: ~9 km (0.1°). Updates every 6 hours. Superior handling of European weather patterns. ECMWF data is partially commercial — full resolution requires a paid license, though lower-resolution products are freely available.

**ICON (Icosahedral Nonhydrostatic)** — run by DWD (German Weather Service). Open data since 2023. Global version at ~13 km, European nest at ~6.5 km, German nest at ~2.2 km. Particularly good for Central European forecasting — relevant if you're in Poland, Germany, or neighboring countries.

## What NWP Models Actually Output

For solar forecasting, the critical NWP outputs are:

**Cloud cover** — usually provided as total cloud fraction (0-100%) and sometimes broken into high, mid, and low cloud layers. This is the single most important variable for PV forecasting, and also the hardest to predict accurately.

**Temperature** — 2-meter air temperature, used to estimate cell temperature and apply temperature derating to panel output.

**Wind speed and direction** — affects cell temperature through convective cooling. A windy day means cooler panels and slightly higher efficiency.

**Surface solar radiation** — some models directly output Global Horizontal Irradiance (GHI) or its components. This is the most directly useful variable, but it's computed within the model using the same cloud and atmospheric data, so it inherits those uncertainties.

**Humidity and aerosol loading** — affect atmospheric transparency and the ratio of direct to diffuse radiation.

## The Resolution Problem

When we say GFS has "13 km resolution," that means each grid cell is roughly 13 km × 13 km. The model computes a single set of atmospheric conditions for that entire area.

Your solar installation occupies maybe 40 square meters.

This scale mismatch has real consequences. A cumulus cloud 2 km wide can shade your panels for 20 minutes, but if it sits inside a grid cell that's otherwise clear, the model might report 10% cloud cover for the whole cell — which translates to a gentle, averaged reduction in irradiance, not the sharp on-off pattern you actually experience.

Higher resolution helps. ICON's 2.2 km German nest can begin to resolve individual convective cells. But even 2 km is enormous compared to your rooftop.

This is why **all solar forecasts have a floor of uncertainty** that no amount of PV modeling sophistication can overcome. The weather model simply can't see what's happening at your specific location with the precision your panels experience.

## Forecast Horizon and Accuracy Decay

NWP accuracy degrades with time, and the rate of degradation varies by variable:

**Temperature** forecasts are relatively stable. Day-ahead temperature predictions are usually within 1-2°C, and even 3-day forecasts are reasonable. Temperature changes slowly and is well-constrained by large-scale atmospheric patterns.

**Cloud cover** degrades much faster. Day-ahead cloud forecasts are useful but often off in timing and coverage. By day 3, specific cloud predictions are unreliable — the model can tell you "partly cloudy" but not whether the clouds will be over your roof at 2 PM.

**Solar irradiance** inherits cloud cover's uncertainty. Day-ahead daily total predictions might be within 15-20% on average. Hour-by-hour predictions can be off by 50% or more during partly cloudy conditions.

This decay pattern matters for how you use a forecast. Day-ahead: plan your consumption. Three days ahead: rough planning only. A week ahead: general trend at best.

## Model Update Cycles

Global NWP models typically run every 6 hours (00, 06, 12, 18 UTC). Each run takes 1-3 hours to compute, so by the time data is available, it's already a few hours old. A forecast generated from the 00 UTC run might not be available until 03-04 UTC.

For solar forecasting, this means morning forecasts for "today" are based on atmospheric data from several hours ago. Conditions can change, especially for convective clouds that develop rapidly in spring and summer afternoons.

Some regional models run more frequently (hourly or every 3 hours), providing fresher data but over a smaller geographic area.

## Why Multiple Models Matter

No single NWP model is best everywhere, always. GFS might outperform ECMWF for a specific storm track. ICON might nail Central European cloud cover while GFS misses it. Model skill varies by season, weather regime, and geographic location.

Sophisticated forecast systems use **multi-model ensembles** — blending outputs from multiple NWP models to reduce systematic biases. Some also run **ensemble forecasts** within a single model: perturb the initial conditions slightly and run the simulation multiple times to estimate forecast uncertainty.

For a solar forecast consumer, the practical takeaway is: don't trust any single weather source absolutely. The best forecast uses the best available weather data for your region and time horizon, and ideally acknowledges the uncertainty inherent in its weather inputs.

Understanding where the weather data comes from won't make your forecast more accurate — but it will help you understand why some days the forecast nails it and other days it misses. The PV model isn't the weak link. The atmosphere is.
