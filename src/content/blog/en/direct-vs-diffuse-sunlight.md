---
title: "Direct vs Diffuse Sunlight — Why Cloudy Days Still Generate Power"
description: "Not all solar radiation is the same. Understanding the three components of sunlight that reach your panels explains why overcast days still produce electricity — and why forecasting must account for each."
date: 2026-04-07
author: Michal
tags: ["irradiance", "diffuse-radiation", "direct-beam", "pv-physics", "beginner"]
series: "fundamentals"
seriesOrder: 3
lang: en
seo:
  ogTitle: "Direct vs Diffuse Sunlight — Why Solar Panels Work on Cloudy Days"
  ogDescription: "Your panels receive three types of sunlight: direct, diffuse, and reflected. Learn why each matters for PV production and forecasting."
  keywords: ["direct vs diffuse solar radiation", "why solar panels work cloudy days", "diffuse irradiance", "GHI DNI DHI explained", "solar radiation components"]
relatedPosts:
  - "how-solar-panels-convert-sunlight"
  - "why-panels-produce-more-in-spring"
  - "tilt-and-azimuth-explained"
---

One of the most common questions from new PV owners: "Do my panels produce anything when it's cloudy?" The answer is yes — sometimes surprisingly much. To understand why, you need to know that sunlight reaching your roof isn't a single thing. It's three things.

## The Three Components of Solar Radiation

Every watt of solar energy hitting your panel arrives via one of three paths.

### Direct Normal Irradiance (DNI)

This is the sunlight that travels in a straight line from the sun to your panel without being scattered or absorbed. On a clear day, it's the dominant component — the hard-edged shadow-casting light that heats surfaces and makes you squint.

DNI is highly directional. It cares deeply about the angle between your panel and the sun. Panels pointed directly at the sun receive maximum DNI; panels at an oblique angle receive proportionally less (following the cosine law).

On a perfectly clear day at solar noon in Central Europe, DNI can exceed 800-900 W/m² on a surface perpendicular to the sun.

### Diffuse Horizontal Irradiance (DHI)

This is sunlight that has been scattered by the atmosphere — by air molecules (Rayleigh scattering), aerosols (dust, pollution), and especially clouds. Instead of arriving from one direction, diffuse light comes from the entire sky dome.

On a clear day, DHI is relatively modest — perhaps 80-150 W/m². But on an overcast day, it becomes the **only** source of irradiance, and can still deliver 100-300 W/m² depending on cloud thickness and type.

This is why your panels still produce on cloudy days. Even when thick clouds block every trace of direct sunlight, the sky is still scattering light downward from all directions.

### Ground-Reflected Irradiance

The third component is sunlight that bounces off the ground or surrounding surfaces before hitting your panel. This is smaller than the other two but not negligible — especially if your panels are tilted (which intercepts more reflected light) and the ground is highly reflective.

Fresh snow can reflect 60-80% of incoming light. Green grass reflects about 20%. Dark soil or asphalt: 10-15%. In Nordic countries during winter, ground reflection can meaningfully boost output.

The ground reflectivity is called **albedo**, and we'll explore its geographic significance in a later post.

## GHI: The Number You Usually See

Most weather stations and solar data sources report **Global Horizontal Irradiance (GHI)** — the total solar power falling on a flat horizontal surface. GHI is simply:

**GHI = DNI × cos(zenith angle) + DHI**

This is the standard metric, but it's not what your tilted panel receives. Converting GHI to the irradiance on your specific tilted surface requires a **transposition model** — a mathematical step that separates the components and recombines them for your panel's orientation. More on that in a later post.

## How the Ratio Changes Everything

The split between direct and diffuse radiation varies dramatically with conditions, and this is where forecasting gets interesting.

**Clear sky:** 70-85% direct, 15-30% diffuse. Panel orientation matters enormously.

**Partly cloudy:** 30-60% direct, 40-70% diffuse. Wild fluctuations as clouds pass. You might see power swings of 50% within minutes.

**Overcast:** 0-10% direct, 90-100% diffuse. Panel tilt matters much less — light comes from everywhere. A flat panel and a 35° panel receive similar amounts.

**Thin high clouds (cirrus):** 50-70% direct, 30-50% diffuse. They act like a natural filter, reducing DNI gently while boosting DHI.

This has a practical consequence: in climates with lots of overcast days (hello, northern Poland in November), the optimal panel tilt is actually flatter than theoretical calculations for clear skies would suggest, because you're primarily collecting diffuse light.

## The Cloudy Day Surprise

On some partly cloudy days, you might see instantaneous power spike *above* the clear-sky value. This is called **cloud enhancement** — when sunlight reflected off the edges of clouds combines with direct beam radiation, briefly creating irradiance levels exceeding what's possible under cloudless conditions.

It's a real phenomenon, well-documented in the literature. Your inverter might briefly report power above the panel's rated capacity. It's not a measurement error — it's physics doing something useful for once.

## Why This Matters for Forecasting

A forecast model that only predicts "how much total sunlight" without decomposing it into direct and diffuse components will make systematic errors:

It will **overpredict** output on cloudy days for steeply tilted panels (which miss most diffuse light from the opposite sky).

It will **underpredict** output on cloudy days for flatter panels (which collect diffuse light efficiently from the full sky dome).

It will completely miss the **partially cloudy volatility** that causes rapid output swings.

Volcast handles this by modeling each component separately. The weather forecast provides cloud cover and atmospheric data; the physics engine decomposes this into DNI and DHI; the transposition model converts these to your tilted surface; and the PV model calculates the resulting electrical output.

It's more complex than a simple lookup table, but it's how the physics actually works — and it's why the forecast stays accurate whether your day is sunny, overcast, or chaotically mixed.

<!-- internal-link: Read next: [What Tilt and Azimuth Actually Do to Your Annual Yield](/blog/tilt-and-azimuth-explained) -->

---

*Volcast decomposes solar radiation into its physical components for your specific panel orientation. [Try it free on the Play Store](https://play.google.com/store/apps/details?id=app.volcast).*
