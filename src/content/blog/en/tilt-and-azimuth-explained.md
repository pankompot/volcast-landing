---
title: "What Tilt and Azimuth Actually Do to Your Annual Yield"
description: "Two angles define how much energy your solar panels capture. Learn why they matter, what happens when they're not 'optimal,' and why real-world results are more forgiving than you'd think."
date: 2026-04-14
author: Michal
tags: ["tilt", "azimuth", "panel-orientation", "pv-physics", "beginner"]
series: "fundamentals"
seriesOrder: 4
lang: en
seo:
  ogTitle: "Solar Panel Tilt and Azimuth Explained — How Orientation Affects Your Yield"
  ogDescription: "Two angles define your solar production. Learn what tilt and azimuth do, why 'optimal' isn't always what you'd expect, and when deviations barely matter."
  keywords: ["solar panel tilt angle", "azimuth angle solar panels", "optimal solar panel orientation", "panel tilt vs production", "south facing solar panels"]
relatedPosts:
  - "how-solar-panels-convert-sunlight"
  - "why-panels-produce-more-in-spring"
  - "direct-vs-diffuse-sunlight"
---

When you set up a solar production forecast — whether in Volcast or anywhere else — you're asked for two numbers describing your panel orientation: tilt and azimuth. These two angles, combined with your location, determine the geometric relationship between your panels and the sun throughout the year.

Let's demystify them.

## Tilt: How Far From Horizontal

Tilt (or inclination) is the angle between your panel surface and the horizontal ground. A panel lying flat on the ground has a tilt of 0°. A panel standing straight up like a wall has a tilt of 90°.

In the Northern Hemisphere, the classic rule of thumb says optimal tilt equals your latitude. Warsaw at 52°N would suggest 52° tilt. There's physical logic here: at the equinoxes, a tilt equal to latitude makes the panel perpendicular to the sun's rays at solar noon.

But the real-world optimum is usually **lower** — around 30-38° for most of Central Europe. Why?

First, summer contributes disproportionately to annual yield (longer days, stronger sun), and summer sun is high in the sky. A flatter tilt captures summer better, even if it sacrifices some winter collection.

Second, in climates with significant cloud cover, a meaningful fraction of annual irradiance is diffuse. Diffuse light comes from the entire sky, and flatter panels see more sky. Steep panels point at the horizon, missing overhead diffuse light.

Third, self-cleaning. Steeper angles shed rain better, but modern panels with decent anti-soiling coatings don't need extreme tilt for this.

## Azimuth: Which Way You're Pointing

Azimuth is the compass direction your panel faces. Convention varies, but the most common system uses 0° = North, 90° = East, 180° = South, 270° = West.

In the Northern Hemisphere, the textbook optimum is due south (180°) — the direction of the sun's highest arc. This maximizes total daily irradiance on clear days.

But there are good reasons to deviate.

**South-west (200-220°)** shifts peak production later into the afternoon, aligning better with evening consumption peaks when you're home cooking dinner and running appliances. For prosumers on time-of-use tariffs, this can be more valuable than maximum total yield.

**East-west split** installations put panels on both east and west roof faces. They sacrifice perhaps 10-15% of total annual yield compared to optimal south, but produce a flatter daily curve — more morning and evening power, less midday spike. This matches typical household consumption patterns better and reduces curtailment if your inverter is undersized relative to panel capacity.

## The Sensitivity Surprise

Here's the fact that reassures most PV owners: production is far less sensitive to orientation than you'd expect.

At 52°N latitude (Warsaw), a panel at 35° tilt facing due south is "optimal." But consider the deviations:

A tilt of 20° instead of 35° costs you only about **3-5%** of annual yield. A tilt of 45° costs about **2-3%**. You have a wide plateau of near-optimal performance.

An azimuth of 150° (SSE) or 210° (SSW) instead of 180° costs only about **2-4%** annual yield. Even due east (90°) or due west (270°) only costs **15-20%** — you still get 80-85% of maximum.

The worst case — a flat panel (0° tilt) — still captures about **88-91%** of the optimal annual irradiance at Polish latitudes. Flat panels lose more to soiling and don't self-clean, but the geometry penalty alone is modest.

This means: don't stress if your roof isn't perfectly south at the textbook-optimal tilt. In the real world, roof constraints, aesthetics, and shading matter more than chasing the last few percent of geometric perfection.

## Why Volcast Asks for These Numbers

Despite the forgiving sensitivity, tilt and azimuth still matter for **hour-by-hour forecasting**. The daily production curve shape changes dramatically with orientation:

A south-facing 35° panel has a strong midday peak. An east-facing panel peaks sharply in the morning and drops off after noon. A west-facing panel does the opposite. A flat panel has a symmetrical but lower curve.

These shape differences matter if you're planning when to run heavy appliances, when to charge an EV, or when to expect excess production for export.

Volcast uses your tilt and azimuth to calculate the **transposition** — how the sun's position throughout the day translates to irradiance on your specific surface. Getting this right means the forecast doesn't just predict "how much today" but "how much at 10 AM vs 2 PM vs 5 PM."

Combined with your location (which determines the sun's path), these two angles and your panel's rated power are the three numbers Volcast needs to generate a physics-based forecast. No historical data. No training period. Just geometry, atmospheric physics, and your setup.

<!-- internal-link: Read next: [The Three Numbers That Define Your PV Setup (And Why Volcast Only Needs Them)](/blog/three-numbers-pv-setup) -->

---

*Tell Volcast your tilt, azimuth, and power rating — it handles the physics. [Try it free on the Play Store](https://play.google.com/store/apps/details?id=app.volcast).*
