---
title: "The Irradiance Journey: From Space to Your Solar Panel in 8 Steps"
description: "Follow a beam of sunlight from the edge of Earth's atmosphere through scattering, absorption, clouds, and reflection until it reaches your tilted panel and becomes electricity."
date: 2026-04-17
tags: ["irradiance", "atmospheric-physics", "solar-spectrum", "pv-physics", "forecasting"]
series: "deep-dives"
seriesOrder: 4
lang: en
draft: true
seo:
  ogTitle: "From Space to Solar Panel — The Complete Irradiance Journey"
  keywords: ["solar irradiance atmosphere", "how sunlight reaches solar panels", "atmospheric attenuation solar", "irradiance modeling steps"]
relatedPosts: ["direct-vs-diffuse-sunlight", "why-cloud-cover-hardest-variable", "transposition-models"]
---

A photon leaves the Sun's surface traveling at 300,000 km/s. Eight minutes and twenty seconds later, it enters Earth's atmosphere. What happens next — in the final hundred kilometers of a 150-million-kilometer journey — determines whether it becomes electricity on your roof or heat on the pavement.

Here's the complete chain that a physics-based forecast must model.

## Step 1: Extraterrestrial Irradiance

Above the atmosphere, solar radiation is remarkably predictable. The **solar constant** — the power per square meter perpendicular to the sun's rays at Earth's mean distance — is approximately 1361 W/m².

This value varies slightly (~3.4%) due to Earth's elliptical orbit. We're closest to the sun in early January (perihelion) and farthest in early July (aphelion). Counterintuitively, the Northern Hemisphere receives slightly more extraterrestrial irradiance in winter than in summer. The effect is small but a physics model accounts for it.

Solar output also fluctuates with the 11-year sunspot cycle, but by less than 0.1% — negligible for PV forecasting.

## Step 2: Air Mass and Path Length

Sunlight enters the atmosphere at an angle determined by the sun's elevation. When the sun is directly overhead (zenith angle = 0°), light takes the shortest path through the atmosphere — defined as Air Mass 1.0 (AM1.0).

As the sun drops toward the horizon, the path lengthens. At 60° zenith angle, light traverses twice as much atmosphere (AM2.0). At sunset, the air mass can exceed 30.

More atmosphere means more attenuation. This is why your panels produce much less at 7 AM than at noon even if the panel happens to face east — the sunlight has been filtered through more air. It's also why panel performance is rated at AM1.5 (sun at about 48° elevation) — a standardized compromise between overhead and horizon conditions.

## Step 3: Rayleigh Scattering

Air molecules (nitrogen, oxygen) scatter sunlight. Shorter wavelengths (blue, violet) scatter more than longer wavelengths (red). This is why the sky is blue — you're seeing scattered short-wavelength light from all directions.

For PV, Rayleigh scattering redirects some direct beam radiation into diffuse sky radiation. The effect is calculable from atmospheric pressure and sun angle using well-known equations. It reduces direct irradiance by roughly 10-15% under clear skies and redirects that energy into the diffuse component.

## Step 4: Aerosol Absorption and Scattering

Aerosols — dust, pollution particles, sea salt, smoke, pollen — scatter and absorb sunlight much more than clean air molecules. Unlike Rayleigh scattering, aerosol effects depend heavily on local conditions and are harder to predict.

In clean maritime air, aerosol optical depth (AOD) might be 0.05 — barely noticeable. In a polluted continental city during a smog event, AOD can reach 0.5-1.0, reducing direct irradiance by 30-50%.

For Poland, typical AOD values range from 0.1 (clean winter air) to 0.3 (summer haze, agricultural burning). Saharan dust events occasionally reach Central Europe, boosting AOD significantly for a few days.

NWP models include aerosol forecasts, but they're coarser than meteorological variables. Most solar forecasts use climatological aerosol data (monthly averages) rather than real-time aerosol forecasts.

## Step 5: Ozone and Gas Absorption

Ozone in the stratosphere absorbs UV radiation — important for biology but less so for PV, since most UV photons have more energy than silicon's bandgap anyway (the excess becomes heat via thermalization).

Water vapor in the troposphere absorbs specific infrared wavelengths, creating absorption bands that reduce total irradiance. The effect depends on precipitable water content, which varies with humidity and is included in NWP model outputs.

CO₂, methane, and other greenhouse gases have minor absorption effects at specific wavelengths. These are essentially constant and baked into standard atmospheric models.

## Step 6: Cloud Attenuation

Clouds are the dominant modifier of surface irradiance, and we've covered their complexity in a separate post. In the irradiance chain, clouds act as both absorbers and scatterers, dramatically reducing direct beam radiation while partially converting it to diffuse radiation.

The physics is complex: cloud optical thickness depends on liquid water content, droplet size distribution, and cloud vertical extent. Thin cirrus might have an optical thickness of 0.5-2, passing most light through. Thick cumulonimbus can exceed optical thickness of 100, blocking essentially all direct radiation.

A physics model needs cloud optical properties from the weather forecast. Most NWP models provide total cloud cover fraction and some provide cloud water content, from which optical thickness can be estimated.

## Step 7: Surface Arrival — GHI

After surviving the atmosphere, solar radiation arrives at the surface as **Global Horizontal Irradiance (GHI)** — the total solar power on a flat horizontal surface. It's the sum of direct beam (projected onto horizontal) and diffuse sky radiation.

On a clear summer day at Polish latitudes, peak GHI reaches about 800-950 W/m². On an overcast day, it might be 100-300 W/m². These values are what weather stations measure and what NWP models predict.

But GHI isn't what your panels receive — because your panels aren't horizontal. Converting GHI to the irradiance on your tilted surface requires one more step.

## Step 8: Transposition to Your Tilted Surface

This final step — covered in detail in the next post — takes the horizontal irradiance components (direct and diffuse) and calculates what arrives at your specific panel orientation. It accounts for the angle of incidence for direct beam, the sky view factor for diffuse radiation, and ground-reflected radiation based on surface albedo.

The transposition step is where your tilt and azimuth inputs matter most. A south-facing 35° panel in Warsaw receives a very different irradiance profile than a west-facing 20° panel, even though they're under the same sky.

## The Complete Chain

Putting it together: extraterrestrial irradiance → air mass attenuation → Rayleigh scattering → aerosol effects → gas absorption → cloud attenuation → surface GHI → transposition to tilted surface → cell temperature adjustment → electrical output.

Each step is governed by physics. Each step introduces some uncertainty. The cumulative effect is a forecast that captures the fundamental behavior of the system while inheriting the weather forecast's limitations — primarily in cloud prediction.

This is what Volcast computes for every hour of every forecast. Not a lookup table. Not a statistical regression. The actual physical chain, calculated from your three input parameters and the best available weather data.
