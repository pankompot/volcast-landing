---
title: "Physics-Based vs ML-Based Solar Forecasting — Why the Approach Matters"
description: "Two fundamentally different approaches to predicting solar production. One models the physics, the other learns from data. Here's why the distinction matters for your forecast."
date: 2026-04-07
tags: ["physics-model", "machine-learning", "forecasting", "methodology"]
series: "deep-dives"
seriesOrder: 1
lang: en
draft: true
seo:
  ogTitle: "Physics vs ML Solar Forecasting — Which Approach Is More Accurate?"
  keywords: ["physics based solar forecast", "machine learning solar prediction", "solar forecast comparison", "PV production forecast methods"]
relatedPosts: ["three-numbers-pv-setup", "how-solar-panels-convert-sunlight", "where-weather-forecasts-come-from"]
---

If you search for "solar production forecast," you'll find dozens of apps and services. They all promise accurate predictions. But under the hood, they use fundamentally different approaches — and the approach determines when the forecast works, when it fails, and what it needs from you.

The two camps are **physics-based modeling** and **machine learning (ML)**. They're not just different tools for the same job. They think about the problem differently.

## The ML Approach: Learning from History

A machine learning forecast works like this: feed the model months of historical production data from your installation alongside the corresponding weather data. The model finds statistical patterns — "when temperature was X, cloud cover was Y, and wind was Z, this installation produced W watts."

The more data you feed it, the better it learns your installation's quirks: specific shading patterns, inverter behavior, soiling effects, cable losses. Given enough history, it can implicitly capture effects that would be hard to model explicitly.

This sounds powerful, and it is — with two critical caveats.

**Caveat one: the cold start problem.** A new installation has no history. The model can't learn what it hasn't seen. Most ML forecasts need 2-6 months of data before they become reliable. During that period — arguably when you need a forecast most, because you're still understanding your system — you get nothing useful.

**Caveat two: distribution shift.** ML models assume the future resembles the past. When conditions change in ways the model hasn't seen, it extrapolates poorly. A freak spring snowstorm, an unusually clear winter week, or a new building casting afternoon shade — these are exactly the moments you want an accurate forecast, and exactly when ML is least equipped to provide one.

## The Physics Approach: Modeling from First Principles

A physics-based forecast works differently. Instead of learning statistical correlations, it simulates the physical process that produces electricity from sunlight.

The chain looks like this: start with the sun's position (calculated from astronomy), model how solar radiation passes through the atmosphere (scattering, absorption, cloud attenuation), decompose the result into direct and diffuse components, transpose these onto your tilted panel surface, calculate cell temperature, and apply the photovoltaic conversion with temperature derating.

Each step uses well-established physical equations. The Perez or Hay-Davies transposition model. Beer-Lambert atmospheric transmission. The single-diode PV cell model. These aren't guesses or approximations — they're the same equations that PV engineers use to design solar farms.

The model needs just three inputs from you: tilt angle, azimuth, and rated power. Combined with your location (for the sun path) and a weather forecast (for atmospheric conditions), it computes expected production from scratch.

## Where Each Approach Shines

**ML is better when:**

You have years of clean production data and stable conditions. The model has seen every weather pattern your location experiences. Nothing about your installation has changed. In this scenario, ML can implicitly capture micro-effects (partial shading at 3 PM in December, inverter clipping at peak) that a physics model would need explicit configuration to handle.

ML also excels at very short-term forecasting (minutes to hours ahead) using real-time production data as input. If your panels are currently producing 3.2 kW and the sky is clear, an ML model can extrapolate the next hour quite well without understanding why.

**Physics is better when:**

You have a new installation. You've changed something (added panels, new shading). Conditions are unusual. You need a forecast in a location or climate the model has never seen. You want hour-by-hour curve shape, not just daily totals. You don't want to share months of production data with a third party.

Physics models are also more transparent. When the forecast is wrong, you can diagnose why — was the weather forecast off? Was the temperature model inaccurate? Was the irradiance decomposition wrong? With ML, errors are opaque: the model was wrong because the model was wrong.

## The Hybrid Possibility

The strongest approach combines both. Use physics as the foundation — it provides the structural understanding of how sunlight becomes electricity. Then use ML to calibrate: if the physics model consistently overpredicts by 5% for your installation, a thin ML layer can learn that correction.

This gives you physics' cold-start advantage (works from day one) with ML's ability to adapt to installation-specific effects over time.

Volcast starts with physics. From your first forecast, the model runs the full physical simulation chain. It doesn't need to see what your panels did last month to predict what they'll do tomorrow. The laws of physics don't have a training period.

## The Accuracy Question

People often ask: "Which is more accurate?" The honest answer is that it depends on the time horizon and what you mean by accuracy.

For **day-ahead forecasts**, both approaches are limited primarily by weather forecast uncertainty — not by the PV model. Whether you use physics or ML, if the weather forecast says "clear" and it rains, your production forecast will be wrong. The PV modeling approach matters less than the weather input quality.

For **hour-by-hour curve shape**, physics tends to win. It correctly models the morning ramp, solar noon peak, and evening decline based on geometry. ML can learn this shape, but needs to see enough days to capture seasonal variation.

For **long-term energy yield estimation**, physics is more robust because it doesn't overfit to a particular period's weather patterns.

For **nowcasting** (next 15-60 minutes), ML with real-time input data tends to win because it can react to current conditions faster than a physics model running on 6-hourly weather updates.

The real question isn't "which is more accurate" but "which gives me a useful forecast with what I have right now." If you have years of data and a stable installation, ML can be excellent. If you're starting fresh or want transparency, physics is the right foundation.

## Why This Matters for You

As a PV owner, the approach your forecast tool uses affects your experience in concrete ways.

With a physics-based tool, you get a working forecast on day one. You don't need to wait. You don't need to export data from your inverter portal. You don't need to trust a third party with your production history.

You also get a forecast you can reason about. If the forecast says 25 kWh tomorrow and you only get 18 kWh, you can check: was the weather different from the forecast? Was there unexpected shading? The physics model gives you a framework for understanding the gap.

That's the kind of forecast Volcast provides — and in the following posts, we'll dive deeper into each step of the physical simulation chain.
