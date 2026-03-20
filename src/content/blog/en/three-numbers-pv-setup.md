---
title: "The Three Numbers That Define Your PV Setup (And Why Volcast Only Needs Them)"
description: "Tilt, azimuth, and rated power — these three parameters are all a physics-based forecast needs to predict your solar production."
date: 2026-03-24
tags: ["setup", "parameters", "getting-started", "pv-basics", "beginner"]
series: "fundamentals"
seriesOrder: 5
lang: en
draft: false
seo:
  ogTitle: "The Three Numbers That Define Your Solar Setup — And Why That's All You Need"
  keywords: ["solar panel setup parameters", "PV system configuration", "solar forecast inputs", "Volcast setup guide"]
relatedPosts: ["tilt-and-azimuth-explained", "how-solar-panels-convert-sunlight"]
---

Most solar forecast tools ask for a laundry list of inputs or require weeks of production history before they can generate a useful prediction. Volcast asks for three numbers, plus your location (which your phone already knows). That's it.

This isn't a limitation — it's a deliberate design choice rooted in how physics-based modeling works. Let's walk through what each number tells the model and why three is enough.

## Number 1: Tilt Angle

**What it is:** The angle of your panels relative to the horizontal ground, in degrees. 0° is flat, 90° is vertical.

**What it tells the model:** How to calculate the angle of incidence — the angle between incoming solar rays and the panel surface — at every moment of the day. This directly determines how much of the available direct irradiance your panel intercepts.

The angle of incidence also feeds into the **Fresnel reflection** calculation. At steep angles of incidence (light hitting the glass almost sideways), more light bounces off the surface rather than entering the cell. This is the same physics that makes a lake surface look mirror-like at sunset.

**How to find it:** If your panels are on a pitched roof, the tilt equals the roof pitch. Common values in Europe: 15-45°. If you don't know your roof pitch, a smartphone inclinometer app held against the panel gives you the answer in seconds. For flat-roof or ground-mount installations, tilt is whatever angle the mounting frame is set to.

**Sensitivity:** As we discussed in the previous post, annual yield varies slowly with tilt. Being off by 5° changes output by roughly 1-2%. Don't overthink this — a reasonable estimate is fine.

## Number 2: Azimuth Angle

**What it is:** The compass direction your panel faces. 180° is due south (Northern Hemisphere optimum), 90° is east, 270° is west.

**What it tells the model:** When during the day your panels receive the most direct sunlight. A south-facing panel peaks at solar noon. An east-facing panel peaks in the morning. This shapes the entire daily production curve.

Azimuth also affects how much ground-reflected light reaches the panel (panels facing away from a snow-covered area miss that reflection) and how diffuse sky radiation is distributed across the panel's field of view.

**How to find it:** A compass app on your phone, pointed at your panels, gives you the azimuth. Or look at your roof on Google Maps — south is down in the Northern Hemisphere. If you have an east-west split installation, you can set up two arrays in Volcast.

**Sensitivity:** Like tilt, annual yield varies gently. A 30° deviation from due south costs about 3-5%. Even east or west-facing panels capture 80-85% of the theoretical maximum.

## Number 3: Rated Power (kWp)

**What it is:** The nameplate capacity of your installation in kilowatts-peak (kWp). This is the total power output under Standard Test Conditions (STC): 1000 W/m² irradiance, 25°C cell temperature, AM1.5 solar spectrum.

**What it tells the model:** The scaling factor for the entire calculation. The physics engine computes what fraction of STC irradiance reaches your tilted surface at any given moment, applies temperature derating and optical losses, and multiplies by your rated power to get the expected output in watts.

In a physics model, kWp is essentially the bridge between the irradiance model (which outputs W/m² of usable energy) and the electrical output (which is what you care about). It encapsulates panel efficiency, total area, and cell characteristics in a single number.

**How to find it:** It's on your installation contract, your inverter display, or the panel nameplates. Typical residential values: 3-15 kWp. A 10-panel system with 400W panels is 4.0 kWp.

**Sensitivity:** This is the one number you should get right. A 10% error in rated power means a 10% error in forecast output — the relationship is linear. But it's also the easiest number to know precisely, since it's written on your paperwork.

## What About Location?

Location is technically a fourth input, but Volcast gets it automatically from your phone's GPS or lets you pin it on a map. From your coordinates, the model derives everything it needs about the sun's path: solar declination, hour angles, sunrise/sunset times, solar elevation and azimuth at every moment of the year.

Location also selects the appropriate weather forecast grid point. Weather model data comes on a geographic grid (typically 0.1-0.25° spacing for regional models), and your location determines which grid cells are used and how they're interpolated.

## Why Not More Parameters?

You might wonder: shouldn't the model know about your specific panel brand, inverter efficiency, cable losses, or shading patterns?

Here's the thing — for a **forecast**, additional parameters offer diminishing returns:

**Panel brand/model** mostly affects the rated power (which you already provide) and the temperature coefficient. Temperature coefficients for silicon panels cluster tightly between -0.35% and -0.45%/°C. Using the average introduces maybe 1-2% error on hot days. For forecast purposes, that's noise compared to weather uncertainty.

**Inverter efficiency** above 96-98% for modern inverters means losses are 2-4%. The variation between brands is tiny — maybe 1% difference between a good and great inverter. Again, below weather forecast noise.

**Cable losses** are typically 1-3% and fairly constant. They scale everything equally without affecting the forecast's shape.

**Shading** is the one parameter that genuinely matters and isn't captured by the three numbers. If you have significant shading (trees, chimneys, neighboring buildings), your actual production will be systematically lower than the forecast. This is a known limitation — Volcast tells you the theoretical maximum for your orientation, and you can mentally adjust for known shading. Future versions may add shade modeling.

The philosophy is: **capture the physics that matters most with the fewest inputs**. Tilt, azimuth, and power get you to 90-95% accuracy. The remaining 5-10% comes from factors that are either hard to measure precisely (shading, soiling) or vary so little between installations that averaging is fine (temperature coefficients, inverter efficiency).

## The ML Comparison

This simplicity is a direct advantage over machine learning approaches. An ML model needs weeks or months of historical production data to learn what your specific installation does under various conditions. Until it has that data, it can't forecast. And if conditions change (new shading from a growing tree, panel degradation, added panels), the model needs time to re-learn.

Physics doesn't have a learning period. Given three numbers and a weather forecast, it computes the expected output from first principles — the same principles that governed solar energy before your panels were even manufactured.

That's the power of modeling the physics instead of fitting the data.

