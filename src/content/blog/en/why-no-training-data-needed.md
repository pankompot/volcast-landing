---
title: "Why New Installations Don't Need Training Data With Physics-Based Models"
description: "Most forecast tools need months of history before they work. Physics-based forecasting works from day one. Here's why — and what that means for new PV owners."
date: 2026-04-28
tags: ["cold-start", "new-installation", "physics-model", "onboarding", "forecasting"]
series: "deep-dives"
seriesOrder: 7
lang: en
draft: true
seo:
  ogTitle: "No Training Data Needed — Why Physics-Based Solar Forecasts Work From Day One"
  keywords: ["solar forecast new installation", "no training data PV forecast", "cold start solar prediction", "physics model no history needed"]
relatedPosts: ["physics-vs-ml-solar-forecasting", "three-numbers-pv-setup", "transposition-models"]
---

You just got solar panels installed. The inverter is running, the app shows real-time production, and you're excited. You want to know: how much will my panels produce tomorrow? Can I plan my energy usage around the forecast?

If you're using an ML-based forecast tool, the answer is: wait. Come back in 2-3 months when we have enough data to learn your installation's behavior.

If you're using a physics-based tool like Volcast, the answer is: right now. Here's tomorrow's hourly production curve.

This "cold start" advantage isn't a marketing claim. It's a direct consequence of how the two approaches work.

## Why ML Needs Training Data

A machine learning model is, at its core, a pattern matcher. It learns relationships between inputs (weather conditions) and outputs (your production) by observing many examples. Without examples, it has nothing to match against.

Consider what the model needs to learn for your specific installation: how much power you produce under clear skies at different times of year (which captures your panel orientation, tilt, and any fixed shading). How temperature affects your specific panels (which depends on their temperature coefficient, mounting style, and ventilation). How cloud cover translates to production drops (which depends on your panel orientation and the typical cloud patterns at your location).

Each of these requires data spanning different conditions. To learn the seasonal variation, the model ideally needs a full year. To learn cloud behavior, it needs dozens of cloudy days. To characterize temperature effects, it needs both hot and cold days with similar irradiance.

In practice, most ML models become "usable" after 2-3 months and "good" after 6-12 months. Before that, they're either unavailable or making educated guesses based on similar installations in the area — which is itself a form of physics approximation, just a crude one.

## Why Physics Doesn't Need History

A physics-based model doesn't learn your installation's behavior from observation. It *calculates* it from first principles.

Given your tilt angle, it knows exactly how the sun's rays intercept your panels at every moment of every day of the year. This is geometry, not statistics.

Given your azimuth, it knows when your panels face the sun most directly, shaping the daily production curve. Pure trigonometry.

Given your rated power, it knows the scaling factor between irradiance and electrical output. A single number that encapsulates panel efficiency and area.

Given your location, it calculates the sun's path (astronomy), selects the appropriate weather model grid point, and applies atmospheric models calibrated against decades of measurement data — not your data, but the fundamental atmospheric physics that applies everywhere on Earth.

The temperature coefficient? Silicon panels cluster tightly between -0.35% and -0.45% per °C. Using the typical value of -0.4% introduces at most a 1-2% error on extreme temperature days. That's below weather forecast uncertainty.

Inverter efficiency? Modern inverters operate at 96-98% efficiency across most of their power range. Using 97% is accurate enough for forecasting purposes.

Cable losses? Typically 1-3%, roughly constant. They scale the output uniformly without affecting the forecast's shape.

None of these require observing your installation. They're physical properties that can be estimated from general knowledge with acceptable accuracy for forecast purposes.

## The First Day Experience

Here's what happens when you set up Volcast on your first day with solar panels:

You enter three numbers: tilt, azimuth, rated power. Your phone provides the location. Within seconds, the model runs the complete physical simulation for tomorrow's forecast: sun position calculations, weather model data retrieval, atmospheric radiation modeling, irradiance decomposition, Perez transposition to your tilted surface, temperature derating, and electrical output estimation.

You see an hourly production curve for tomorrow. It shows the morning ramp starting at sunrise, the peak around solar noon (shifted by your azimuth), the afternoon decline, and the estimated daily total.

Is this forecast perfect? No. It carries all the uncertainty of the underlying weather forecast — primarily cloud prediction uncertainty. But it's physically grounded. The curve shape is correct because geometry doesn't lie. The magnitude is calibrated to your rated power. The temperature effects are modeled from thermodynamics.

Compare this to "please wait 3 months." For a new PV owner eager to understand their system, that wait is an eternity.

## When History Does Help

This isn't to say that historical data is useless. If you've been running Volcast for 6 months and notice the forecast consistently overpredicts by 8%, that tells you something — maybe you have unaccounted shading, or your panels are slightly misaligned from the stated azimuth, or your inverter clips earlier than the model assumes.

The physics model provides the baseline. Historical comparison provides the calibration. Together, they're more accurate than either alone.

Future versions of Volcast may incorporate this self-calibration — using your actual production data (if you choose to share it) to fine-tune the physical model's parameters. But the key word is "fine-tune." The physics gets you 90-95% of the way there on day one. Calibration polishes the last few percent.

## The Broader Implication

The cold start advantage isn't just about convenience. It has implications for the entire solar forecasting ecosystem.

**Accessibility:** A forecast that works immediately is a forecast that works for everyone, including people who just got panels, people who switched inverter platforms, or people who simply don't want to deal with data export and upload workflows.

**Privacy:** A physics-based forecast doesn't need your production history. Your installation parameters (tilt, azimuth, power) are not sensitive data — they're visible from a satellite photo of your roof. You get a forecast without giving away your energy consumption patterns.

**Resilience:** When something changes — you add panels, a tree grows, your inverter gets replaced — a physics model adjusts immediately with updated parameters. An ML model needs to re-learn, potentially from scratch.

**Scalability:** A physics model can generate a forecast for any location on Earth with three inputs. No need to accumulate training data for each new installation, region, or country.

This is why Volcast chose the physics-first approach. The laws of thermodynamics, optics, and semiconductor physics don't need a training period. They work from day one, everywhere, for every installation.

Three numbers. No history. Accurate from the first forecast.
