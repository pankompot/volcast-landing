---
title: "Transposition Models: How Volcast Calculates What Hits Your Tilted Panel"
description: "Weather data tells us what reaches a horizontal surface. Your panels are tilted. The mathematical bridge between the two is called transposition — and the choice of model matters."
date: 2026-04-21
tags: ["transposition", "perez-model", "irradiance", "panel-orientation", "forecasting"]
series: "deep-dives"
seriesOrder: 5
lang: en
draft: true
seo:
  ogTitle: "Transposition Models Explained — Converting Horizontal Irradiance to Your Tilted Panel"
  keywords: ["transposition model solar", "Perez irradiance model", "tilted surface irradiance", "POA irradiance calculation"]
relatedPosts: ["tilt-and-azimuth-explained", "direct-vs-diffuse-sunlight", "irradiance-journey-space-to-panel"]
---

Weather stations and NWP models report solar radiation on a horizontal surface. Your panels are tilted at 30°, or 45°, or mounted on a pitched roof. The mathematical step that converts horizontal irradiance into what your specific tilted panel actually receives is called **transposition** — and it's one of the places where physics-based forecasting earns its keep.

## The Problem

Global Horizontal Irradiance (GHI) is the standard measurement. It's what pyranometers at weather stations record. It's what satellite estimates derive. It's what NWP models compute.

But the irradiance on your tilted panel — called **Plane of Array (POA)** irradiance — is different from GHI. On a clear winter day, a south-facing tilted panel can receive significantly *more* irradiance than a horizontal surface because it intercepts the low winter sun more directly. On a summer day when the sun is nearly overhead, the same tilted panel might receive slightly less than horizontal because it's angled away from the noon sun.

The relationship between GHI and POA depends on the sun's position (which changes every minute), your panel's tilt and azimuth, and crucially, the split between direct and diffuse radiation.

## Step 1: Decomposition

Before transposing, you need to separate GHI into its components: Direct Normal Irradiance (DNI) and Diffuse Horizontal Irradiance (DHI). If the weather source provides these separately, great. If it only provides GHI (common for many data sources), you need a **decomposition model** to estimate the split.

Decomposition models use clearness index (the ratio of surface GHI to extraterrestrial irradiance) as the primary input. Clear skies have high clearness index and high direct fraction. Cloudy skies have low clearness index and high diffuse fraction. The Erbs, Orgill-Hollands, and BRL models are commonly used decomposition approaches.

This step introduces uncertainty — the same GHI can come from different combinations of direct and diffuse. A thin uniform haze and a patchy cloud field might produce similar GHI but very different POA values on a tilted panel.

## Step 2: Direct Beam Transposition

The direct beam component is straightforward geometry. DNI arrives from the sun's direction. The fraction intercepted by your tilted surface follows the **cosine of the angle of incidence** — the angle between the sun's rays and the normal to your panel surface.

When the sun is directly facing your panel (angle of incidence = 0°), you capture 100% of DNI. As the angle increases, you capture less, following a cosine curve. At 60° angle of incidence, you capture only 50%. At 90° (sun parallel to your panel), you capture nothing.

The angle of incidence depends on your tilt, azimuth, and the sun's position — all calculable to high precision. This component of transposition is essentially exact.

## Step 3: Diffuse Transposition — Where Models Diverge

This is the hard part. Diffuse radiation comes from the entire sky — but not uniformly. The sky near the sun is brighter than the sky opposite the sun. The horizon is brighter than the zenith under certain conditions. Clouds create bright and dark patches.

A tilted panel can only see part of the sky dome. A panel tilted at 35° from horizontal "sees" less of the sky behind it (below the horizon line of the panel) and more of the sky in front. How much diffuse radiation it receives depends on how the sky brightness is distributed.

Different transposition models make different assumptions about this distribution:

**Isotropic model** — the simplest. Assumes diffuse radiation is uniform across the entire sky dome. The tilted surface receives a fraction proportional to its sky view factor: (1 + cos(tilt)) / 2. A flat panel (tilt = 0°) sees the full sky; a vertical panel sees half.

This model is computationally trivial but systematically wrong. Real skies aren't uniform — they're brighter near the sun and near the horizon.

**Hay-Davies model** — adds a circumsolar component. Treats part of the diffuse radiation as coming from the sun's direction (like direct beam) and the rest as isotropic. More accurate than isotropic, especially for clear and partly clear skies where the circumsolar brightening is significant.

**Perez model** — the most widely used in the PV industry. Decomposes diffuse radiation into three components: isotropic background, circumsolar brightening (region around the sun), and horizon brightening (a bright band along the horizon, particularly noticeable under clear skies). Uses empirical coefficients derived from extensive measurement campaigns.

The Perez model typically achieves 5-10% better accuracy than isotropic for tilted surfaces, with the improvement largest for steep tilts and clear skies. For flat panels or overcast conditions, all models converge because the sky really is approximately uniform.

## Step 4: Ground-Reflected Component

Sunlight reflecting off the ground and hitting your panel from below adds a third contribution. It's calculated as: GHI × albedo × (1 - cos(tilt)) / 2.

The ground reflectance (albedo) varies: fresh snow 0.6-0.8, green grass 0.2, dark soil 0.1, concrete 0.3. A higher tilt angle captures more ground reflection.

For most installations, ground reflection contributes 2-5% of total POA irradiance. In snow-covered environments with steep panel tilts, it can reach 10-15% — a meaningful bonus.

## Putting It Together

Total POA irradiance = transposed direct beam + transposed diffuse + ground-reflected.

This single number, computed for every hour (or every 15 minutes) of the forecast period, feeds into the PV cell model to calculate electrical output. The transposition step is where your tilt and azimuth inputs become critical — they shape the entire daily production curve.

A south-facing 35° panel in Warsaw peaks sharply around solar noon. An east-facing panel peaks at 9-10 AM. A flat panel has a broad, lower curve. These shapes directly drive when you should schedule heavy consumption, charge an EV, or expect surplus for export.

Volcast implements the Perez transposition model. For every forecast hour, it decomposes the weather model's irradiance into direct and diffuse components, calculates sun position, computes the angle of incidence on your tilted panel, applies the Perez diffuse model with its circumsolar and horizon components, adds ground reflection, and arrives at the POA irradiance that enters the PV conversion step.

It's more math than a lookup table. But it's why the forecast correctly captures the shape of your daily production curve — not just the total.
