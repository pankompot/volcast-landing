---
title: "How Solar Panels Actually Convert Sunlight to Electricity"
description: "A clear, jargon-free explanation of the photovoltaic effect — from photons hitting silicon to usable AC power in your home. Understand the physics that powers your solar installation."
date: 2026-03-24
author: Michal
tags: ["solar-basics", "photovoltaic-effect", "pv-physics", "beginner"]
series: "fundamentals"
seriesOrder: 1
lang: en
seo:
  ogTitle: "How Solar Panels Convert Sunlight to Electricity — The Physics Explained Simply"
  ogDescription: "Photons, electrons, and semiconductors — here's what actually happens when sunlight hits your solar panel."
  keywords: ["how solar panels work", "photovoltaic effect explained", "solar cell physics", "solar energy conversion", "PV panel science"]
relatedPosts:
  - "why-panels-produce-more-in-spring"
  - "direct-vs-diffuse-sunlight"
  - "tilt-and-azimuth-explained"
---

Every second, about 430 quintillion joules of energy from the Sun reach Earth's surface. Your solar panels intercept a tiny sliver of that — and convert it into electricity without moving parts, combustion, or noise. But how?

The answer sits at the intersection of quantum physics and semiconductor engineering. Don't worry — you don't need a physics degree. Let's walk through it step by step.

## It Starts With a Photon

Sunlight isn't a continuous stream of energy. It arrives as discrete packets called **photons** — tiny bundles of electromagnetic energy, each carrying a specific amount depending on its wavelength. Blue photons carry more energy than red ones. Infrared photons carry less than both.

This matters because a solar cell can only use photons above a certain energy threshold. For silicon — the material in over 95% of solar panels worldwide — that threshold is about 1.1 electron-volts (eV), corresponding to near-infrared light. Anything below that passes right through the cell as if it weren't there.

## The Semiconductor Sandwich

A solar cell is essentially a thin wafer of silicon that's been deliberately "doped" — meaning tiny amounts of other elements have been added to change its electrical properties.

The top layer is doped with phosphorus, which has one more electron than silicon. This creates an abundance of free electrons — we call it **n-type** silicon (n for negative charge carriers).

The bottom layer is doped with boron, which has one fewer electron. This creates "holes" — spaces where an electron could be but isn't. That's **p-type** silicon (p for positive charge carriers).

Where these two layers meet, something remarkable happens. Electrons from the n-side drift across to fill holes on the p-side, creating a thin zone with a built-in electric field. This is the **p-n junction** — the engine of every solar cell.

## The Photovoltaic Effect

When a photon with sufficient energy strikes the silicon, it knocks an electron free from its atomic bond. This creates an electron-hole pair — a free electron and a vacant spot.

Here's the key: the electric field at the p-n junction acts as a one-way gate. It sweeps the freed electron toward the n-side and the hole toward the p-side. This separation of charges is what creates voltage — the electrical pressure that drives current.

Connect a wire from the top of the cell to the bottom (through your home's electrical system), and electrons flow — that's electricity. The electron eventually returns to fill a hole, the photon's energy has been captured as useful work, and the cycle continues as long as light keeps arriving.

This is the **photovoltaic effect**, first observed by Edmond Becquerel in 1839 and finally harnessed practically in 1954 at Bell Labs.

## From Cell to Usable Power

A single silicon solar cell produces about 0.5-0.6 volts — not enough to be useful on its own. So cells are wired together in series (to add up voltages) and parallel (to add up currents), forming a **module** — what you see on your roof.

A typical residential module contains 60 or 72 cells and produces 30-40 volts of direct current (DC). Your home runs on alternating current (AC) at 230V (in Europe) or 120V (in North America), so an **inverter** converts the panel's DC output into grid-compatible AC.

The journey is: **Photon → freed electron → DC current → inverter → AC power → your appliances.**

## What Gets Lost Along the Way

Not all sunlight becomes electricity. In fact, a standard silicon panel converts only about 18-22% of incoming solar energy. Where does the rest go?

**Below-bandgap photons** (about 19% of sunlight) don't have enough energy to free electrons. They pass through or are absorbed as heat.

**Thermalization losses** (about 33%) occur when high-energy photons (blue, UV) free an electron but have surplus energy beyond what's needed. That excess becomes heat in the cell.

**Recombination** happens when freed electrons fall back into holes before reaching the circuit. Manufacturing quality and cell design minimize this but can't eliminate it entirely.

**Reflection and shading** lose another few percent, though anti-reflective coatings and textured surfaces help.

**Electrical resistance** in the cell's metal contacts and wiring consumes a small fraction as heat.

The theoretical maximum efficiency for a single-junction silicon cell is about 29.4% (the Shockley-Queisser limit). The best lab cells have reached 26.8%. Your rooftop panels are remarkably close to what physics allows.

## Why This Matters for Forecasting

Understanding this chain — photon to electron to power — reveals why accurate production forecasting is a physics problem, not just a statistics problem.

The amount of electricity your panels produce depends on **how many usable photons reach the cell surface** and **how efficiently the cell converts them** at its current temperature. Both of these are governed by physical laws that can be modeled.

The spectrum of incoming light changes with atmospheric conditions. The cell's efficiency shifts with temperature. The angle of incidence matters. All of these are calculable if you know the physics.

This is exactly what Volcast does. Instead of guessing future production from historical patterns, it simulates the physical chain — from atmospheric conditions through irradiance modeling to cell-level behavior — for your specific installation.

<!-- internal-link: Read next: [Why Your Panels Produce More in Spring Than Summer](/blog/why-panels-produce-more-in-spring) -->

---

*Volcast uses physics-based models to forecast your solar production — no historical data needed, works from day one. [Try it free on the Play Store](https://play.google.com/store/apps/details?id=app.volcast).*
